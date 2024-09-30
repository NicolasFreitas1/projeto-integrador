import { WrongCredentialsError } from '@/domain/stock/application/use-cases/__errors/wrong-credentials-error'
import { AuthenticateUserUseCase } from '@/domain/stock/application/use-cases/user/authenticate-user'
import { Public } from '@/infra/auth/public'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import {
  AuthenticateUserDTO,
  bodyValidationPipe,
} from './dto/authenticate-user.dto'

@ApiTags('Session')
@Public()
@Controller('/sessions')
export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: AuthenticateUserDTO) {
    const { login, password } = body

    const result = await this.authenticateUserUseCase.execute({
      login,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException()
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
