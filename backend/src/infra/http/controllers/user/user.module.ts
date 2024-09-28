import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateUserController } from './create-user.controller'
import { CreateUserUseCase } from '@/domain/stock/application/use-cases/user/create-user'
import { AuthenticateUserController } from './authenticate-user.controller'
import { AuthenticateUserUseCase } from '@/domain/stock/application/use-cases/user/authenticate-user'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateUserController, CreateUserController],
  providers: [AuthenticateUserUseCase, CreateUserUseCase],
})
export class UserModule {}
