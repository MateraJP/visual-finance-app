import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from "@angular/router";

import { AuthService } from "../../services/auth.service";

/**
 * Verfica se o usuário está logado.
 */
@Injectable()
export class OnlyLoggedUsersGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (!this.authService.isLoggedIn()) {
            this.authService.redirectUrl = state.url; // URL a ser acionada após login
            this.authService.startAuthProcess();

            return false;
        }

        return true;
    }
}
