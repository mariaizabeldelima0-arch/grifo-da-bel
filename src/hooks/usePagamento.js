import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { todosDigitosIguais } from '../utils/regraCompra'

export function usePagamento() {
  const [processando, setProcessando] = useState(false)
  const navegar = useNavigate()

  async function executarCompra(dados) {
    setProcessando(true)

    await new Promise((resolver) => setTimeout(resolver, 1500))

    const golpe = todosDigitosIguais(dados.cartao)
    const finalCartao = dados.cartao.slice(-4)

    if (golpe) {
      navegar('/falha', { state: { total: dados.total, finalCartao } })
    } else {
      navegar('/sucesso', { state: { total: dados.total, finalCartao } })
    }

    setProcessando(false)
  }

  return { processando, executarCompra }
}

export default usePagamento