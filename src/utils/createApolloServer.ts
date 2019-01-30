import { ApolloServer } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import { isAbsolute, join } from 'path'
import { buildSchema } from 'type-graphql'
import uuid from 'uuid/v4'
import { createErrorObject } from '../utils/error/createErrorObject'
import { GenericError } from '../utils/error/GenericError'
import { log } from '../utils/log'

export async function createApolloServer(root: string) {
  if (!isAbsolute(root)) {
    throw new Error(`Invalid path (must be absolute): ${root}`)
  }

  const schema = await buildSchema({
    resolvers: [join(root, 'modules', '**', '*Resolver.*')]
  })

  return new ApolloServer({
    schema,

    // Format errors (only in production):
    formatError: (error: GraphQLError) => {
      // Only format errors in production:
      if (process.env.NODE_ENV !== 'production') {
        return error
      }

      // If the raised error is an instance of GenericError, the details should
      // be exposed:
      if (error.originalError instanceof GenericError) {
        return createErrorObject(
          error.originalError.message,
          error.originalError.code,
          error.originalError.description
        )
      }

      // Generates an unique ID for each error:
      const errorId = uuid()
      log(`ErrorID: ${errorId}`, error)
      return createErrorObject('Internal error.', 'ERR_INTERNAL_ERROR')
    }
  })
}
