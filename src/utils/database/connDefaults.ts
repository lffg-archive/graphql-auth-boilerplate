import { Env } from '../../types/env'

export interface IConnOptions {
  name: Env
  type: 'mysql'
  synchronize: boolean
  logging: boolean
  entities: string[]
  migrations: string[]
  subscribers: string[]
  cli?: any
}

export const applyToAll = {
  charset: 'utf8mb4'
}

export const defaultOptions: IConnOptions[] = [
  {
    name: 'development',
    type: 'mysql',
    synchronize: true,
    logging: true,
    entities: ['src/entities/*.*'],
    migrations: ['src/database/migrations/**/*.*'],
    subscribers: ['src/database/subscriber/**/*.*']
  },
  {
    name: 'production',
    type: 'mysql',
    synchronize: false,
    logging: false,
    entities: ['dist/entities/*.*'],
    migrations: ['dist/database/migrations/**/*.*'],
    subscribers: ['dist/database/subscriber/**/*.*']
  },
  {
    name: 'test',
    type: 'mysql',
    synchronize: true,
    logging: false,
    entities: ['src/entities/*.*'],
    migrations: ['src/database/migrations/**/*.*'],
    subscribers: ['src/database/subscriber/**/*.*']
  }
]
