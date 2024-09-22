import { Either, left, right } from '@/core/either'
import { User } from '@/domain/stock/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'
import { UserAlreadyExistsError } from '../__errors/user-already-exists-error'
import { HashGenerator } from '../../cryptography/hash-generator'

interface CreateClientUserUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  address: string
}

type CreateClientUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  { user: User }
>

@Injectable()
export class CreateClientUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    address,
    email,
    name,
    password,
    phone,
  }: CreateClientUserUseCaseRequest): Promise<CreateClientUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      address,
      email,
      name,
      password: hashedPassword,
      phone,
      type: 'CLIENT',
    })

    await this.usersRepository.create(user)

    return right({ user })
  }
}
