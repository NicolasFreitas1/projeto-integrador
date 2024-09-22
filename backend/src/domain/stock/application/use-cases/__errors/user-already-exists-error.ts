import { UseCaseError } from '@/core/errors/use-cases-error'

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User with email "${identifier}" already exists`)
  }
}
