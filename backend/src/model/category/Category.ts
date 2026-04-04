import { model, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [70, "Name must be at most 70 characters long"],
  },
  description: {
    type: String,
    required: false,
    minLength: [5, "Description must be at least 3 characters long"],
    maxLength: [500, "Description must be at most 500 characters long"],
  },
});

const Category = model("Category", CategorySchema);

export default Category;
