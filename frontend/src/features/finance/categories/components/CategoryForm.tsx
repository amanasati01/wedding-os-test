import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { UseFormReturn } from "react-hook-form";
import type { CategoryFormValues } from "../schemas/category.schema";

const COLOR_PRESETS = [
  "#8b5cf6",
  "#22c55e",
  "#f97316",
  "#3b82f6",
  "#ec4899",
  "#f43f5e",
  "#14b8a6",
  "#eab308",
];

type CategoryFormProps = {
  // Third generic (TTransformedValues) must be explicit to match zodResolver output
  form: UseFormReturn<CategoryFormValues, unknown, CategoryFormValues>;
  onSubmit: (data: CategoryFormValues) => void;
  submitLabel?: string;
};

const CategoryForm = ({
  form,
  onSubmit,
  submitLabel = "Save",
}: CategoryFormProps) => {
  const selectedColor = form.watch("color");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {/* Category Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Venue, Catering" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Allocated Budget */}
        <FormField
          control={form.control}
          name="allocated"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allocated Budget (₹)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g. 100000"
                  {...field}
                  value={field.value === 0 ? "" : field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Color Picker */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => field.onChange(color)}
                      className="h-7 w-7 rounded-full border-2 transition-all"
                      style={{
                        backgroundColor: color,
                        borderColor:
                          selectedColor === color ? "white" : "transparent",
                        boxShadow:
                          selectedColor === color
                            ? `0 0 0 2px ${color}`
                            : "none",
                      }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                  {/* Custom color input */}
                  <input
                    type="color"
                    value={field.value || "#8b5cf6"}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="h-7 w-7 cursor-pointer rounded-full border-0 bg-transparent p-0"
                    title="Custom color"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>

      </form>
    </Form>
  );
};

export default CategoryForm;
