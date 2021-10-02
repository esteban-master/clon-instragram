export function numeroAbreviado(numero: number): string {
  const numberFloor = Math.floor(numero / 1000).toString()
  switch (numberFloor.length) {
    case 1:
      return numero.toString()
    case 2:
      return numberFloor.split('').slice(0, 2).join('') + 'k'
    case 3:
      return numberFloor.split('').slice(0, 3).join('') + 'k'
    case 4:
      return numberFloor.split('').slice(0, 2).join('.') + 'm'
    case 5:
      const n = numberFloor.split('').slice(0, 3)
      n.splice(2, 0, '.')
      return n.join('') + 'm'
    case 6:
      return numberFloor.split('').slice(0, 3).join('') + 'm'
    default:
      throw Error('Error al convertir numero')
  }
}
