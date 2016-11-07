import { model, Schema, Model, Document } from 'mongoose';
import { ModelService } from '../../database/model.service';

export interface IItem extends Document {
	sku: string;
	price: number;
}

export const ItemSchema = new Schema({
	sku: String,
	price: Number,
});

export const Item: ModelService<IItem> = new ModelService(model<IItem>('Item', ItemSchema));
