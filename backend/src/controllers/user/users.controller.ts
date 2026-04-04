import type { NextFunction, Request, Response } from "express";
import type { IUserRegister } from "../../types/user.types.ts";
import UsersService from "../../services/user/users.service.ts";
import { Error } from "mongoose";

const UsersController = {
  async registration(req: Request, res: Response, next: NextFunction) {
    const body: IUserRegister = req.body;

    try {
      const correctUserData: IUserRegister = {
        username: body.username,
        password: body.password,
        display_name: body.display_name,
        phone_number: body.phone_number,
      };

      const user: IUserRegister =
        await UsersService.registration(correctUserData);

      return res.json(user);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(400).json(error);
      }

      next(error);
    }
  },

  async authentication(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const { user, isMatch } = await UsersService.authentication(
        username,
        password,
      );

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      if (!isMatch) {
        return res.status(401).json({
          error: "Invalid password",
        });
      }

      return res.json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default UsersController;
