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
export class UsersService {
  private source = new BehaviorSubject(false);
  public isEditable = this.source.asObservable()

  // private applicationEditable: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // public isEditable: Observable<boolean> = this.applicationEditable.asObservable();
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  registerUser(data: Register): Observable<any> {
    const href = `${environment['register']}`;
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

  changeSaveAndExit(isIt: boolean) {
    
    this.source.next(isIt);
  }

  updateUserProfile(data: OccupancyApplication): Observable<any> {
    const href = `${environment['updateProfile']}`;
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

  changePassword(data): Observable<any> {
    const href = `${environment['changePassword']}`;
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

  addStaff(data): Observable<any> {
    const href = `${environment['addStaff']}`;
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

  activeInactiveStaff(data): Observable<any> {
    const href = `${environment['activeInactiveStaff']}`;
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

  completeApplication(data): Observable<any> {
    const href = `${environment['completeApplication']}`;
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

  applicationDetails(id): Observable<any> {
    const href = `${environment['applicationDetails']}/${id}`;
    return this.http.get<any>(href).pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
          }
          return data;
        }
      )
    );
  }

  getStaff(): Observable<any> {
    const href = `${environment['showStaff']}`;
    return this.http.get<any>(href).pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
          }
          return data;
        }
      )
    );
  }

  getSingleStaff(id): Observable<any> {
    const href = `${environment['singleStaff']}/${id}`;
    return this.http.get<any>(href).pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
          }
          return data;
        }
      )
    );
  }

  resetPassword(data): Observable<any> {
    const href = `${environment['resetPasswoed']}`;
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

  createNewPassword(data: OccupancyApplication): Observable<any> {
    const href = `${environment['createNewPassword']}`;
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


  createMemberPassword(data: OccupancyApplication): Observable<any> {
    const href = `${environment['createmMemberPassword']}`;
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

  


  // isApplicationEditable(): boolean {
  //   return false;
  // }
}
