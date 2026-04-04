import { Router } from "express";
import usersRouter from "./user/users.route.ts";
import productsRouter from "./product/products.route.ts";
import categoryRouter from "./category/categories.route.ts";

const apiRoute = Router();

apiRoute.use("/users", usersRouter);
apiRoute.use("/categories", categoryRouter);
apiRoute.use("/products", productsRouter);

export default apiRoute;
