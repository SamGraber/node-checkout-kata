import { model, Schema, Model, Document } from 'mongoose';
import { ModelService } from '../../database/model.service';
import { IItem } from '../item/item.model';

export interface ICart extends Document {
	userId: string;
	items: ICheckoutItem[];
	subtotal: number;
}

export interface ICheckoutItem extends IItem {
	quantity: number;
}

export const CartSchema = new Schema({
	userId: String,
	items: Array,
	subtotal: Number,
});

export const Cart: ModelService<ICart> = new ModelService(model<ICart>('Cart', CartSchema));
