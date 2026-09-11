import { Routes, Route } from 'react-router-dom'
import Cabecalho from './components/Cabecalho'
import Carrinho from './pages/Carrinho'
import Pagamento from './pages/Pagamento'
import Sucesso from './pages/Sucesso'
import Falha from './pages/Falha'

function App() {
  return (
    <>
      <Cabecalho />
      <main className="container">
        <Routes>
          <Route path="/" element={<Carrinho />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/sucesso" element={<Sucesso />} />
          <Route path="/falha" element={<Falha />} />
        </Routes>
      </main>
    </>
  )
}

export default App