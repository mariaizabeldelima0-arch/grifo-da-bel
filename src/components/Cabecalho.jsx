import { Link } from 'react-router-dom'

function Cabecalho() {
  return (
    <header className="cabecalho">
      <Link to="/" className="marca">Grifo da Bel</Link>
      <p>Clássicos em domínio público</p>
    </header>
  )
}

export default Cabecalho