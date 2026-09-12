import { formatarReais } from '../utils/formato'

function ItemCarrinho({ livro }) {
  const subtotal = livro.precoUnitario * livro.quantidade

  return (
    <li className="item">
      <div
        className="capa"
        style={{ backgroundColor: livro.corCapa, color: livro.corTextoCapa }}
      >
        <span className="capa-titulo">{livro.nome}</span>
        <span className="capa-autor">{livro.autor}</span>
      </div>

      <div className="item-dados">
        <h2>{livro.nome}</h2>
        <p className="item-autor">{livro.autor}</p>
        <p className="item-meta">
          {livro.quantidade} × {formatarReais(livro.precoUnitario)}
        </p>
      </div>

      <p className="item-subtotal">{formatarReais(subtotal)}</p>
    </li>
  )
}

export default ItemCarrinho