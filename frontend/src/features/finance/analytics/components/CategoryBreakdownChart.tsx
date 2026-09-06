import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { BudgetCategory } from "@/features/finance/categories/types/category.types";
import { getCategoryBreakdownData } from "../helpers/analytics.helpers";
import type { CategoryBreakdownItem } from "../types/analytics.types";

type CategoryBreakdownChartProps = {
  categories: BudgetCategory[];
};

const renderLabel = ({
  name,
  payload,
}: {
  name?: string;
  payload?: CategoryBreakdownItem;
}) => {
  return `${name} ${payload?.percentage ?? 0}%`;
};

const CategoryBreakdownChart = ({
  categories,
}: CategoryBreakdownChartProps) => {
  const data = getCategoryBreakdownData(categories);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>
          Spending distribution across categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                label={renderLabel}
                labelLine={{ strokeWidth: 1 }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString("en-IN")}`,
                  "Spent",
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--card)",
                  color: "var(--card-foreground)",
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdownChart;
