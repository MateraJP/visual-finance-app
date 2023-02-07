import { Injectable } from "@angular/core";
import { TokenResponseModel } from "../models/token-response.model";
import { UserInfoModel } from "../models/user-info.model";
import { BaseStorage } from "./base.storage";

@Injectable({
	providedIn: 'root'
})
export class PreferenceStorage extends BaseStorage {
		constructor() {
			super('preferences')
		}
	}