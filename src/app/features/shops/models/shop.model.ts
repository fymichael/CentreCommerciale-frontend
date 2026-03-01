// models/product.model.ts
export interface Shop {
  _id?: string;
  name: string;
  description: string;
  price_in_month: string;
  state: number;
  fiscal_number: string;
  proprioName: string;
  logoUrl: string;
  email: string;
  password: string;
  contact: string;
  address: string;
}