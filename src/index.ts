import dotenv from 'dotenv-safe'
import express from 'express'
import 'reflect-metadata'
import { createApolloServer } from './utils/createApolloServer'
import { createConn } from './utils/database/createConnection'

async function main() {
  // Configure env variables:
  dotenv.config()

  // TypeORM:
  const conn = await createConn()
  if (conn) await conn.runMigrations()

  // Creates the express app:
  const app = express()

  // Creates the ApolloServer:
  const apolloServer = await createApolloServer(__dirname)
  apolloServer.applyMiddleware({ app })

  // Starts the server:
  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`Server listening at port :${port}`))
}

main().catch((error) =>
  ['Whoops! Error:', error].forEach((e) => console.error(e))
)
