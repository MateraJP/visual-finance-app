import { HTTP_INTERCEPTORS, HttpInterceptor } from "@angular/common/http";
import { InjectionToken } from "@angular/core";
import { AuthHttpInterceptor } from "./auth.http-interceptior";
import { ErrorHandlerHttpInterceptor } from "./error-handler.http-interceptor";


export const httpInterceptorsProviders = [
    // {
    //     provide: <InjectionToken<HttpInterceptor>>HTTP_INTERCEPTORS,
    //     useClass: RequestTraceHttpInterceptor,
    //     multi: true,
    // },
    {
        provide: <InjectionToken<HttpInterceptor>>HTTP_INTERCEPTORS,
        useClass: AuthHttpInterceptor,
        multi: true,
    },
    {
        provide: <InjectionToken<HttpInterceptor>>HTTP_INTERCEPTORS,
        useClass: ErrorHandlerHttpInterceptor,
        multi: true,
    },
];
