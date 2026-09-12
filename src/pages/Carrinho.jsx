import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItemCarrinho from '../components/ItemCarrinho'
import ResumoCompra from '../components/ResumoCompra'

function Carrinho() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const resposta = await fetch('/produtos.json')

        if (!resposta.ok) {
          throw new Error('falha na requisicao')
        }

        const dados = await resposta.json()
        setProdutos(dados.produtos)
      } catch (problema) {
        console.error(problema)
        setErro('Não foi possível carregar os produtos. Tente novamente.')
      } finally {
        setCarregando(false)
      }
    }

    buscarProdutos()
  }, [])

  const total = produtos.reduce(
    (soma, livro) => soma + livro.precoUnitario * livro.quantidade,
    0
  )

  const quantidadeItens = produtos.reduce(
    (soma, livro) => soma + livro.quantidade,
    0
  )

  if (carregando) {
    return <p className="aviso">Carregando seu carrinho…</p>
  }

  if (erro) {
    return <p className="aviso">{erro}</p>
  }

  if (produtos.length === 0) {
    return <p className="aviso">Seu carrinho está vazio.</p>
  }

  return (
    <section>
      <h1>Seu carrinho</h1>

      <ul className="lista-itens">
        {produtos.map((livro) => (
          <ItemCarrinho key={livro.id} livro={livro} />
        ))}
      </ul>

      <ResumoCompra total={total} quantidadeItens={quantidadeItens} />

      <Link to="/pagamento" state={{ total }} className="botao">
        Ir para o pagamento
      </Link>
    </section>
  )
}

export default Carrinho