import { Router } from "express";
import usersRouter from "./user/users.route.ts";
import productsRouter from "./product/products.route.ts";

const apiRoute = Router();

apiRoute.use("/users", usersRouter);
apiRoute.use("/products", productsRouter);

export default apiRoute;
