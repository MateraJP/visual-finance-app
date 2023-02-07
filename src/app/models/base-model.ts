export class BaseModel {
	id: string;

    constructor(init?: Partial<BaseModel>) {
        Object.assign(this, init);
    }
}