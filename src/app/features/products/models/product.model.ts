import { Category } from "../../categories/models/category.model";

// models/product.model.ts
export interface Product {
  _id: string;
  code: string;
  name: string;
  description: string;
  unit_price: number;
  discount_rate: number;
  category_id: Category;
  shop_id: string;
  state: number;
  image: string;
}