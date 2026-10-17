/**
 * Formateador oficial de precios para Lúdicamente.
 * Entrega montos limpios con signo peso y separador de miles: ej. $19.990 (sin sufijo ni prefijo CLP).
 */
export function formatCLP(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "$0"
  }

  const rounded = Math.round(amount)
  // Formato chileno: punto para miles, sin decimales
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return `$${formatted}`
}

export const formatPrice = formatCLP

