import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import type { FastifyInstance } from 'fastify'
import { db } from '../database.js'
import { checkSessionIdExists } from '../middlewares/check-sessions-id-exists.js'

export async function transactionsRoutes(app: FastifyInstance) {
  // 📌 Listar todas as transações
  app.get(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      try {
        const { sessionId } = request.cookies
        const transactions = await db('transactions')
          .where('session_id', sessionId)
          .select()

        return { data: transactions }
      } catch  {
        return reply.code(500).send({ error: 'Erro ao buscar transações' })
      }
    }
  )

  // 📌 Resumo (antes da rota por ID para evitar conflito)
  app.get(
    '/summary',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      try {
        const { sessionId } = request.cookies
        const summary = await db('transactions')
          .where('session_id', sessionId)
          .sum('amount', { as: 'amount' })
          .first()

        return { data: summary }
      } catch {
        return reply.code(500).send({ error: 'Erro ao gerar resumo' })
      }
    }
  )

  // 📌 Buscar transação por ID
  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      try {
        const getTransactionParamsSchema = z.object({
          id: z.string().uuid(),
        })

        const { sessionId } = request.cookies
        const { id } = getTransactionParamsSchema.parse(request.params)

        const transaction = await db('transactions')
          .where('session_id', sessionId)
          .where('id', id)
          .first()

        if (!transaction) {
          return reply.code(404).send({ error: 'Transação não encontrada' })
        }

        return { data: transaction }
      } catch {
        return reply.code(400).send({ error: 'ID inválido ou erro na consulta' })
      }
    }
  )

  // 📌 Criar nova transação
  app.post('/', async (request, reply) => {
    try {
      const createTransactionsBodySchema = z.object({
        title: z.string().min(1, 'Título não pode ser vazio'),
        amount: z.number().positive('O valor deve ser maior que zero'),
        type: z.enum(['credit', 'debit']),
      })

      const { title, amount, type } = createTransactionsBodySchema.parse(
        request.body
      )

      let sessionId = request.cookies.sessionId

      // Gera um novo sessionId se não existir
      if (!sessionId) {
        sessionId = randomUUID()
        reply.cookie('sessionId', sessionId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 dias
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
      }

      await db('transactions').insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId,
      })

      return reply.code(201).send({ message: 'Transação criada com sucesso' })
    } catch (err) {
      return reply.code(400).send({ error: 'Dados inválidos', details: err })
    }
  })
}
