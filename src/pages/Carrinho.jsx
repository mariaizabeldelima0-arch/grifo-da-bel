import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Carrinho() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const resposta = await fetch('/produtos.json')

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar os produtos.')
        }

        const dados = await resposta.json()
        setProdutos(dados.produtos)
            } catch {
        setErro('Não foi possível carregar os produtos. Tente novamente.')
      } finally {
        setCarregando(false)
      }
    }

    buscarProdutos()
  }, [])

  if (carregando) {
    return <p>Carregando seu carrinho…</p>
  }

  if (erro) {
    return <p>{erro}</p>
  }

  if (produtos.length === 0) {
    return <p>Seu carrinho está vazio.</p>
  }

  return (
    <section>
      <h1>Seu carrinho</h1>

      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} — {produto.autor} — {produto.quantidade} ×{' '}
            {produto.precoUnitario}
          </li>
        ))}
      </ul>

      <Link to="/pagamento">Ir para o pagamento</Link>
    </section>
  )
}

export default Carrinho