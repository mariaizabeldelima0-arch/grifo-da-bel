import { Link } from 'react-router-dom'

function Carrinho() {
  return (
    <section>
      <h1>Seu carrinho</h1>
      <Link to="/pagamento">Ir para o pagamento</Link>
    </section>
  )
}

export default Carrinho