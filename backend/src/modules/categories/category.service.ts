import  prisma  from "../../database/prisma.js";
import { ApiError } from "../../shared/ApiError.js";

import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./category.schema.js";

export class CategoryService {
  static async getAll(
    weddingId: string
  ) {
    return prisma.budgetCategory.findMany({
      where: {
        weddingId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async getById(
    id: string,
    weddingId: string
  ) {
    const category =
      await prisma.budgetCategory.findFirst({
        where: {
          id,
          weddingId,
        },
      });

    if (!category) {
      throw new ApiError(
        404,
        "Category not found"
      );
    }

    return category;
  }

  static async create(
    weddingId: string,
    data: CreateCategoryInput
  ) {
    return prisma.budgetCategory.create({
      data: {
        name: data.name,
        allocatedAmount: data.allocatedAmount,
        color: data.color ?? null,
        weddingId,
      },
    });
  }

  static async update(
    id: string,
    weddingId: string,
    data: UpdateCategoryInput
  ) {
    await this.getById(
      id,
      weddingId
    );

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.allocatedAmount !== undefined) updateData.allocatedAmount = data.allocatedAmount;
    if (data.color !== undefined) updateData.color = data.color ?? null;

    return prisma.budgetCategory.update({
      where: { id },
      data: updateData,
    });
  }

  static async remove(
    id: string,
    weddingId: string
  ) {
    await this.getById(
      id,
      weddingId
    );

    return prisma.budgetCategory.delete({
      where: { id },
    });
  }
}