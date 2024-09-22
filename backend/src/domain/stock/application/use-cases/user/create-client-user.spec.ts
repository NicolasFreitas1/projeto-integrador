import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateClientUserUseCase } from './create-client-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: CreateClientUserUseCase

describe('Create Client User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    fakeHasher = new FakeHasher()

    sut = new CreateClientUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'example student',
      email: 'example@example.com',
      password: '123456',
      address: 'example address',
      phone: '48999999',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
    expect(inMemoryUsersRepository.items[0].type).toEqual('CLIENT')
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'example student',
      email: 'example@example.com',
      password: '123456',
      address: 'example address',
      phone: '48999999',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
  })
})
