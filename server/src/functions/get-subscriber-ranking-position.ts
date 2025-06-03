import { redis } from "../redis/client"

interface IGetSubscriberInviteCountParams {
  subscriberId: string
}

export async function getSubscriberRankingPosition({ subscriberId }: IGetSubscriberInviteCountParams) {

  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return { position : null}
  }

  return { position: rank + 1 }

}