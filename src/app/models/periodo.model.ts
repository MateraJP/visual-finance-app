import { BaseModel } from "./base-model";

export class Periodo extends BaseModel {


	constructor(init?: Partial<Periodo>) {
		super(init);
        Object.assign(this, init);
	}
}