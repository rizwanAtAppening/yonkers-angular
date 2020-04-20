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

 
  getApplicationID(): any {
    const application = this.getApplication()
    if (application) {
      return application['id']
    }
    return null;
  }

   getApplication() {
     debugger
    const session = sessionStorage.getItem(this.sessionApplication);

    if (session) {
      return JSON.parse(session);
    }
    return false;
  }
  
  setApplication(application: any) {
    sessionStorage.setItem(this.sessionApplication, JSON.stringify(application));
  }

  saveCurrentTab(data){
    sessionStorage.setItem('currentTab', JSON.stringify(data));

  }
  getCurrentTab(){
    const session = sessionStorage.getItem('currentTab');

    if (session) {
      return JSON.parse(session);
    }
    return false;
  }
}
