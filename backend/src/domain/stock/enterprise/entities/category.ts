import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CategoryProps {
  name: string
  description: string
  createdAt: Date
}

export class Category extends Entity<CategoryProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<CategoryProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const category = new Category(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return category
  }
}
