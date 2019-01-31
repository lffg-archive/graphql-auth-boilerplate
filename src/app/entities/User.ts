import argon2 from 'argon2'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'int' })
  id: string

  @Field()
  @Column({ type: 'varchar', length: 30, unique: true })
  username: string

  @Field()
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string

  @Field()
  @Column()
  password: string

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string

  @Field()
  @Column({ type: 'boolean', default: false })
  isActive: boolean

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password)
  }
}
