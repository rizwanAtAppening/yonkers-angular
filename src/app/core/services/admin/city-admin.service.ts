import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

import { environment } from 'src/environments/environment';
import { Register } from 'src/app/shared';
import { OccupancyApplication } from '../../models/users';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CityAdminService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }


  getCityAdmin(page): Observable<any> {
    const href = `${environment['getCityAdmin']}`
    return this.http.get<any>(href,{params:page}).pipe(
      map(
        ({ status, ...rest }) => {
          if (status === 'success') {
          }
          return rest;
        }
      )
    );
  }



  getSingleCityAdmin(id) {
    const href = `${environment['getSingleCityAdmin']}/${id}`
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

  addCityAdmin(data) {
    const href = `${environment['addCityAdmin']}`
    return this.http.post<any>(href, data).pipe(
      map(
        ({ status, ...rest }) => {
          if (status === 'success') {
          }
          return rest;
        }
      )
    );
  }




  updateCityAdmin(data, id) {
    const href = `${environment['updateCityAdmin']}/${id}`
    return this.http.post<any>(href, data).pipe(
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
