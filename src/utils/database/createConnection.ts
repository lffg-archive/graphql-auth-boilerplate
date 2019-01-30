import { createConnection } from 'typeorm'
import { applyToAll, defaultOptions } from './connDefaults'

export function createConn() {
  const secureOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:
      process.env.NODE_ENV === 'test'
        ? process.env.DB_TEST_DATABASE
        : process.env.DB_DATABASE
  }

  const environmentOptions = defaultOptions.find(
    ({ name }) => name === process.env.NODE_ENV
  )

  if (!environmentOptions) {
    throw new Error(
      'No correct environment is set. You must set NODE_ENV=development|production|test'
    )
  }

  const options = {
    ...applyToAll,
    ...environmentOptions,
    ...secureOptions,
    name: 'default'
  }
  return createConnection(options as any)
}
