import postgree from 'postgres'
import { env } from '../env'
import { drizzle } from 'drizzle-orm/postgres-js'
import { subscriptions } from './schema/subscriptions'

export const pg = postgree(env.POSTGRES_URL)
export const db = drizzle(pg, {
  schema: {
    subscriptions,
  }
})