import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BudgetCategory } from "@/features/finance/categories/types/category.types";
import { getBudgetPerformance, formatINR } from "../helpers/reports.helpers";
import type { CategoryHighlight } from "../types/report.types";

type BudgetPerformanceReportProps = {
  categories: BudgetCategory[];
};

const HighlightCard = ({
  label,
  highlight,
  variant,
}: {
  label: string;
  highlight: CategoryHighlight;
  variant: "default" | "success" | "warning" | "muted";
}) => {
  const borderColor: Record<string, string> = {
    default: "border-l-primary",
    success: "border-l-emerald-500",
    warning: "border-l-amber-500",
    muted: "border-l-muted-foreground",
  };

  return (
    <Card className={`border-l-4 ${borderColor[variant]}`}>
      <CardContent className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span
            className="block h-3 w-3 rounded-full"
            style={{ backgroundColor: highlight.color }}
          />
          <span className="text-lg font-semibold">{highlight.name}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
          <div>
            <p className="text-xs text-muted-foreground">Spent</p>
            <p className="font-mono text-sm font-medium">
              {formatINR(highlight.spent)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Allocated</p>
            <p className="font-mono text-sm font-medium">
              {formatINR(highlight.allocated)}
            </p>
          </div>
          <div className="col-span-2 mt-1">
            <p className="text-xs text-muted-foreground">Utilization</p>
            <p className="font-mono text-sm font-semibold">
              {highlight.utilization}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BudgetPerformanceReport = ({
  categories,
}: BudgetPerformanceReportProps) => {
  const performance = getBudgetPerformance(categories);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Performance</CardTitle>
        <CardDescription>
          Key category performance highlights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <HighlightCard
            label="Highest Spending"
            highlight={performance.highestSpending}
            variant="warning"
          />
          <HighlightCard
            label="Lowest Spending"
            highlight={performance.lowestSpending}
            variant="success"
          />
          <HighlightCard
            label="Most Utilized"
            highlight={performance.mostUtilized}
            variant="default"
          />
          <HighlightCard
            label="Least Utilized"
            highlight={performance.leastUtilized}
            variant="muted"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetPerformanceReport;
