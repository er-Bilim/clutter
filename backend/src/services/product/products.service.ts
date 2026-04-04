import Product from "../../model/product/Product.ts";
import type { IProduct } from "../../types/product.types.ts";

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
};

export default ProductService;
