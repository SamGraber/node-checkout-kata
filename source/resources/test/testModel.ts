import { model, Schema, Model, Document } from 'mongoose';

export interface ITestObj extends Document {
	name: string,
};

export const TestSchema = new Schema({
	name: String,
});

export const Test: Model<ITestObj> = model<ITestObj>('Test', TestSchema);

