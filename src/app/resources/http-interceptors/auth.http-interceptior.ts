import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { SecurityStorage } from "../security.storage";
import { AuthService } from "../../services/auth.service";

/**
 * Adiciona o cabeçalho de autenticação nas requisições HTTP com o token do usuário logado, se houver.
 */
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private securityStorage: SecurityStorage
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.authService.isLoggedIn()) {
            const userToken = this.securityStorage.getUserToken();
            const accessToken = userToken?.access_token ?? "";

            const user = this.securityStorage.getUserInfo();
            const tenant = user?.id ?? "";
            const authRequest = request.clone({
                headers: request.headers.set(
                    "Authorization",
                    `Bearer ${accessToken}`
                ).set('Tenant', tenant)
            });

            return next.handle(authRequest);
        } 
		
        return next.handle(request);
    }
}
