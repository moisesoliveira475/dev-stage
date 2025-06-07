import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-click'
import { getRanking } from '../functions/get-ranking'

export const getRankingRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/ranking',
      {
        schema: {
          summary: 'Get ranking',
          description: 'description',
          tags: ['referral'],
          response: {
            200: z.object({
              ranking: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  score: z.number()
                })
              )
            }),
          },
        },
      },
      async request => {
        const { rankingWithScore } = await getRanking()

        return { ranking: rankingWithScore }
      }
    )
  }
