import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { BudgetCategory } from "@/features/finance/categories/types/category.types";
import {
  getBudgetVsSpentData,
  formatCurrency,
} from "../helpers/analytics.helpers";

type BudgetVsSpentChartProps = {
  categories: BudgetCategory[];
};

const BudgetVsSpentChart = ({ categories }: BudgetVsSpentChartProps) => {
  const data = getBudgetVsSpentData(categories);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs Spent</CardTitle>
        <CardDescription>
          Allocated budget compared to actual spending
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted/30"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString("en-IN")}`,
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--card)",
                  color: "var(--card-foreground)",
                }}
              />
              <Legend />
              <Bar
                dataKey="allocated"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                name="Allocated"
              />
              <Bar
                dataKey="spent"
                fill="#f43f5e"
                radius={[4, 4, 0, 0]}
                name="Spent"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetVsSpentChart;
