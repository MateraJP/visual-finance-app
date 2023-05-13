import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "../../environments/environment";

import { ContentTypeEnum, RequestModel } from "../models/request.model";
import { TokenRequestModel } from "../models/token-request.model";
import { TokenResponseModel } from "../models/token-response.model";
import { UserInfoModel } from "../models/user-info.model";
import { SecurityStorage } from "../resources/security.storage";
import { NotificationService } from "./notification.service";
import { RequestService } from "./request.service";
import { UserPreferencesService } from "./user-preferences.service";

@Injectable()
export class AuthService  {
	public redirectUrl: string = '';
	private defaultUserInfoUrl: string = 'user';
	private defaultLoginRoute: string = 'login';
	private defaultLoggedRoute: string = '';
	private defaultChangePassRoute: string = 'login-change';

    constructor(
        private router: Router,
		private httpClient: HttpClient,
        private requestService: RequestService,
        private securityStorage: SecurityStorage,
		private notificationService: NotificationService,
		private userPreferencesService: UserPreferencesService
    ) {
    }

    login(username: string, pass: string): Observable<TokenResponseModel> {
        let requestModel: RequestModel<TokenRequestModel>;
        const body = new TokenRequestModel();

        body.username = username;
        body.pass = pass;

        requestModel = new RequestModel({ url: 'login', isBase: true });
        requestModel.data = body;
        requestModel.contentType = ContentTypeEnum.ApplicationJson;

        return this.requestService
            .makePost<TokenResponseModel>(requestModel)
            .pipe(
                tap((tokenResponse) => {
                    if (!tokenResponse) {
                        this.notificationService.show('danger',
                            'Verifique os dados e tente novamente'
                        );

                        return;
                    }

                    if (
                        tokenResponse.error ||
                        tokenResponse.error_description
                    ) {
                        this.notificationService.show('danger',
                            tokenResponse.error_description
                        );

                        return;
                    }

                    let validUntil: Date;

                    if (!tokenResponse.accessToken) {
                        validUntil = new Date();
                        validUntil.setSeconds(
                            validUntil.getSeconds() + tokenResponse.expires_in
                        );
                    } else {
                        validUntil = tokenResponse.expiration;
                        tokenResponse.access_token = tokenResponse.accessToken;
                    }

                    tokenResponse.valid_until = validUntil;

                    this.securityStorage.saveUserToken(tokenResponse);
					this.loadUserInfo()
						.subscribe({
							next: (data: UserInfoModel) => {
								this.securityStorage.saveUserInfo(data);
								this.userPreferencesService.reload();
								this.redirectAfterLogin();
							}
						});
                })
            );
    }

    register(username: string, email:string, pass: string): Observable<TokenResponseModel> {
        let requestModel: RequestModel<TokenRequestModel>;
        const body = new TokenRequestModel();

        body.username = username;
        body.email = email;
        body.pass = pass;

        requestModel = new RequestModel({ url: 'register', isBase: true });
        requestModel.data = body;
        requestModel.contentType = ContentTypeEnum.ApplicationJson;

        return this.requestService
            .makePost<TokenResponseModel>(requestModel)
            .pipe(
                tap((tokenResponse) => {
                    if (!tokenResponse) {
                        this.notificationService.show('danger',
                            'Verifique os dados e tente novamente'
                        );

                        return;
                    }

                    if (
                        tokenResponse.error ||
                        tokenResponse.error_description
                    ) {
                        this.notificationService.show('danger',
                            tokenResponse.error_description
                        );

                        return;
                    }

                    let validUntil: Date;

                    if (!tokenResponse.accessToken) {
                        validUntil = new Date();
                        validUntil.setSeconds(
                            validUntil.getSeconds() + tokenResponse.expires_in
                        );
                    } else {
                        validUntil = tokenResponse.expiration;
                        tokenResponse.access_token = tokenResponse.accessToken;
                    }

                    tokenResponse.valid_until = validUntil;

                    this.securityStorage.saveUserToken(tokenResponse);
					
					this.loadUserInfo()
						.subscribe({
							next: (data: UserInfoModel) => {
								this.securityStorage.saveUserInfo(data);
								this.redirectAfterLogin();
							}
						});
                })
            );
    }

    /**
     * Finaliza a sessão do usuário.
     */
    async logout(): Promise<boolean> {
        this.securityStorage.clear();
        return this.router.navigate([this.defaultLoginRoute]);
    }

    /**
     * Verifica se o usuário está logado.
     */
    isLoggedIn(): boolean {
        const userToken = this.securityStorage.getUserToken();

        if (userToken)
            return (
                new Date(userToken.valid_until).getTime() >=
                new Date().getTime()
            );

        return false;
    }

    /**
     * Verifica se o usuário logado é administrador.
     */
    isAdmin(): boolean {
        const userInfo = this.securityStorage.getUserInfo();
        return !!userInfo?.isAdmin;
    }

    /**
     * Vai para a página de login.
     */
    async goToLoginPage(): Promise<boolean> {
        return this.router.navigate(['login']);
    }

    /**
     * Inicia o processo de login de acordo o tipo de autenticação.
     */
    async startAuthProcess(): Promise<boolean> {
        return this.goToLoginPage();
    }

    /**
     * Redireciona o usuário para a página apropriada após login.
     * **Obs:** Caso ele tenha entrado em uma página específica, redireciona para ela.
     */
    async redirectAfterLogin(): Promise<boolean> {
        // Se a redirectUrl estiver preenchida, redirecione o usuário
        if (this.redirectUrl) return this.router.navigate([this.redirectUrl]);

        return this.router.navigate([
            this.defaultLoggedRoute,
        ]);
    }

    /**
     * Troca a senha do usuário logado.
     * @param newPassword Nova senha.
     */
    changePassword(newPassword: string): Observable<boolean> {
        const request = new RequestModel({
            url: this.defaultChangePassRoute,
            data: newPassword,
        });

        return this.requestService.makePost(request);
    }
	
    saveUserImg(fileToUpload: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.httpClient.post(`${environment.baseUrl}/api/${this.defaultUserInfoUrl}/profile-pic`, formData);
    }

	private loadUserInfo(): Observable<UserInfoModel> {
        const request = new RequestModel({
            url: this.defaultUserInfoUrl
        });

		return this.requestService.makeGet<UserInfoModel>(request);
	}
}
