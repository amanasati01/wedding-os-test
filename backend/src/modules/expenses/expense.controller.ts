import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/asyncHandler.js";
import { APiResponse } from "../../shared/ApiResponse.js";
import { ExpenseService } from "./expense.service.js";

export class ExpenseController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const { weddingId } = req.params as { weddingId: string };
    const expenses = await ExpenseService.getAll(weddingId);
    return res.status(200).json(new APiResponse(true, "Expenses retrieved successfully", expenses));
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const { id, weddingId } = req.params as { id: string, weddingId: string };
    const expense = await ExpenseService.getById(id, weddingId);
    return res.status(200).json(new APiResponse(true, "Expense retrieved successfully", expense));
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const { weddingId } = req.params as { weddingId: string };
    const expense = await ExpenseService.create(weddingId, req.body);
    return res.status(201).json(new APiResponse(true, "Expense created successfully", expense));
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const { id, weddingId } = req.params as { id: string, weddingId: string };
    const expense = await ExpenseService.update(id, weddingId, req.body);
    return res.status(200).json(new APiResponse(true, "Expense updated successfully", expense));
  });

  static remove = asyncHandler(async (req: Request, res: Response) => {
    const { id, weddingId } = req.params as { id: string, weddingId: string };
    const expense = await ExpenseService.remove(id, weddingId);
    return res.status(200).json(new APiResponse(true, "Expense deleted successfully", expense));
  });
}
