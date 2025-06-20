import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { AccessInviteLink } from '../functions/access-invite-link'
import { redis } from '../redis/client'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await AccessInviteLink({ subscriberId })

      const redirectUrl = new URL(env.WEB_URL)

      console.log(await redis.hgetall('referral:access-count'))

      redirectUrl.searchParams.set('referrer', subscriberId)

      // 301 redirect permanente
      // 302 redirect temporário

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
