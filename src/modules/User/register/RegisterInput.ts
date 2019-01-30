import { IsEmail, Length, MinLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { User } from '../../../entities/User'
import { IsUnique } from '../../../utils/validators/IsUnique'

@InputType()
export class RegisterInput {
  @Field()
  @Length(4, 30)
  @IsUnique(User, 'username')
  username: string

  @Field()
  @IsEmail()
  @IsUnique(User, 'email')
  email: string

  @Field()
  @MinLength(3)
  password: string
}
