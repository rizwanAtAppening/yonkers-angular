import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

import { environment } from 'src/environments/environment';
import { Register } from 'src/app/shared';
import { OccupancyApplication } from '../../models/users';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getApplications(): Observable<any> {
    const href = `${environment['getApplication']}`
    return this.http.get<any>(href).pipe(
      map(
        ({ status, ...rest }) => {
          if (status === 'success') {
          }
          return rest;
        }
      )
    );
  }

  getApplicationDetails(id): Observable<any> {
    const href = `${environment['permitDetals']}/${id}`
    return this.http.get<any>(href).pipe(
      map(
        ({ status, ...rest }) => {
          if (status === 'success') {
          }
          return rest;
        }
      )
    );
  }

  acceptApplicationByClerk(data){
    const href = `${environment['acceptApplication']}`
    return this.http.post<any>(href,data).pipe(
      map(
        ({ status, ...rest }) => {
          if (status === 'success') {
          }
          return rest;
        }
      )
    );
  }

}
