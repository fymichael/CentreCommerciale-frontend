export interface Order {
    _id: string;
    reference: string;
    user_id: { _id: string; first_name: string; last_name: string };
    shop_id: { _id: string; name: string };
    product_id: { name: string; unit_price: number, code: string };
    unit_price: number;
    quantity: number;
    state: number;
    createdAt: Date;
    updatedAt: Date;
}