import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

import { environment } from 'src/environments/environment';
import { Register } from 'src/app/shared';
import { OccupancyApplication } from '../../models/users';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermitService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  addPermitApplication(data: Register): Observable<any> {
    const href = `${environment['addPermitApplication']}`;
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
}
