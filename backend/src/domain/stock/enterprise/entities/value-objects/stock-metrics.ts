import { ValueObject } from '@/core/entities/value-object'

export interface StockMetricsProps {
  totalStock: number
  totalMissing: number
  totalInRisk: number
}

export class StockMetrics extends ValueObject<StockMetricsProps> {
  get totalStock() {
    return this.props.totalStock
  }

  get totalMissing() {
    return this.props.totalMissing
  }

  get totalInRisk() {
    return this.props.totalInRisk
  }

  static create(props: StockMetricsProps) {
    return new StockMetrics(props)
  }
}
