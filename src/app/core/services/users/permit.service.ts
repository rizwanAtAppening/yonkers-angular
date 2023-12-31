import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

import { environment } from 'src/environments/environment';
import { Register } from 'src/app/shared';
import { OccupancyApplication } from '../../models/users';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class PermitService {

  public sessionApplication = 'application';
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }



  changeMessage(message: string) {
    this.messageSource.next(message)
  }

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

  payment(data: OccupancyApplication): Observable<any> {
    const href = `${environment['payment']}`;
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

  genrateIntent(data: OccupancyApplication): Observable<any> {
    const href = `${environment['genrateIntent']}`;
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

  showPayment(data): Observable<any> {
    const href = `${environment['showPaymentDetails']}`;
    return this.http.get<any>(href, { params: data }).pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
          }
          return data;
        }
      )
    );
  }



  submitAppliction(data: OccupancyApplication): Observable<any> {
    const href = `${environment['submitApplication']}`;
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

  getDuplimester(): Observable<any> {
    const href = `${environment['getDuplimester']}`;
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

  addDuplimester(data): Observable<any> {
    const href = `${environment['addDuplimester']}`;
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

  addDwlPemitApplication(data): Observable<any> {
    const href = `${environment['addDwlPermitApplication']}`;
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
  addLicenseDetails(data): Observable<any> {
    const href = `${environment['addLicenseDetails']}`;
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

  getLicenseDetails(): Observable<any> {
    const href = `${environment['getLicenseDetails']}`
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

  getDetailByLayOutNumber(query): Observable<any> {
    const href = `${environment['getDetailByLayOut']}`
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

  getApplicationById(id): Observable<any> {
    const href = `${environment['getApplicationById']}/${id}`
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

  addDailyWorkLocation(data): Observable<any> {
    const href = `${environment['addDailyWorkLocation']}`;
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

  deleteDocuments(data): Observable<any> {
    const href = `${environment['deleteDocuments']}`;
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

  sendMail(data): Observable<any> {
    const href = `${environment['sendMail']}`;
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


  exextAddress(data): Observable<any> {
    
    const href = `${environment['execAddress']}`;
    return this.http.get<any>(href, { params: data }).pipe(
      tap(
        (data) => {
          if (data.status === 'success' && Object.keys(data.response).length > 0) {
            data.response.map((res: any) => {
              // if (res.address) {
              //   res.singleAddress = res.address
              //   res.address = `${res.address} [SBL: ${res.sbl}]`
              // }
              // if (res.street) {
              //   res.singleStreet = res.street
              //   res.address = `${res.street} [SBL: ${res.sbl}]`
              // }
              if (res.property_location) {
                res.streetAddress = res.property_location
                res.property_location = `${res.property_location},${res.city_state_zip}`
              }
             
            });
          }
          return data;
        }
      )
    );
  }

  uploadImageByAdmin(data): Observable<any> {
    const href = `${environment['uploadIamge']}`;
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

  downloadApplication(data, id): Observable<any> {
    const href = `${environment['downloadApplication']}/${id}`;
    return this.http.get<any>(href,{params: data}).pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
          }
          return data;
        }
      )
    );
  }

  voidSubmition(data): Observable<any> {
    const href = `${environment['voidSubmitionAndReview']}`;
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

  searchBussiness(data): Observable<any> {
    const href = `${environment['searchBussiness']}`;
    return this.http.get<any>(href, { params: data }).pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
          }
          return data;
        }
      )
    );
  }

  allBussiness(): Observable<any> {
    const href = `${environment['allBussiness']}`;
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


  cityAdminList(): Observable<any> {
    const href = `${environment['cityAdmin']}`;
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



  convertPermitApplication(id): Observable<any> {
    const href = `${environment['converPermitApplication']}/${id}`;
    return this.http.post<any>(href, '').pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
          }
          return data;
        }
      )
    );
  }

  submitDailyWorkLocation(data): Observable<any> {
    const href = `${environment['submitDailyWorkLocation']}`;
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

  deleteDailyWorklocation(id): Observable<any> {
    const href = `${environment['deletDailyWorkLocation']}/${id}`;
    return this.http.post<any>(href, '').pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
          }
          return data;
        }
      )
    );
  }

  withDrawPermit(id): Observable<any> {
    const href = `${environment['withDrawPermit']}/${id}`;
    return this.http.post<any>(href, '').pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
          }
          return data;
        }
      )
    );
  }

  cancelPermit(id): Observable<any> {
    const href = `${environment['cancelPermit']}/${id}`;
    return this.http.post<any>(href, '').pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
          }
          return data;
        }
      )
    );
  }

  getDataByPermitNumber(search_query:any): Observable<any> {
    const href = `${environment['fetchDatByPermit']}`;
    return this.http.get<any>(href,{params:search_query}).pipe(
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




