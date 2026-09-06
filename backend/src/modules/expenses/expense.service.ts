import prisma from "../../database/prisma.js";
import type { CreateExpenseInput, UpdateExpenseInput } from "./expense.schema.js";
import { ApiError } from "../../shared/ApiError.js";

export class ExpenseService {
  static async getAll(weddingId: string) {
    return prisma.expense.findMany({
      where: { weddingId },
      orderBy: { expenseDate: "desc" },
    });
  }

  static async getById(id: string, weddingId: string) {
    const expense = await prisma.expense.findFirst({
      where: { id, weddingId },
    });

    if (!expense) {
      throw new ApiError(404, "Expense not found");
    }

    return expense;
  }

  static async create(weddingId: string, data: CreateExpenseInput) {
    // Verify that the budgetCategory belongs to this wedding
    const category = await prisma.budgetCategory.findFirst({
      where: { id: data.budgetCategoryId, weddingId },
    });

    if (!category) {
      throw new ApiError(404, "Budget category not found for this wedding");
    }

    const createData: any = {
      title: data.title,
      amount: data.amount,
      expenseDate: new Date(data.expenseDate),
      notes: data.notes ?? null,
      budgetCategoryId: data.budgetCategoryId,
      weddingId,
    };
    if (data.status) createData.status = data.status;

    return prisma.expense.create({
      data: createData,
    });
  }

  static async update(id: string, weddingId: string, data: UpdateExpenseInput) {
    await this.getById(id, weddingId);

    if (data.budgetCategoryId) {
      const category = await prisma.budgetCategory.findFirst({
        where: { id: data.budgetCategoryId, weddingId },
      });
      if (!category) {
        throw new ApiError(404, "Budget category not found for this wedding");
      }
    }

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.amount !== undefined) updateData.amount = data.amount;
    if (data.expenseDate !== undefined) updateData.expenseDate = new Date(data.expenseDate);
    if (data.notes !== undefined) updateData.notes = data.notes ?? null;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.budgetCategoryId !== undefined) updateData.budgetCategoryId = data.budgetCategoryId;

    return prisma.expense.update({
      where: { id },
      data: updateData,
    });
  }

  static async remove(id: string, weddingId: string) {
    await this.getById(id, weddingId);

    return prisma.expense.delete({
      where: { id },
    });
  }
}
