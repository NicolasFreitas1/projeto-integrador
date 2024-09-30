import { CreateProductWithTagsUseCase } from '@/domain/stock/application/use-cases/product/create-product-with-tags'
import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import {
  bodyValidationPipe,
  CreateProductWithTagsDTO,
} from './dto/create-product-with-tags.dto'

@ApiTags('Product')
@ApiBearerAuth()
@Controller('/product')
export class CreateProductWithTagsController {
  constructor(
    private createProductWithTagsUseCase: CreateProductWithTagsUseCase,
  ) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateProductWithTagsDTO) {
    const { name, barcode, quantity, tagNames, value } = body

    const result = await this.createProductWithTagsUseCase.execute({
      name,
      barcode,
      quantity,
      tagNames,
      value,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
