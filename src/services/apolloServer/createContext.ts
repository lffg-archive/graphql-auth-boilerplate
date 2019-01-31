import { MyContext } from '../../types/MyContext'

export function createContext({ req }: any): MyContext {
  return {
    req
  }
}
