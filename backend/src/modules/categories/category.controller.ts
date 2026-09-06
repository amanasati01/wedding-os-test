import type { Request, Response, NextFunction } from "express";
import { APiResponse } from "../../shared/ApiResponse.js";
import { CategoryService } from "./category.service.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.schema.js";

export class CategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { weddingId } = req.params as { weddingId: string };
      const categories = await CategoryService.getAll(weddingId);
      
      res.status(200).json(new APiResponse(true, "Categories retrieved successfully", categories));
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, weddingId } = req.params as { id: string; weddingId: string };
      const category = await CategoryService.getById(id, weddingId);
      
      res.status(200).json(new APiResponse(true, "Category retrieved successfully", category));
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { weddingId } = req.params as { weddingId: string };
      
      // Validation is done by middleware or we do it here:
      const validatedData = createCategorySchema.parse(req.body);
      
      const newCategory = await CategoryService.create(weddingId, validatedData);
      
      res.status(201).json(new APiResponse(true, "Category created successfully", newCategory));
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, weddingId } = req.params as { id: string; weddingId: string };
      
      const validatedData = updateCategorySchema.parse(req.body);
      
      const updatedCategory = await CategoryService.update(id, weddingId, validatedData);
      
      res.status(200).json(new APiResponse(true, "Category updated successfully", updatedCategory));
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, weddingId } = req.params as { id: string; weddingId: string };
      
      const deletedCategory = await CategoryService.remove(id, weddingId);
      
      res.status(200).json(new APiResponse(true, "Category deleted successfully", deletedCategory));
    } catch (error) {
      next(error);
    }
  }
}
