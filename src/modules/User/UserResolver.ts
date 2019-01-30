import { Arg, Query, Resolver } from 'type-graphql'
import { User } from '../../entities/User'

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find()
  }

  @Query(() => User)
  async user(@Arg('id') id: string): Promise<User> {
    return User.findOneOrFail({ where: { id } })
  }
}
