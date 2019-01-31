import { Arg, Mutation, Resolver } from 'type-graphql'
import { User } from '../../entities/User'
import { RegisterInput } from './register/RegisterInput'

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('input') input: RegisterInput): Promise<User> {
    const user = await User.create({ ...input }).save()
    return user
  }
}
