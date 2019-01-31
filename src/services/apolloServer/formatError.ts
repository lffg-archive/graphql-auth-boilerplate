import { GraphQLError } from 'graphql'
import { ArgumentValidationError } from 'type-graphql'
import uuid from 'uuid/v4'
import { createErrorObject } from '../../utils/error/createErrorObject'
import { GenericError } from '../../utils/error/GenericError'
import { bigLog } from '../../utils/log/utils'

export function formatError(error: GraphQLError) {
  // Format the validation errors:
  if (error.originalError instanceof ArgumentValidationError) {
    return {
      ...createErrorObject(error.message, 'ERR_VALIDATION_ERROR'),
      validationErrors: error.originalError.validationErrors
    }
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

  if (process.env.NODE_ENV === 'production') {
    // Generates an unique ID for each error:
    const errorId = uuid()
    bigLog(`ErrorID: ${errorId}`, error)
    return createErrorObject('Internal error.', 'ERR_INTERNAL_ERROR')
  }

  return error
}
