import argon2 from 'argon2'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { MyContext } from '../../../types/MyContext'
import { User } from '../../entities/User'

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('uid') uid: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({
      where: [{ email: uid }, { username: uid }]
    })

    if (!user) return null
    if (!(await argon2.verify(user.password, password))) return null

    ctx.req.session!.userId = user.id
    return user
  }
}
