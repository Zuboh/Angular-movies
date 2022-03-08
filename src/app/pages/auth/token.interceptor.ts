import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { switchMap, take } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.users$.pipe(
      take(1),
      switchMap((user) => {
        const newReq = request.clone({
          headers: request.headers.set (
            "Authorization" , 
            `Bearer ${user?.accessToken}`
          )
        });
        return next.handle(newReq);
      })
    );
  }
}
