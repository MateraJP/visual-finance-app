import { KeyValueModel } from "./key-value.model";

export class ErrorMessageModel {
    message!: string;
    type = 'Error'; //ErrorMessageTypeEnum.Error;
    isBusinessException = false;
    brokenRules: KeyValueModel<string>[] = [];

    constructor(init?: Partial<ErrorMessageModel>) {

        if (init) Object.assign(this, init);
    }
}
