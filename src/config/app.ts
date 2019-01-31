import { join } from 'path'

export const RESOLVERS_BASE_DIR = join(global.__ROOT__, 'app', 'modules')

export const ENTITIES_DIR = join(global.__ROOT__, 'app', 'entities')

export const MIGRATIONS_DIR = join(
  global.__ROOT__,
  'services',
  'database',
  'migrations'
)

export const SUBSCRIBERS_DIR = join(
  global.__ROOT__,
  'services',
  'database',
  'subscribers'
)
