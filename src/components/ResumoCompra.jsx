import { formatarReais } from '../utils/formato'

function ResumoCompra({ total, quantidadeItens }) {
  return (
    <div className="resumo">
      <p className="resumo-itens">{quantidadeItens} itens no carrinho</p>
      <p className="resumo-total">
        Total da compra <span>{formatarReais(total)}</span>
      </p>
    </div>
  )
}

export default ResumoCompra