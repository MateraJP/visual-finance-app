import { BaseModel } from "./base-model";

export class Carteira extends BaseModel {
	nome: string;
	tipoCarteira: string;

	constructor(init?: Partial<Carteira>) {
		super(init);
        Object.assign(this, init);
	}
}