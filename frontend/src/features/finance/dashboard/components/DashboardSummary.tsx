import SummaryCard from "@/components/finance/SummaryCard";
import type { SummaryMetric } from "../types/dashboard.types";

type DashboardSummaryProps = {
  metrics: SummaryMetric[];
};

const DashboardSummary = ({ metrics }: DashboardSummaryProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <SummaryCard
          key={metric.id}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          trend={metric.trend}
        />
      ))}
    </div>
  );
};

export default DashboardSummary;