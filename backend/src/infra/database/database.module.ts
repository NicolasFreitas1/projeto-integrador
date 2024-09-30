import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsersRepository } from '@/domain/stock/application/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { PrismaTagsRepository } from './prisma/repositories/prisma-tags-repository'
import { TagsRepository } from '@/domain/stock/application/repositories/tags-repository'
import { ProductsRepository } from '@/domain/stock/application/repositories/products-repository'
import { PrismaProductsRepository } from './prisma/repositories/prisma-products-repository'
import { ProductTagsRepository } from '@/domain/stock/application/repositories/product-tags-repository'
import { PrismaProductTagsRepository } from './prisma/repositories/prisma-product-tags-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: TagsRepository,
      useClass: PrismaTagsRepository,
    },
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository,
    },
    {
      provide: ProductTagsRepository,
      useClass: PrismaProductTagsRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    TagsRepository,
    ProductsRepository,
    ProductTagsRepository,
  ],
})
export class DatabaseModule {}
