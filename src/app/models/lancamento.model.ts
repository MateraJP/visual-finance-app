import { BaseModel } from "./base-model";

export class Lancamento extends BaseModel {
	descricao: string;

	valorPrevisao: number;
	valorEfetivado: number;

	dataPrevisao: Date;
	dataEfetivado: Date;

	constructor(init?: Partial<Lancamento>) {
		super(init);
        Object.assign(this, init);
	}
}