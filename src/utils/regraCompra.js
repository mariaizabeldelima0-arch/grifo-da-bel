export function todosDigitosIguais(cartao) {
  const primeiro = cartao[0]
  return cartao.split('').every((digito) => digito === primeiro)
}