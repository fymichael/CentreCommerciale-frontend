import { Category } from "../../categories/models/category.model";
import { Role } from "../../roles/models/role.model";
import { Shop } from "../../shops/models/shop.model";
import { User } from "../../users/models/user.model";

export interface SubscriptionShop {
    _id: string;
    reference: string;
    shop_id: Shop;
    user_id: User;
    price: number;
    state: SubscriptionState;
    createdAt: Date;
    updatedAt: Date;
}

export enum SubscriptionState {
  Refuse = -1,
  Desactive = 0,
  EnAttente = 1,
  Valide = 5
}