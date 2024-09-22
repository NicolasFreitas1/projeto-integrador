import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface SaleProps {
  value: number
  quantity: number
  soldAt: Date
  productId: UniqueEntityId
  clientId: UniqueEntityId
}

export class Sale extends Entity<SaleProps> {
  get value() {
    return this.props.value
  }

  set value(value: number) {
    this.props.value = value
  }

  get quantity() {
    return this.props.quantity
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity
  }

  get soldAt() {
    return this.props.soldAt
  }

  set soldAt(soldAt: Date) {
    this.props.soldAt = soldAt
  }

  get productId() {
    return this.props.productId
  }

  set productId(productId: UniqueEntityId) {
    this.props.productId = productId
  }

  get clientId() {
    return this.props.clientId
  }

  set clientId(clientId: UniqueEntityId) {
    this.props.clientId = clientId
  }

  static create(props: Optional<SaleProps, 'soldAt'>, id?: UniqueEntityId) {
    const sale = new Sale({ ...props, soldAt: props.soldAt ?? new Date() }, id)

    return sale
  }
}
