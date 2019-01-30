export function log(...messages: any[]): void {
  console.log('-'.repeat(50))
  messages.forEach((message) => console.log(message))
  console.log('-'.repeat(50))
}
