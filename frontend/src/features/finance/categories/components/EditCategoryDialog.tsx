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
import { Pencil } from "lucide-react";

type EditCategoryDialogProps = {
  category: BudgetCategory;
  onEdit: (updated: BudgetCategory) => void;
};

export default function EditCategoryDialog({
  category,
  onEdit,
}: EditCategoryDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      allocated: category.allocated,
      color: category.color,
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    const updated: BudgetCategory = {
      ...category,
      name: data.name,
      allocated: data.allocated,
      color: data.color,
    };
    onEdit(updated);
    setOpen(false);
  };

  // Reset form with fresh values when dialog opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      form.reset({
        name: category.name,
        allocated: category.allocated,
        color: category.color,
      });
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit {category.name}</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the budget details for <strong>{category.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          form={form}
          onSubmit={onSubmit}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}
