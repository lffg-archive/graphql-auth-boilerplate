import Redis from 'ioredis'

export const redis =
  process.env.NODE_ENV === 'production' ||
  typeof process.env.REDIS_URL !== 'undefined'
    ? new Redis(process.env.REDIS_URL)
    : new Redis()
