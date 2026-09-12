export function formatarReais(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',')
}