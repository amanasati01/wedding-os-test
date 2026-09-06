import { Card, CardContent } from "@/components/ui/card";

type SummaryCardProps = {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
};

const trendColors: Record<string, string> = {
  up: "text-emerald-600",
  down: "text-red-500",
  neutral: "text-muted-foreground",
};

const SummaryCard = ({ title, value, change, trend }: SummaryCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight">{value}</h2>

        {change && trend && (
          <p className={`mt-1 text-xs font-medium ${trendColors[trend]}`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {change}{" "}
            from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;