import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, Link } from 'react-router-dom'
import { esquemaPagamento } from '../utils/validacaoPagamento'
import { formatarReais } from '../utils/formato'
import { usePagamento } from '../hooks/usePagamento'

function Pagamento() {
  const localizacao = useLocation()
  const total = localizacao.state?.total ?? 0
  const { processando, executarCompra } = usePagamento()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(esquemaPagamento),
    mode: 'onChange',
  })

  function aoEnviar(dados) {
    executarCompra({ ...dados, total })
  }

  return (
    <section>
      <h1>Pagamento</h1>
      <p className="aviso">Total a pagar: {formatarReais(total)}</p>

      <form onSubmit={handleSubmit(aoEnviar)} className="formulario" noValidate>
        <div className="campo">
          <label htmlFor="titular">Nome do titular</label>
          <input
            id="titular"
            type="text"
            autoComplete="cc-name"
            disabled={processando}
            aria-invalid={errors.titular ? 'true' : 'false'}
            {...register('titular')}
          />
          {errors.titular && <p className="erro">{errors.titular.message}</p>}
        </div>

        <div className="campo">
          <label htmlFor="cartao">Número do cartão</label>
          <input
            id="cartao"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            disabled={processando}
            aria-invalid={errors.cartao ? 'true' : 'false'}
            {...register('cartao')}
          />
          {errors.cartao && <p className="erro">{errors.cartao.message}</p>}
        </div>

        <div className="campo">
          <label htmlFor="validade">Validade (MM/AA)</label>
          <input
            id="validade"
            type="text"
            inputMode="numeric"
            placeholder="12/28"
            autoComplete="cc-exp"
            disabled={processando}
            aria-invalid={errors.validade ? 'true' : 'false'}
            {...register('validade')}
          />
          {errors.validade && <p className="erro">{errors.validade.message}</p>}
        </div>

        <div className="campo">
          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            disabled={processando}
            aria-invalid={errors.cvv ? 'true' : 'false'}
            {...register('cvv')}
          />
          {errors.cvv && <p className="erro">{errors.cvv.message}</p>}
        </div>

        <button
          type="submit"
          className="botao"
          disabled={!isValid || processando}
        >
          {processando ? 'Processando compra…' : 'Finalizar compra'}
        </button>

        {processando && (
          <p className="aviso" role="status">
            Processando compra…
          </p>
        )}
      </form>

      {!processando && <Link to="/">Voltar ao carrinho</Link>}
    </section>
  )
}

export default Pagamento