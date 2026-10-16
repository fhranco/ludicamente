/**
 * Formateador oficial de moneda CLP para Lúdicamente.
 * Cumple estrictamente con ADR 002 (montos enteros, sin decimales, estilo editorial chileno).
 */
export function formatCLP(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "$0"
  }

  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(amount))
}
