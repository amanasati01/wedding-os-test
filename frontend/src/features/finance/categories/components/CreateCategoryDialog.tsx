import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import CategoryForm from "./CategoryForm";
import {
  categorySchema,
  type CategoryFormValues,
} from "../schemas/category.schema";
import type { BudgetCategory } from "../types/category.types";

type CreateCategoryDialogProps = {
  onCreate: (category: BudgetCategory) => void;
};

export default function CreateCategoryDialog({
  onCreate,
}: CreateCategoryDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      allocated: 0,
      color: "#8b5cf6",
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    const newCategory: BudgetCategory = {
      id: crypto.randomUUID(),
      name: data.name,
      allocated: data.allocated,
      color: data.color,
      spent: 0,
    };
    onCreate(newCategory);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Add a new budget category for your wedding.
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          form={form}
          onSubmit={onSubmit}
          submitLabel="Create Category"
        />
      </DialogContent>
    </Dialog>
  );
}
