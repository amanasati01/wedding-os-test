import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BudgetCategory } from "@/features/finance/categories/types/category.types";
import type { ReportFilters as ReportFiltersType } from "../types/report.types";

type ReportFiltersProps = {
  categories: BudgetCategory[];
  filters: ReportFiltersType;
  onChange: (filters: ReportFiltersType) => void;
};

const ReportFilters = ({
  categories,
  filters,
  onChange,
}: ReportFiltersProps) => {
  const updateFilter = (key: keyof ReportFiltersType, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Filters</CardTitle>
        <CardDescription>
          Filter reports by category, status, or date range
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Category Filter */}
          <div className="space-y-2">
            <Label htmlFor="filter-category">Category</Label>
            <Select
              value={filters.categoryId}
              onValueChange={(val) => updateFilter("categoryId", val)}
            >
              <SelectTrigger id="filter-category" className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="filter-status">Status</Label>
            <Select
              value={filters.status}
              onValueChange={(val) => updateFilter("status", val)}
            >
              <SelectTrigger id="filter-status" className="w-full">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date From */}
          <div className="space-y-2">
            <Label htmlFor="filter-date-from">From Date</Label>
            <Input
              id="filter-date-from"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => updateFilter("dateFrom", e.target.value)}
            />
          </div>

          {/* Date To */}
          <div className="space-y-2">
            <Label htmlFor="filter-date-to">To Date</Label>
            <Input
              id="filter-date-to"
              type="date"
              value={filters.dateTo}
              onChange={(e) => updateFilter("dateTo", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportFilters;
