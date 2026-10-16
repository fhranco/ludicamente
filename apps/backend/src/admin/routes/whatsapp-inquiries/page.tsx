import React, { useState, useEffect } from "react"
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubbleLeftRight, ArrowPath, Check, MagnifyingGlass, ChevronRight } from "@medusajs/icons"
import {
  Container,
  Heading,
  Text,
  Table,
  Button,
  Input,
  Select,
  Drawer,
  Textarea,
  Label,
} from "@medusajs/ui"

export const config = defineRouteConfig({
  label: "Solicitudes WhatsApp",
  icon: ChatBubbleLeftRight,
})

interface InquiryItem {
  variant_id: string
  product_id?: string
  product_title: string
  variant_title?: string
  sku?: string
  unit_price_clp: number
  quantity: number
  subtotal_clp: number
}

interface Inquiry {
  id: string
  reference_code: string
  status: "creada" | "contacto_iniciado" | "en_revision" | "mix_confirmado" | "cerrada" | "cancelada"
  customer_name: string
  customer_phone?: string | null
  delivery_preference: string
  customer_notes?: string | null
  initial_items_snapshot: InquiryItem[]
  initial_total_clp: number
  confirmed_items_snapshot?: InquiryItem[] | null
  confirmed_total_clp?: number | null
  whatsapp_opened_at?: string | null
  internal_notes?: string | null
  idempotency_key?: string | null
  created_at: string
  updated_at: string
}

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; icon: string }
> = {
  creada: {
    label: "Recibida / Nueva",
    bg: "#e8dcff",
    text: "#4b347d",
    icon: "✦",
  },
  contacto_iniciado: {
    label: "Contacto en WhatsApp",
    bg: "#ffd678",
    text: "#684606",
    icon: "💬",
  },
  en_revision: {
    label: "En Revisión de Stock",
    bg: "#ecf19f",
    text: "#3b4d12",
    icon: "🔍",
  },
  mix_confirmado: {
    label: "Mix Confirmado",
    bg: "#d8f2df",
    text: "#1e5631",
    icon: "✓",
  },
  cerrada: {
    label: "Despachada / Cerrada",
    bg: "#efe8e1",
    text: "#554c59",
    icon: "📦",
  },
  cancelada: {
    label: "Cancelada",
    bg: "#ffe2e2",
    text: "#a32d2d",
    icon: "✕",
  },
}

export default function WhatsappInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Estados de edición del detalle
  const [editStatus, setEditStatus] = useState<string>("creada")
  const [editInternalNotes, setEditInternalNotes] = useState<string>("")
  const [editConfirmedTotal, setEditConfirmedTotal] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Forzar modo claro y español
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
      document.body.classList.remove("dark")
      document.body.classList.add("light")
    }
  }, [])

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append("q", searchTerm)
      if (statusFilter && statusFilter !== "todos") params.append("status", statusFilter)

      const res = await fetch(`/admin/whatsapp-inquiries?${params.toString()}`, {
        credentials: "include",
      })
      if (res.ok) {
        const data = await res.json()
        setInquiries(data.inquiries || [])
        setCount(data.count || 0)
      }
    } catch (err) {
      console.error("Error al cargar solicitudes de WhatsApp:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [statusFilter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchInquiries()
  }

  const handleRowClick = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    setEditStatus(inquiry.status)
    setEditInternalNotes(inquiry.internal_notes || "")
    setEditConfirmedTotal(
      inquiry.confirmed_total_clp !== null && inquiry.confirmed_total_clp !== undefined
        ? String(inquiry.confirmed_total_clp)
        : ""
    )
    setSaveSuccess(false)
    setDrawerOpen(true)
  }

  const handleSaveChanges = async () => {
    if (!selectedInquiry) return
    setSaving(true)
    setSaveSuccess(false)
    try {
      const res = await fetch(`/admin/whatsapp-inquiries/${selectedInquiry.id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          internal_notes: editInternalNotes,
          confirmed_total_clp: editConfirmedTotal ? parseInt(editConfirmedTotal, 10) : null,
        }),
      })

      if (res.ok) {
        const { inquiry: updated } = await res.json()
        setSelectedInquiry(updated)
        setSaveSuccess(true)
        setInquiries((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch (err) {
      console.error("Error al guardar cambios de la solicitud:", err)
    } finally {
      setSaving(false)
    }
  }

  const formatCLP = (amount: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const cleanPhoneForWhatsApp = (phone?: string | null) => {
    if (!phone) return null
    return phone.replace(/[^0-9]/g, "")
  }

  return (
    <Container className="p-8 max-w-7xl mx-auto space-y-6 bg-[#fffcf7] border border-[#efeae5] rounded-3xl shadow-xs">
      {/* Cabecera Lúdicamente */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#efeae5] pb-6">
        <div className="flex items-center gap-3.5">
          <span className="w-12 h-12 rounded-full bg-[#ffd678] border-2 border-[#4b347d] flex items-center justify-center -rotate-6 shadow-sm shrink-0">
            <svg viewBox="0 0 64 64" className="w-8 h-8" aria-hidden="true">
              <circle cx="24" cy="29" r="3.2" fill="#4b347d" />
              <circle cx="40" cy="29" r="3.2" fill="#4b347d" />
              <path
                d="M25 39q8 9 16 0"
                fill="none"
                stroke="#4b347d"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M15 17l-3-4M49 17l3-5"
                stroke="#fa795f"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <Heading level="h1" className="font-display font-bold text-3xl text-[#4b347d] tracking-[-0.03em]">
                Solicitudes de WhatsApp
              </Heading>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#ecf19f] text-[#4b347d]">
                {count} cotizaciones
              </span>
            </div>
            <Text className="text-xs font-semibold text-[#77727d] mt-1">
              Centro de atención y validación de stock humano para cotizaciones generadas en la tienda.
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="small"
            onClick={fetchInquiries}
            disabled={loading}
            className="rounded-full font-bold px-4 py-2 border-[#efeae5] hover:bg-[#f3edfb] text-[#4b347d]"
          >
            <ArrowPath className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Actualizar lista
          </Button>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#fffaf1] p-4.5 rounded-2xl border border-[#efeae5]">
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-96">
          <Input
            placeholder="Buscar por código (ej. LUD-...) o cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            className="rounded-full bg-white border-[#efeae5] font-semibold text-xs"
          />
          <Button
            type="submit"
            variant="secondary"
            size="small"
            className="rounded-full bg-[#4b347d] hover:bg-[#392559] text-white border-none p-2.5"
          >
            <MagnifyingGlass className="w-4 h-4" />
          </Button>
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Label className="text-xs font-extrabold text-[#77727d] uppercase tracking-wider whitespace-nowrap">
            Filtrar por estado:
          </Label>
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val)}>
            <Select.Trigger size="small" className="min-w-[190px] rounded-full bg-white border-[#efeae5] font-bold text-xs">
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="todos">Todos los estados</Select.Item>
              <Select.Item value="creada">✦ Recibida / Nueva</Select.Item>
              <Select.Item value="contacto_iniciado">💬 Contacto en WhatsApp</Select.Item>
              <Select.Item value="en_revision">🔍 En Revisión de Stock</Select.Item>
              <Select.Item value="mix_confirmado">✓ Mix Confirmado</Select.Item>
              <Select.Item value="cerrada">📦 Despachada / Cerrada</Select.Item>
              <Select.Item value="cancelada">✕ Cancelada</Select.Item>
            </Select.Content>
          </Select>
        </div>
      </div>

      {/* Tabla de Solicitudes */}
      <div className="border border-[#efeae5] rounded-2xl overflow-hidden bg-white shadow-xs">
        <Table>
          <Table.Header>
            <Table.Row className="bg-[#fffaf1]">
              <Table.HeaderCell className="text-xs font-extrabold text-[#77727d] uppercase">Código</Table.HeaderCell>
              <Table.HeaderCell className="text-xs font-extrabold text-[#77727d] uppercase">Fecha y Hora</Table.HeaderCell>
              <Table.HeaderCell className="text-xs font-extrabold text-[#77727d] uppercase">Cliente</Table.HeaderCell>
              <Table.HeaderCell className="text-xs font-extrabold text-[#77727d] uppercase">Teléfono</Table.HeaderCell>
              <Table.HeaderCell className="text-xs font-extrabold text-[#77727d] uppercase">Preferencia</Table.HeaderCell>
              <Table.HeaderCell className="text-xs font-extrabold text-[#77727d] uppercase">Total Ref. (CLP)</Table.HeaderCell>
              <Table.HeaderCell className="text-xs font-extrabold text-[#77727d] uppercase">Estado</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {loading ? (
              <Table.Row>
                <Table.Cell colSpan={8} className="text-center py-12 text-[#95899a] font-medium text-sm">
                  Cargando solicitudes...
                </Table.Cell>
              </Table.Row>
            ) : inquiries.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={8} className="text-center py-12 text-[#95899a] font-medium text-sm">
                  No hay solicitudes registradas con estos filtros.
                </Table.Cell>
              </Table.Row>
            ) : (
              inquiries.map((inquiry) => {
                const statusInfo = STATUS_CONFIG[inquiry.status] || {
                  label: inquiry.status,
                  bg: "#f3edfb",
                  text: "#4b347d",
                  icon: "•",
                }
                const cleanPhone = cleanPhoneForWhatsApp(inquiry.customer_phone)

                return (
                  <Table.Row
                    key={inquiry.id}
                    className="cursor-pointer hover:bg-[#fffdf9] transition-colors border-b border-[#f4efe9]"
                    onClick={() => handleRowClick(inquiry)}
                  >
                    <Table.Cell className="font-mono font-bold text-[#4b347d]">
                      {inquiry.reference_code}
                    </Table.Cell>
                    <Table.Cell className="text-xs text-[#77727d] font-medium">
                      {new Date(inquiry.created_at).toLocaleDateString("es-CL", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Table.Cell>
                    <Table.Cell className="font-bold text-[#2d2943] text-sm">
                      {inquiry.customer_name}
                    </Table.Cell>
                    <Table.Cell className="text-xs text-[#77727d]">
                      {inquiry.customer_phone ? (
                        <span className="font-mono">{inquiry.customer_phone}</span>
                      ) : (
                        <span className="text-[#b5abb9] italic">Sin teléfono</span>
                      )}
                    </Table.Cell>
                    <Table.Cell className="text-xs font-medium text-[#77727d]">
                      {inquiry.delivery_preference === "retiro"
                        ? "Retiro en tienda"
                        : inquiry.delivery_preference === "region"
                        ? "Envío a región"
                        : "Despacho Punta Arenas"}
                    </Table.Cell>
                    <Table.Cell className="font-display font-bold text-[#2d2943] text-sm">
                      {formatCLP(inquiry.initial_total_clp)}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        style={{ backgroundColor: statusInfo.bg, color: statusInfo.text }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap"
                      >
                        <span>{statusInfo.icon}</span>
                        <span>{statusInfo.label}</span>
                      </span>
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      <ChevronRight className="w-4 h-4 text-[#8a8190]" />
                    </Table.Cell>
                  </Table.Row>
                )
              })
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Drawer de Detalle y Edición de Cotización */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Drawer.Content className="bg-[#fffcf7] p-6 sm:p-8 space-y-6 max-w-xl">
          {selectedInquiry && (
            <>
              <Drawer.Header className="border-b border-[#efeae5] pb-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#ffd678] text-[#4b347d]">
                    {selectedInquiry.reference_code}
                  </span>
                  <span className="text-xs text-[#8a8190] font-semibold">
                    {new Date(selectedInquiry.created_at).toLocaleString("es-CL")}
                  </span>
                </div>
                <Drawer.Title className="font-display font-bold text-2xl text-[#4b347d] mt-2">
                  Cotización de {selectedInquiry.customer_name}
                </Drawer.Title>
                <Drawer.Description className="text-xs text-[#77727d] font-medium">
                  {selectedInquiry.customer_phone && (
                    <div className="mt-1 flex items-center gap-2">
                      <span>Teléfono: <strong>{selectedInquiry.customer_phone}</strong></span>
                      <a
                        href={`https://wa.me/${cleanPhoneForWhatsApp(selectedInquiry.customer_phone)}?text=Hola%20${encodeURIComponent(selectedInquiry.customer_name)},%20te%20escribimos%20de%20Lúdicamente%20por%20tu%20cotización%20${selectedInquiry.reference_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#d8f2df] text-[#1e5631] hover:underline"
                      >
                        <span>Abrir WhatsApp 💬</span>
                      </a>
                    </div>
                  )}
                </Drawer.Description>
              </Drawer.Header>

              <Drawer.Body className="space-y-6 overflow-y-auto max-h-[calc(100vh-250px)] pr-1">
                {/* Ítems Solicitados */}
                <div className="space-y-2">
                  <Label className="text-xs font-extrabold text-[#77727d] uppercase tracking-wider">
                    Juegos y Materiales Cotizados:
                  </Label>
                  <div className="border border-[#efeae5] rounded-2xl p-3 bg-white space-y-2">
                    {selectedInquiry.initial_items_snapshot.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-[#f4efe9] last:border-0 text-xs">
                        <div>
                          <div className="font-bold text-[#2d2943]">{item.product_title}</div>
                          {item.variant_title && (
                            <div className="text-[11px] text-[#8a8190]">{item.variant_title}</div>
                          )}
                          <div className="text-[#8a8190]">{item.quantity} un. × {formatCLP(item.unit_price_clp)}</div>
                        </div>
                        <div className="font-display font-bold text-[#4b347d] text-sm">
                          {formatCLP(item.subtotal_clp)}
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 flex justify-between font-bold text-sm text-[#2d2943]">
                      <span>Total Referencial:</span>
                      <span className="font-display text-[#4b347d] text-base">
                        {formatCLP(selectedInquiry.initial_total_clp)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notas del Cliente */}
                {selectedInquiry.customer_notes && (
                  <div className="p-3.5 rounded-2xl bg-[#fffaf1] border border-[#efeae5] text-xs">
                    <span className="font-bold text-[#2d2943] block mb-1">Comentario del cliente:</span>
                    <p className="text-[#77727d] italic leading-relaxed">
                      &quot;{selectedInquiry.customer_notes}&quot;
                    </p>
                  </div>
                )}

                {/* Gestión de Estado */}
                <div className="space-y-2">
                  <Label className="text-xs font-extrabold text-[#77727d] uppercase tracking-wider">
                    Actualizar Estado Comercial:
                  </Label>
                  <Select value={editStatus} onValueChange={(val) => setEditStatus(val)}>
                    <Select.Trigger className="rounded-xl border-[#efeae5] font-bold text-xs bg-white">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="creada">✦ Recibida / Nueva</Select.Item>
                      <Select.Item value="contacto_iniciado">💬 Contacto en WhatsApp</Select.Item>
                      <Select.Item value="en_revision">🔍 En Revisión de Stock</Select.Item>
                      <Select.Item value="mix_confirmado">✓ Mix Confirmado con Cliente</Select.Item>
                      <Select.Item value="cerrada">📦 Despachada / Cerrada</Select.Item>
                      <Select.Item value="cancelada">✕ Cancelada</Select.Item>
                    </Select.Content>
                  </Select>
                </div>

                {/* Monto Final Confirmado */}
                <div className="space-y-2">
                  <Label className="text-xs font-extrabold text-[#77727d] uppercase tracking-wider">
                    Total Confirmado Final (CLP, si hubo cambios de productos):
                  </Label>
                  <Input
                    type="number"
                    value={editConfirmedTotal}
                    onChange={(e) => setEditConfirmedTotal(e.target.value)}
                    placeholder="Monto acordado con el cliente"
                    className="rounded-xl border-[#efeae5] font-display font-bold text-sm bg-white"
                  />
                </div>

                {/* Notas Internas */}
                <div className="space-y-2">
                  <Label className="text-xs font-extrabold text-[#77727d] uppercase tracking-wider">
                    Notas Internas del Equipo:
                  </Label>
                  <Textarea
                    value={editInternalNotes}
                    onChange={(e) => setEditInternalNotes(e.target.value)}
                    placeholder="Ej: Cliente acordó retiro el viernes, transferirá 50% de abono..."
                    rows={3}
                    className="rounded-xl border-[#efeae5] text-xs bg-white"
                  />
                </div>
              </Drawer.Body>

              <Drawer.Footer className="border-t border-[#efeae5] pt-4 flex items-center justify-between">
                <Button
                  variant="secondary"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full font-bold px-4 text-xs"
                >
                  Cerrar
                </Button>
                <div className="flex items-center gap-2">
                  {saveSuccess && (
                    <span className="text-xs font-bold text-[#1e5631] flex items-center gap-1 animate-in fade-in">
                      <Check className="w-4 h-4 text-[#1e5631]" />
                      ¡Guardado con éxito!
                    </span>
                  )}
                  <Button
                    onClick={handleSaveChanges}
                    disabled={saving}
                    className="rounded-full bg-[#fa795f] hover:bg-[#e7694f] text-white font-display font-bold px-5 text-sm shadow-sm"
                  >
                    {saving ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </div>
              </Drawer.Footer>
            </>
          )}
        </Drawer.Content>
      </Drawer>
    </Container>
  )
}
