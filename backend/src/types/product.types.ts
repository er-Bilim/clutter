export interface IProduct {
  user_id: string;
  category: string;
  title: string;
  description: string | null;
  price: number;
  image: string | null;
}
