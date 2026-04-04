import {
  Document,
  model,
  Model,
  Schema,
  type HydratedDocument,
} from "mongoose";
import type { UserMethods } from "./userModel.types.ts";
import regex from "./regex/regex.ts";
import type { IUser } from "../../types/user.types.ts";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../../config.ts";

type UserModel = Model<IUser, {}, UserMethods>;

const UserSchema = new Schema<HydratedDocument<IUser>, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => {
        return regex.username.test(value);
      },
      message: "Username can only contain letters and numbers without spaces",
    },
  },

  password: {
    type: String,
    required: true,
  },

  display_name: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        return regex.display_name.test(value);
      },
      message: "Display name can only contain letters and spaces",
    },
  },

  phone_number: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => {
        return regex.phone_number.test(value);
      },
      message:
        "Phone number is not valid. Only Kyrgyzstan numbers are allowed :D",
    },
  },

  token: {
    type: String,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hash = await argon2.hash(this.password, {
    type: argon2.argon2id,
  });

  return (this.password = hash);
});

UserSchema.set("toJSON", {
  transform: (_doc, ret, _options) => {
    const { password, token, __v, ...user } = ret;
    return user;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return argon2.verify(this.password, password);
};

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.jwtSecret, {
    expiresIn: "1h",
  });
  this.token = token;
};

UserSchema.path("username").validate({
  validator: async function (this: Document, username) {
    if (!this.isModified("username")) return true;
    const user = await User.exists({ username });
    return !user;
  },
  message: "User already exists",
});

UserSchema.path("phone_number").validate({
  validator: async function (this: Document, phone_number) {
    if (!this.isModified("phone_number")) return true;
    const user = await User.exists({ phone_number });
    return !user;
  },
  message: "Phone number already exists",
});

const User = model("User", UserSchema);

export default User;
