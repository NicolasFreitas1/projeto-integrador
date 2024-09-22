import { Either, left, right } from '@/core/either'
import { User } from '@/domain/stock/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'
import { UserAlreadyExistsError } from '../__errors/user-already-exists-error'
import { HashGenerator } from '../../cryptography/hash-generator'

interface CreateAdminUserUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  address: string
}

type CreateAdminUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  { user: User }
>

@Injectable()
export class CreateAdminUserUseCase {
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
  }: CreateAdminUserUseCaseRequest): Promise<CreateAdminUserUseCaseResponse> {
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
      type: 'ADMIN',
    })

    await this.usersRepository.create(user)

    return right({ user })
  }
}
