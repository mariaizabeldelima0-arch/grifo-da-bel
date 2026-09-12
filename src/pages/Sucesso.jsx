import { Link, useLocation } from 'react-router-dom'
import { formatarReais } from '../utils/formato'

function Sucesso() {
  const localizacao = useLocation()
  const total = localizacao.state?.total ?? 0
  const finalCartao = localizacao.state?.finalCartao

  return (
    <section className="resultado resultado-sucesso">
      <p className="resultado-marca" aria-hidden="true">✓</p>
      <h1>Compra aprovada</h1>

      <p className="resultado-texto">
        Seu pedido foi confirmado e os livros já estão sendo separados.
      </p>

      {finalCartao && (
        <p className="resultado-detalhe">
          {formatarReais(total)} no cartão final {finalCartao}
        </p>
      )}

      <Link to="/" className="botao">
        Voltar ao carrinho
      </Link>
    </section>
  )
}

export default Sucesso