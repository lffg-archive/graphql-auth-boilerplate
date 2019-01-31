import { join } from 'path'
import { ENTITIES_DIR, MIGRATIONS_DIR, SUBSCRIBERS_DIR } from './app'

export default {
  name: 'default',
  type: 'mysql',

  // Secret options:
  // These should never be exposed.
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === 'testing'
      ? process.env.DB_TEST_DATABASE
      : process.env.DB_DATABASE,

  // Other options:
  logging: process.env.DB_LOG === 'true' ? true : false,
  synchronize: process.env.NODE_ENV !== 'production',

  // TypeORM stuff:
  entities: [join(ENTITIES_DIR, '*.*')],
  migrations: [join(MIGRATIONS_DIR, '**', '*.*')],
  subscribers: [join(SUBSCRIBERS_DIR, '**', '*.*')],
  cli: {
    entitiesDir: ENTITIES_DIR,
    migrationsDir: MIGRATIONS_DIR,
    subscribersDir: SUBSCRIBERS_DIR
  }
}
