import { model, Schema, Model, Document } from 'mongoose';
import { ModelService } from '../../database/model.service';

export interface IOffer extends Document {
	sku: string;
	quantity: number;
	price: number;
}

export const OfferSchema = new Schema({
	sku: String,
	quantity: Number,
	price: Number,
});

export const Offer: ModelService<IOffer> = new ModelService(model<IOffer>('Offer', OfferSchema));
