import { createConnection } from 'typeorm'
import config from '../../config/database'

export async function createTypeormConn() {
  return createConnection(config as any)
}
