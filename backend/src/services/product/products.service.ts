import type { HydratedDocument } from "mongoose";
import Product from "../../model/product/Product.ts";
import type { IProduct } from "../../types/product.types.ts";
import type { IUser } from "../../types/user.types.ts";

const ProductService = {
  async getAll() {
    const products = await Product.find();
    return products;
  },

  async create(data: IProduct) {
    const product = new Product(data);
    return await product.save();
  },

  async delete(id: string) {
    const product = await Product.findByIdAndDelete(id);
    return product;
  },

  async isProductOwner(user: HydratedDocument<IUser>, id: string) {
    const product = await Product.exists({ user_id: user._id, _id: id });
    return Boolean(product);
  },
};

export default ProductService;
