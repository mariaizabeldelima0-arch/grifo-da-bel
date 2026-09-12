import { z } from 'zod'

export const esquemaPagamento = z.object({
  titular: z
    .string()
    .trim()
    .min(3, 'Informe o nome do titular como está no cartão.')
    .regex(/^[A-Za-zÀ-ÿ\s.'-]+$/, 'O titular deve conter apenas letras.'),

  cartao: z
    .string()
    .transform((valor) => valor.replace(/[\s-]/g, ''))
    .refine((valor) => /^\d{16}$/.test(valor), 'O cartão precisa ter 16 dígitos.'),

  validade: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use o formato MM/AA.'),

  cvv: z.string().regex(/^\d{3}$/, 'O CVV precisa ter 3 dígitos.'),
})