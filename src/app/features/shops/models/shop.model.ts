// models/product.model.ts
export interface Shop {
  _id: string;
  name: string;
  description: string;
  price_in_month: string;
  state: number;
}