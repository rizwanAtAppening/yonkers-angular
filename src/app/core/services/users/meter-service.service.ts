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
export class MeterServiceService {

  constructor(
    private http: HttpClient,

  ) { }


  addMeterPermit(data): Observable<any> {
    const href = `${environment['addMeterPermit']}`;
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
}
