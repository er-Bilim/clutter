import type { NextFunction, Request, Response } from "express";
import ProductService from "../../services/product/products.service.ts";
import type { IProduct } from "../../types/product.types.ts";
import { Error } from "mongoose";
import type { RequestWithUser } from "../../middlewares/auth.ts";

const ProductController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getAll();
      return res.json(products);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    const body: IProduct = req.body;
    try {
      const userReq = req as RequestWithUser;
      const user = userReq.user;

      const correctProductData = {
        user_id: user.id,
        category_id: body.category_id,
        title: body.title,
        description: body.description,
        price: body.price,
        image: req.file ? `/images/${req.file.filename}` : null,
      };

      const product = await ProductService.create(correctProductData);

      return res.json(product);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(400).json(error);
      }
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const product_id = req.params.id as string;

      const product = await ProductService.delete(product_id);

      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }

      return res.json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default ProductController;
