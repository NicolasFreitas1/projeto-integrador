import { PaginationParams } from '@/core/repositories/pagination-params'
import { Product } from '../../enterprise/entities/product'

export abstract class ProductsRepository {
  abstract findMany(params: PaginationParams): Promise<Product[]>
  abstract findById(id: string): Promise<Product | null>
  abstract create(product: Product): Promise<void>
  abstract save(product: Product): Promise<void>
  abstract delete(product: Product): Promise<void>
}


