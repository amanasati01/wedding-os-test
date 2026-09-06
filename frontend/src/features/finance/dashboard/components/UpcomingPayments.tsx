import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { UpcomingPayment } from "../types/dashboard.types";

type UpcomingPaymentsProps = {
  data: UpcomingPayment[];
};

const statusStyles: Record<UpcomingPayment["status"], string> = {
  scheduled: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
};

const UpcomingPayments = ({ data }: UpcomingPaymentsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
        <CardDescription>Scheduled vendor payments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Vendor</th>
                <th className="pb-3 font-medium hidden sm:table-cell">
                  Description
                </th>
                <th className="pb-3 font-medium">Due Date</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-border/50 last:border-0"
                >
                  <td className="py-3 font-medium">{payment.vendor}</td>
                  <td className="py-3 text-muted-foreground hidden sm:table-cell">
                    {payment.description}
                  </td>
                  <td className="py-3 tabular-nums">{payment.dueDate}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[payment.status]}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-semibold tabular-nums">
                    ₹{payment.amount.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingPayments;
