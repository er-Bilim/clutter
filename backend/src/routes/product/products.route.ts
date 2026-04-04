import { Router } from "express";
import auth from "../../middlewares/auth.ts";
import ProductController from "../../controllers/product/products.controller.ts";
import { imagesUpload } from "../../middlewares/mullter.ts";

const productsRouter = Router();

productsRouter.get("/", ProductController.getAll);

productsRouter.post(
  "/",
  auth,
  imagesUpload.single("image"),
  ProductController.create,
);

productsRouter.delete("/:id", auth, ProductController.delete);

export default productsRouter;
