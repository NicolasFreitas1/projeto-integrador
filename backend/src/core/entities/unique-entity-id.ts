import { randomUUID } from 'node:crypto'

export class UniqueIdEntityId {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  equals(id: UniqueIdEntityId) {
    return id.toValue() === this.value
  }
}
