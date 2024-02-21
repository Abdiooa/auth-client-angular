// HttpInterceptor has intercept() method to inspect and transform
//  HTTP requests before they are sent to server.

import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            withCredentials: true,
        });

        return next.handle(clonedRequest).pipe(
            catchError(error => {
                // Handle error here (log, display message, etc.)
                // You may also re-throw the error to propagate it
                return throwError(error);
            })
        );
    }
}

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
