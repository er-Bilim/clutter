import { Router } from "express";
import UsersController from "../../controllers/user/users.controller.ts";
import auth from "../../middlewares/auth.ts";

const usersRouter = Router();

usersRouter.post("/register", UsersController.registration);

usersRouter.post("/login", UsersController.authentication);

usersRouter.delete("/logout", auth, UsersController.logout);

export default usersRouter;
