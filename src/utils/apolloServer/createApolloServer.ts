import { ApolloServer } from 'apollo-server-express'
import { isAbsolute, join } from 'path'
import { buildSchema } from 'type-graphql'
import { createContext as context } from './createContext'
import { formatError } from './formatError'

export async function createApolloServer(root: string) {
  if (!isAbsolute(root)) {
    throw new Error(`Invalid path (must be absolute): ${root}`)
  }

  const schema = await buildSchema({
    resolvers: [join(root, 'modules', '**', '*Resolver.*')]
  })

  return new ApolloServer({
    playground: process.env.NODE_ENV !== 'production',
    schema,
    context,
    formatError
  })
}
