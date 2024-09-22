import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type UserType = 'ADMIN' | 'EMPLOYEE' | 'CLIENT'

export interface UserProps {
  name: string
  email: string
  password: string
  type: UserType
  phone: string
  address: string
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get type() {
    return this.props.type
  }

  set type(type: UserType) {
    this.props.type = type
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
  }

  get address() {
    return this.props.address
  }

  set address(address: string) {
    this.props.address = address
  }

  static create(props: Optional<UserProps, 'type'>, id?: UniqueEntityId) {
    const user = new User({ ...props, type: props.type ?? 'CLIENT' }, id)

    return user
  }
}
