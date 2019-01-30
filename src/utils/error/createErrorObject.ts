export interface ErrorObject {
  message: string
  code: string
  details?: string
}

export function createErrorObject(
  message: string,
  code: string,
  details?: string
): ErrorObject {
  return { message, code, details }
}
