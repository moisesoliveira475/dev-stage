import { redis } from "../redis/client"

interface IAccessInviteLinkParams {
  subscriberId: string
}

export async function AccessInviteLink({ subscriberId }: IAccessInviteLinkParams) {

  await redis.hincrby('referral:access-count', subscriberId, 1)

}