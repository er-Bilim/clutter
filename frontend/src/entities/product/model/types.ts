import type { IUserShow } from "../../../features/auth/model/types";

export interface IProduct {
  _id: string;
  user: IUserShow;
  category: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface IProductMutation {
  category: string;
  title: string;
  description: string;
  price: string;
  image: File;
}
