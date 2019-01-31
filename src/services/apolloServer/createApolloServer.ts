import { ApolloServer } from 'apollo-server-express'
import { join } from 'path'
import { buildSchema } from 'type-graphql'
import { RESOLVERS_BASE_DIR } from '../../config/app'
import { createContext as context } from './createContext'
import { formatError } from './formatError'

export async function createApolloServer() {
  const schema = await buildSchema({
    resolvers: [join(RESOLVERS_BASE_DIR, '**', '*Resolver.*')]
  })

  return new ApolloServer({
    playground: process.env.NODE_ENV !== 'production',
    schema,
    context,
    formatError
  })
}
