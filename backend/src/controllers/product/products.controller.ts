import type { NextFunction, Request, Response } from "express";
import ProductService from "../../services/product/products.service.ts";
import type { IProduct } from "../../types/product.types.ts";
import { Error } from "mongoose";
import type { RequestWithUser } from "../../middlewares/auth.ts";
import deleteImage from "../../utils/deleteImage.ts";

const ProductController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query: { category?: string } = {};

      if (req.query.category) {
        query.category = req.query.category as string;
      }

      const products = await ProductService.getAll(query);
      return res.json(products);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    const body: IProduct = req.body;
    const userReq = req as RequestWithUser;
    const user = userReq.user;

    const correctProductData = {
      user: user.id,
      category: body.category,
      title: body.title,
      description: body.description,
      price: body.price,
      image: req.file ? `/images/${req.file.filename}` : null,
    };
    try {
      const product = await ProductService.create(correctProductData);

      return res.json(product);
    } catch (error) {
      await deleteImage(correctProductData, req);
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
      await deleteImage({ image: product.image }, req);

      return res.json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default ProductController;
