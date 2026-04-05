import type { HydratedDocument } from "mongoose";
import User from "../../model/user/User.ts";
import type { IUser, IUserRegister } from "../../types/user.types.ts";

const UsersService = {
  async registration(data: IUserRegister) {
    const user = new User(data);
    user.generateAuthToken();
    return await user.save();
  },

  async authentication(username: string, password: string) {
    const user = await User.findOne({ username });
    const data = {
      user,
      isMatch: false,
    };

    if (user) {
      const isMatch: boolean = await user.checkPassword(password);
      data.user = user;

      if (isMatch) {
        data.user.generateAuthToken();
        await data.user.save();
        data.isMatch = isMatch;
      }
    }

    return data;
  },

  async logout(user: HydratedDocument<IUser>) {
    user.token = "";
    user.save();
  },
};

export default UsersService;
