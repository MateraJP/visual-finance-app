import { BaseModel } from "./base-model";

export class Criterio extends BaseModel {


	constructor(init?: Partial<Criterio>) {
		super(init);
        Object.assign(this, init);
	}
}