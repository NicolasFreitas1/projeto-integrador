import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { ApiProperty } from '@nestjs/swagger'
import { PaymentMethod } from '@prisma/client'
import { z } from 'zod'

const editSaleBodySchema = z.object({
  quantity: z.number(),
  productId: z.string().uuid(),
  soldAt: z
    .string()
    .transform((a) => new Date(a))
    .pipe(z.date()),
  sellerId: z.string().uuid(),
  paymentMethod: z.nativeEnum(PaymentMethod),
})

type EditSaleBodySchema = z.infer<typeof editSaleBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(editSaleBodySchema)

export class EditSaleDTO implements EditSaleBodySchema {
  @ApiProperty()
  productId: string

  @ApiProperty()
  quantity: number

  @ApiProperty()
  soldAt: Date

  @ApiProperty()
  sellerId: string

  @ApiProperty()
  paymentMethod:
    | 'CREDIT_CARD'
    | 'DEBIT_CARD'
    | 'BANK_TRANSFER'
    | 'BANK_SLIP'
    | 'CASH'
    | 'PIX'
    | 'OTHER'
}
