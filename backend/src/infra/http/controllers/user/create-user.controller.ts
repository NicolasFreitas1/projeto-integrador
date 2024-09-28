import { CreateUserUseCase } from '@/domain/stock/application/use-cases/user/create-user'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common'
import { CreateUserDTO, bodyValidationPipe } from './dto/create-user.dto'
import { UserAlreadyExistsError } from '@/domain/stock/application/use-cases/__errors/user-already-exists-error'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('User')
@ApiBearerAuth()
@Controller('/user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateUserDTO) {
    const { login, name, password } = body

    const result = await this.createUserUseCase.execute({
      login,
      name,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
