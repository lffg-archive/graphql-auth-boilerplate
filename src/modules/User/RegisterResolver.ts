import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { GenericError } from '../../utils/error/GenericError'
import { User } from './User.entity'

@Resolver()
export class RegisterResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await User.find()
    return users
  }

  @Mutation(() => User)
  async register(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('email') email: string
  ): Promise<User> {
    try {
      const user = await User.create({
        username,
        password,
        email
      }).save()

      return user
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new GenericError('User already exists.', 'USER_EXISTS')
      }

      throw error
    }
  }
}
