import type { IUserShow } from "../../../features/auth/model/types";

export interface IProduct {
  _id: string;
  user: IUserShow;
  category: string;
  title: string;
  description: string | null;
  price: number;
  image: string | null;
}
