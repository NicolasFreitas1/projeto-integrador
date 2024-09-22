import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface SupplierProps {
  name: string
  contact: string
  createdAt: Date
}

export class Supplier extends Entity<SupplierProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get contact() {
    return this.props.contact
  }

  set contact(contact: string) {
    this.props.contact = contact
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<SupplierProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const supplier = new Supplier(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return supplier
  }
}
