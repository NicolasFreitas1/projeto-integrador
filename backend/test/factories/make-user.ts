import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/stock/enterprise/entities/user'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      address: faker.location.city(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      type: 'CLIENT',
      ...override,
    },
    id,
  )

  return user
}
