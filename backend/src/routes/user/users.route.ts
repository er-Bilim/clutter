import { Router } from "express";
import UsersController from "../../controllers/user/users.controller.ts";

const usersRouter = Router();

usersRouter.post("/register", UsersController.registration);

usersRouter.post("/login", UsersController.authentication);

export default usersRouter;
