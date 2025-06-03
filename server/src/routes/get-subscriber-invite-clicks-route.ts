import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { getSubscriberInviteClicks } from "../functions/get-subscriber-invite-click"

export const getSubscriberInvitesClicksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get('/subscribers/:subscriberId/ranking/clicks', {
    schema: {
      summary: "Get subscriber invite clicks count",
      description: "description",
      tags: ['referral'],
      params: z.object({
        subscriberId: z.string(),
      }),
      response: {
        200: z.object({
          count: z.number(),
        })
      }
    }
  }, async request => {

    const { subscriberId } = request.params

    const { count } = await getSubscriberInviteClicks({ subscriberId })
    
    return { count }
  })
}