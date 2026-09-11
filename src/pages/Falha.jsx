import { Link } from 'react-router-dom'

function Falha() {
  return (
    <section>
      <h1>tentativa de golpe</h1>
      <Link to="/pagamento">Tentar novamente</Link>
    </section>
  )
}

export default Falha