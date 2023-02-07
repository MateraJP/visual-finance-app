export class UserPreferencesModel {
    colorPrimary:string;
    colorPrimaryText:string;
    colorPrimaryItem:string;
    colorPrimaryHighlight:string;
    colorDarken: boolean;
    colorPrimaryItemDarken: string;

    constructor(init?: Partial<UserPreferencesModel>) {
        Object.assign(this, init);
    }
}