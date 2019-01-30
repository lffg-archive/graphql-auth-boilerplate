import { registerDecorator, ValidationOptions } from 'class-validator'
import { BaseEntity } from 'typeorm'

export function IsUnique(
  entityClass: any,
  fieldNameInTheDatabase?: string,
  validationOptions: ValidationOptions = {}
) {
  if (!(entityClass.prototype instanceof BaseEntity)) {
    throw new TypeError(
      'The entity must extend "BaseEntity" in the IsUnique validator.'
    )
  }

  return (object: any, propertyName: string) => {
    const field = fieldNameInTheDatabase || propertyName

    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName,
      options: {
        message: `duplicate value in ${entityClass.name}.${field}`,
        ...validationOptions
      },
      validator: {
        async validate(value: any): Promise<boolean> {
          const user = await entityClass.find({
            where: { [field]: value }
          })

          return !user
        }
      }
    })
  }
}
