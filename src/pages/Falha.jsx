import { Link, useLocation } from 'react-router-dom'

function Falha() {
  const localizacao = useLocation()
  const total = localizacao.state?.total ?? 0
  const finalCartao = localizacao.state?.finalCartao

  return (
    <section className="resultado resultado-falha">
      <p className="resultado-marca" aria-hidden="true">✕</p>
      <h1>tentativa de golpe</h1>

      <p className="resultado-texto">
        Não foi possível concluir o pagamento. Confira os dados do cartão e
        tente novamente.
      </p>

      {finalCartao && (
        <p className="resultado-detalhe">Cartão final {finalCartao}</p>
      )}

      <Link to="/pagamento" state={{ total }} className="botao">
        Tentar novamente
      </Link>
    </section>
  )
}

export default Falha