import { model, Schema } from "mongoose";
import User from "../user/User.ts";
import Category from "../category/Category.ts";

const ProductSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,

    validate: {
      validator: async (user_id: string): Promise<boolean> => {
        const user = await User.exists({ _id: user_id });
        return Boolean(user);
      },
      message: "User not found",
    },
  },
  category: {
    type: String,
    ref: "Category",
    required: true,
    validate: {
      validator: async (category_id: string): Promise<boolean> => {
        const category = await Category.exists({ _id: category_id });
        return Boolean(category);
      },
      message: "Category not found",
    },
  },
  title: {
    type: String,
    required: true,
    minLength: [3, "Title must be at least 3 characters long"],
    maxLength: [70, "Title must be at most 70 characters long"],
  },
  description: {
    type: String,
    required: false,
    minLength: [5, "Description must be at least 3 characters long"],
    maxLength: [500, "Description must be at most 500 characters long"],
  },
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be at least 0"],
    max: [1000000, "Price must be at most 1000000"],
  },
  image: {
    type: String,
    required: false,
  },
});

const Product = model("Product", ProductSchema);

export default Product;
