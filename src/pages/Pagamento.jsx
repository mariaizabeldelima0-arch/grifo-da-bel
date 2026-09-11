import { Link } from 'react-router-dom'

function Pagamento() {
  return (
    <section>
      <h1>Pagamento</h1>
      <Link to="/sucesso">Simular sucesso</Link>
      <Link to="/falha">Simular falha</Link>
    </section>
  )
}

export default Pagamento