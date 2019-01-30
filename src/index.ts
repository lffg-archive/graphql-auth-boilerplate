import connectRedis from 'connect-redis'
import cors = require('cors')
import dotenv from 'dotenv-safe'
import express from 'express'
import session from 'express-session'
import 'reflect-metadata'
import { createApolloServer } from './utils/apolloServer/createApolloServer'
import { createConn } from './utils/database/createConnection'
import { redis } from './utils/redis'

async function main() {
  // Sets the env vars:
  dotenv.config()

  // TypeORM:
  const conn = await createConn()
  if (conn) await conn.runMigrations()

  const app = express()
  app.set('trust proxy', 1)
  app.disable('x-powered-by')

  // Cors:
  app.use(
    cors({
      credentials: true,
      origin: process.env.HOST
    })
  )

  // Creates the session:
  const RedisStore = connectRedis(session)
  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: 'sid',
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 30 * 6 // 6 months
      }
    })
  )

  // Creates the ApolloServer:
  const apolloServer = await createApolloServer(__dirname)
  apolloServer.applyMiddleware({ app })

  // Starts the server:
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('|', '='.repeat(50))
      console.log('|', `Server listening at port :${port}`)
      console.log('|', '='.repeat(50))
    }
  })
}

main().catch((error) =>
  ['Whoops! Error:', error].forEach((e) => console.error(e))
)
