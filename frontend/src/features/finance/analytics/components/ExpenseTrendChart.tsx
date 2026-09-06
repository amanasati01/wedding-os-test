import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Expense } from "@/features/finance/expenses/types/expense.types";
import {
  getExpenseTrendData,
  formatCurrency,
} from "../helpers/analytics.helpers";

type ExpenseTrendChartProps = {
  expenses: Expense[];
};

const ExpenseTrendChart = ({ expenses }: ExpenseTrendChartProps) => {
  const data = getExpenseTrendData(expenses);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Trend</CardTitle>
        <CardDescription>
          Individual spending and cumulative total over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted/30"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                className="text-muted-foreground"
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <Tooltip
                formatter={(value, name) => [
                  `₹${Number(value).toLocaleString("en-IN")}`,
                  name === "cumulative" ? "Cumulative" : "Amount",
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--card)",
                  color: "var(--card-foreground)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 4, fill: "#6366f1" }}
                activeDot={{ r: 6 }}
                name="Amount"
              />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke="#22c55e"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Cumulative"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseTrendChart;
