import { model, Schema, Model, Document } from 'mongoose';
import { ModelService } from '../../database/model.service';

export interface ITestObj extends Document {
	name: string,
};

export const TestSchema = new Schema({
	name: String,
});

export const Test: ModelService<ITestObj> = new ModelService(model<ITestObj>('Test', TestSchema));
