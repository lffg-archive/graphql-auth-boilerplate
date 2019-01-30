export function log(messages: any[]) {
  messages.forEach((message) => console.log(message))
}

export function bigLog(...messages: any[]): void {
  console.log('-'.repeat(50))
  log(messages)
  console.log('-'.repeat(50))
}

export function debug(...messages: any[]): void {
  if (process.env.NODE_ENV !== 'production') {
    log(messages)
  }
}
