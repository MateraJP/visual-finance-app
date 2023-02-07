import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from "@angular/common/http";
import { tap, finalize } from "rxjs/operators";
import { Observable, EMPTY } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { SecurityStorage } from "../security.storage";
import { ErrorMessageModel } from "../../models/error-message.model";
import { KeyValueModel } from "../../models/key-value.model";
import { NotificationService } from "../../services/notification.service";

/**
 * Trata os erros das requisições HTTP.
 */
@Injectable()
export class ErrorHandlerHttpInterceptor implements HttpInterceptor {
    private pendingTransactions = 0;

    constructor(
        private notificationService: NotificationService,
        //private errorsService: ErrorsService,
        private authService: AuthService,
        private securityStorage: SecurityStorage
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let serverError: HttpErrorResponse;
        let hasError = false;

        //if (this.pendingTransactions === 0) this.errorsService.setError();

        this.pendingTransactions++;

        return next.handle(request)
		// 	.pipe(
		// 		tap(
		// 			(event) => {
		// 				// Does nothing.
		// 			},
		// 			(error: HttpErrorResponse) => {
		// 				hasError = true;
		// 				serverError = error;
		// 			}
		// 		),
		// 		finalize(() => {
		// 			this.pendingTransactions--;

		// 			if (hasError) {
		// 				switch (serverError.status) {
		// 					case 400:
		// 						this.handle400(serverError);
		// 						break;
		// 					case 401:
		// 					case 403:
		// 						this.handleAuthErrors();
		// 						break;
		// 					case 500:
		// 						this.handleServerErrors(serverError);
		// 						break;
		// 					case 588:
		// 						this.handleBusinessExceptions(serverError);
		// 						break;
		// 				}

		// 				return EMPTY;
		// 			}
		// 		})
        // );
    }

    /**
     * Trata erros 400.
     */
    private handle400(serverError: HttpErrorResponse): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const message = String(serverError.error?.error);

        // this.errorsService.setError(
        //     new ErrorMessageModel({
        //         message,
        //         type: ErrorMessageTypeEnum.Warning,
        //     })
        // );

        // if (this.errorsService.shouldDisplayAlertOnError)
        //     void this.alertService.showError(message);
    }

    /**
     * Trata erros de autenticação/autorização.
     */
    private handleAuthErrors(): void {
        this.securityStorage.clear();
        this.authService.startAuthProcess();
    }

    /**
     * Trata erros no servidor.
     */
    private handleServerErrors(serverError: HttpErrorResponse): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const message = String(serverError.error?.error);

        // this.errorsService.setError(
        //     new ErrorMessageModel({
        //         message,
        //         type: ErrorMessageTypeEnum.Error,
        //     })
        // );

        // if (this.errorsService.shouldDisplayAlertOnError)
        //     void this.alertService.showError(message);
    }

    /**
     * Trata regras de negócios.
     */
    private handleBusinessExceptions(serverError: HttpErrorResponse): void {
        const errorMessage = new ErrorMessageModel({
            type: 'Warning', //ErrorMessageTypeEnum.Warning,
            isBusinessException: true,
        });
        let hasHtml = false;

        if (Array.isArray(serverError.error)) {
            hasHtml = true;
            const bizErrors = serverError.error as KeyValueModel<string>[];
            let content = '<table class="table table-hover"><tbody>';

            bizErrors.forEach(
                (e) =>
                    (content += `<tr><td>${e.key}</td><td>${e.value}</td></tr>`)
            );

            content += "</tbody></table>";
            errorMessage.message = content;
            errorMessage.brokenRules = bizErrors;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        } else errorMessage.message = String(serverError.error.error);

        // this.errorsService.setError(errorMessage);

        // if (this.errorsService.shouldDisplayAlertOnError)
        //     void this.alertService.showAlert(
        //         errorMessage.message,
        //         undefined,
        //         hasHtml
        //     );
    }
}
