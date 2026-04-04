import Category from "../../model/category/Category.ts";

const CategoryService = {
  async getAll() {
    const categories = await Category.find();
    return categories;
  },
};

export default CategoryService;
