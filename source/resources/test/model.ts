import { model, Schema } from 'mongoose';

export interface ITestObj {
	name: string,
};

export const TestSchema = new Schema({
	name: String,
});

export const Test = model('Test', TestSchema);

