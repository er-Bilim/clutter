import { Router } from "express";
import CategoryController from "../../controllers/category/category.controller.ts";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getAll);

export default categoryRouter;
