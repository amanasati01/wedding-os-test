import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LayoutGrid, TrendingUp } from "lucide-react";

import type { BudgetCategory } from "../types/category.types";
import CreateCategoryDialog from "./CreateCategoryDialog";
import EditCategoryDialog from "./EditCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

type CategoryTableProps = {
  categories: BudgetCategory[];
  onCreate: (category: BudgetCategory) => void;
  onEdit: (updated: BudgetCategory) => void;
  onDelete: (id: string) => void;
};

// ── Empty State ────────────────────────────────────────────────────────────────
function EmptyState({ onCreate }: { onCreate: (c: BudgetCategory) => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="rounded-full bg-muted p-4">
        <LayoutGrid className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold">No budget categories yet</p>
        <p className="text-sm text-muted-foreground">
          Start by adding your first wedding budget category.
        </p>
      </div>
      <CreateCategoryDialog onCreate={onCreate} />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
const CategoryTable = ({
  categories,
  onCreate,
  onEdit,
  onDelete,
}: CategoryTableProps) => {
  const totalAllocated = categories.reduce((sum, c) => sum + c.allocated, 0);
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">Budget Categories</CardTitle>
          {categories.length > 0 && (
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              {fmt(totalSpent)} spent of {fmt(totalAllocated)} allocated
            </p>
          )}
        </div>
        {categories.length > 0 && <CreateCategoryDialog onCreate={onCreate} />}
      </CardHeader>

      <CardContent>
        {categories.length === 0 ? (
          <EmptyState onCreate={onCreate} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">Color</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Allocated</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead className="w-36">Progress</TableHead>
                <TableHead className="w-20 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.map((category) => {
                const remaining = category.allocated - category.spent;
                const progress = Math.min(
                  Math.round((category.spent / category.allocated) * 100),
                  100
                );
                const isOverBudget = category.spent > category.allocated;

                return (
                  <TableRow key={category.id}>
                    {/* Color dot */}
                    <TableCell>
                      <span
                        className="block h-3 w-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    </TableCell>

                    {/* Category name */}
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>

                    {/* Allocated */}
                    <TableCell className="text-right font-mono text-sm">
                      {fmt(category.allocated)}
                    </TableCell>

                    {/* Spent */}
                    <TableCell className="text-right font-mono text-sm">
                      {fmt(category.spent)}
                    </TableCell>

                    {/* Remaining */}
                    <TableCell
                      className={`text-right font-mono text-sm ${
                        isOverBudget
                          ? "text-destructive font-semibold"
                          : "text-emerald-500"
                      }`}
                    >
                      {isOverBudget ? "-" : ""}
                      {fmt(Math.abs(remaining))}
                    </TableCell>

                    {/* Progress bar */}
                    <TableCell>
                      <div className="space-y-1">
                        <Progress
                          value={progress}
                          className="h-2"
                          style={
                            {
                              "--progress-color": isOverBudget
                                ? "var(--destructive)"
                                : category.color,
                            } as React.CSSProperties
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          {progress}% used
                        </p>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <EditCategoryDialog
                          category={category}
                          onEdit={onEdit}
                        />
                        <DeleteCategoryDialog
                          category={category}
                          onDelete={onDelete}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryTable;