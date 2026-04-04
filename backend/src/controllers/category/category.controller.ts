import type { NextFunction, Request, Response } from "express";
import CategoryService from "../../services/category/category.service.ts";

const CategoryController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAll();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  },
};

export default CategoryController;
