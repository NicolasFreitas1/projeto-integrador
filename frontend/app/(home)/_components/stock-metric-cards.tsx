import {
  Package,
  SkullIcon,
  TriangleAlertIcon,
  WalletIcon,
} from "lucide-react";
import { MetricCard } from "./metric-card";

interface StockMetricCardsProps {
  revenueGenerated: number;
  totalStock: number;
  totalMissing: number;
  totalInRisk: number;
}

export function StockMetricCards({
  revenueGenerated,
  totalInRisk,
  totalMissing,
  totalStock,
}: StockMetricCardsProps) {
  return (
    <div className="space-y-6">
      {/* PRIMEIRO CARD */}

      <MetricCard
        icon={<WalletIcon size={16} />}
        title="Receita gerada"
        value={revenueGenerated}
        isCurrency
        size="large"
      />

      {/* OUTROS CARDS */}
      {/* Produtos catalogados */}
      <div className="grid grid-cols-3 gap-6">
        <MetricCard
          icon={<Package size={16} />}
          title="Total no estoque"
          value={totalStock}
        />
        <MetricCard
          icon={<TriangleAlertIcon size={16} className="text-yellow-500" />}
          title="Total em risco"
          value={totalInRisk}
        />
        <MetricCard
          icon={<SkullIcon size={16} className="text-red-500" />}
          title="Total em falta"
          value={totalMissing}
        />
      </div>
    </div>
  );
}