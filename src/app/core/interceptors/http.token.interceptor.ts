import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    const headersConfig = {
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json'
      'Accept': 'application/json'
    };
    let token = null;
    debugger
    token = this.authenticationService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
