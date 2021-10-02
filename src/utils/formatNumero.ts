export function formatNumero(numero: number) {
  const format = new Intl.NumberFormat('es-cl')
  return format.format(numero)
}
