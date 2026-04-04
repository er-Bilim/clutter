export interface IProduct {
  user_id: string;
  category_id: string;
  title: string;
  description: string | null;
  price: number;
  image: string | null;
}
