export class GenericError extends Error {
  public type: string
  public message: string
  public code: string
  public description: string | undefined

  constructor(message: string, code: string, description?: string) {
    super(message)

    this.type = this.constructor.name
    this.message = message
    this.code = code
    this.description = description
  }

  public formatMessage() {
    return `[${this.name}] (${this.code}) ${this.message}${
      this.description ? ` - ${this.description}` : ''
    }`
  }
}
