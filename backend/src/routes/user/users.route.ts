import { Router } from "express";
import auth from "../../middlewares/auth.ts";
import UsersController from "../../controllers/user/users.controller.ts";

const usersRouter = Router();

usersRouter.post("/register", UsersController.registration);

usersRouter.post("/login", auth, UsersController.authentication);

export default usersRouter;
