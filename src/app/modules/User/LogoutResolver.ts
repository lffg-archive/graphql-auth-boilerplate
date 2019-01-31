import { Ctx, Mutation, Resolver } from 'type-graphql'
import { MyContext } from '../../../types/MyContext'

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean, { nullable: true })
  async logout(
    @Ctx()
    ctx: MyContext
  ): Promise<boolean | null> {
    if (!ctx.req.session!.userId) return null
    return new Promise((res) => ctx.req.session!.destroy((err) => res(!err)))
  }
}
