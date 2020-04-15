import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

import { environment } from 'src/environments/environment';
import { Register } from 'src/app/shared';
import { OccupancyApplication } from '../../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  registerUser(data: Register): Observable<any> {
    const href = `${environment.register}`;
    return this.http.post<any>(href, data).pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
            this.authenticationService.setUser(data.response);
          }
          return data;
        }
      )
    );
  }

  postOccupancyApplication(data: OccupancyApplication): Observable<any> {
    const href = `${environment.application}`;
    return this.http.post<any>(href, data).pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
          }
          return data;
        }
      )
    );
  }

  isApplicationEditable(): boolean {
    return false;
  }
}
