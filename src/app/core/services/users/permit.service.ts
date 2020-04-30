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
export class PermitService {

  public sessionApplication = 'application';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }





  addPermitApplication(data): Observable<any> {
    const href = `${environment['application']}`;
    const applicationID = this.getApplicationID();
    if (applicationID) {
      data['id'] = applicationID
      data['application_id'] = applicationID
    }
    this.authenticationService.getUserInfo().subscribe(user => data.user_id = user.id);
    return this.http.post<any>(href, data).pipe(
      tap(
        (data) => {
          if (data.status === 'success' && Object.keys(data.response).length > 0) {
            console.log(data.response, "UPDATED")
            this.setApplication(data.response);
          }
          return data;
        }
      )
    );
  }

  uploadImage(data): Observable<any> {
    const href = `${environment['uploadImage']}`;
    const applicationID = this.getApplicationID();
    if (applicationID) {
      //data['id'] = applicationID
      data['application_id'] = applicationID
    }
    this.authenticationService.getUserInfo().subscribe(user => data.user_id = user.id);
    return this.http.post<any>(href, data).pipe(
      tap(
        (data) => {
          if (data.status === 'success' && Object.keys(data.response).length > 0) {
            console.log(data.response, "UPDATED")
            this.setApplication(data.response);
          }
          return data;
        }
      )
    );
  }


  deleteImage(data: OccupancyApplication): Observable<any> {
    const href = `${environment['deleteImage']}`;
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

  updateApplication(id): Observable<any> {
    const href = `${environment['updateApplication']}/${id}`;
    return this.http.get<any>(href,).pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
          }
          return data;
        }
      )
    );
  }


  deleteSessionApplication(): boolean {
    if (sessionStorage.getItem(this.sessionApplication)) {
      sessionStorage.removeItem(this.sessionApplication);
      console.log("SESSION REMOVED")
      return true;
    }

    return false;
  }


  getApplicationID(): any {
    const application = this.getApplication()
    if (application) {
      return application['id']
    }
    return null;
  }

  getApplication() {

    const session = sessionStorage.getItem(this.sessionApplication);

    if (session) {
      return JSON.parse(session);
    }
    return false;
  }

  setApplication(application: any) {
    sessionStorage.setItem(this.sessionApplication, JSON.stringify(application));
  }

  saveCurrentTab(data) {
    sessionStorage.setItem('currentTab', JSON.stringify(data));

  }
  getCurrentTab() {
    const session = sessionStorage.getItem('currentTab');

    if (session) {
      return JSON.parse(session);
    }
    return false;
  }

  getPermitApplication(query): Observable<any> {
    const href = `${environment['getPermitApplication']}`
    return this.http.get<any>(href, {params: query }).pipe(
      map(
        ({ status, ...rest }) => {
          if (status === 'success') {
          }
          return rest;
        }
      )
    );
  }

  searchApplication(query): Observable<any> {
    const href = `${environment['getPermitApplication']}`
    return this.http.get<any>(href, { params: query }).pipe(
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
