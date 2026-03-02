import { Category } from "../../categories/models/category.model";
import { Role } from "../../roles/models/role.model";

export interface User {
    _id: string;
    role_id: Role;
    first_name: string;
    last_name: string;
    birthday: Date;
    email: string;
    username: string;
    password: string;
    contact: string;
    address: string;
    state: number;
    createdAt: Date;
    updatedAt: Date;
}