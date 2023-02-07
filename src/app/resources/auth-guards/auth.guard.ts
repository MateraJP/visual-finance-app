import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from "@angular/router";
import { NotificationService } from "../../services/notification.service";

/**
 * Verifica se o usuário tem acesso a rota atual.
 * Utilização:
 *      path: 'rota',
 *      component: MeuComponent,
 *      canActivate: [AuthGuard],
 *      data: {
 *          allowedClaims: ['claimx', 'claim.y'],
 *          isPrefix: true // opcional
 *      }
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        //private securityService: SecurityService,
        //private alertService: AlertService
		private notificationService: NotificationService
    ) {}

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        const allowedClaims = route.data.allowedClaims as string[] | undefined;
        const hasPermission = true; //TODO:
            // !allowedClaims?.length ||
            // this.securityService.hasAnyClaim(
            //     allowedClaims,
            //     !!route.data.isPrefix
            // );

        if (!hasPermission)
            await this.notificationService.show('danger',
                'Você não tem permissão para acessar essa página.'
            );

        return hasPermission;
    }
}
