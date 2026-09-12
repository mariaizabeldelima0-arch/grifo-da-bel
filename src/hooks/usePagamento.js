import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { todosDigitosIguais } from '../utils/regraCompra'

export function usePagamento() {
  const [processando, setProcessando] = useState(false)
  const navegar = useNavigate()

  async function executarCompra(dados) {
    setProcessando(true)

    await new Promise((resolver) => setTimeout(resolver, 1500))

    if (todosDigitosIguais(dados.cartao)) {
      navegar('/falha')
    } else {
      navegar('/sucesso')
    }

    setProcessando(false)
  }

  return { processando, executarCompra }
}

export default usePagamento