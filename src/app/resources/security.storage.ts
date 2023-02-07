import { Injectable } from "@angular/core";
import { TokenResponseModel } from "../models/token-response.model";
import { UserInfoModel } from "../models/user-info.model";
import { BaseStorage } from "./base.storage";

@Injectable({
	providedIn: 'root'
})
export class SecurityStorage extends BaseStorage {
	private userTokenKey = "e0f87be90efb43feafbb8af6c79368ec";
	private userInfoKey = "c40e6dbc7e344af193411d2e189a92aa";
	private securityInfoKey = "7a8aded0c7234d7b902b83749308ed1d";
		
		constructor() {
			super('security')
		}

		/**
     * Salva o token do usuário logado.
     * @param userToken Token do usuário logado.
     */
		saveUserToken(userToken: TokenResponseModel): void {
			this.save(this.userTokenKey, userToken);
		}
	
		/**
		 * Obtém o token do usuário logado.
		 */
		getUserToken(): TokenResponseModel | undefined {
			return this.get(this.userTokenKey) as TokenResponseModel | undefined;
		}
	
		/**
		 * Salva as informações do usuário logado.
		 * @param userInfo Informações do usuário logado.
		 */
		saveUserInfo(userInfo: UserInfoModel): void {
			this.save(this.userInfoKey, userInfo);
		}
	
		/**
		 * Obtém as informações do usuário logado.
		 */
		getUserInfo(): UserInfoModel | undefined {
			return this.get(this.userInfoKey) as UserInfoModel | undefined;
		}
	
		/**
		 * Salva os dados de segurança do usuário logado.
		 * @param data Dados de segurança do usuário logado.
		 */
		// saveSecurityInfo(data: SecurityInfoModel): void {
		// 	this.save(this.securityInfoKey, data);
		// }
	
		/**
		 * Obtém os dados de segurança do usuário logado.
		 */
		// getSecurityInfo(): SecurityInfoModel | undefined {
		// 	return this.get(this.securityInfoKey) as SecurityInfoModel | undefined;
		// }
	}