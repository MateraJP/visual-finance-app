import { BaseModel } from "./base-model";

export class Criterio extends BaseModel {
	codigo: string;
	descricao: string;
	situacao: string;

	constructor(init?: Partial<Criterio>) {
		super(init);
        Object.assign(this, init);
	}
}