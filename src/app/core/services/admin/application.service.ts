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
export class ApplicationService {

  private messageSource = new BehaviorSubject('1');
  private meterPermit = new BehaviorSubject('0');
  currentMessage = this.messageSource.asObservable();
  getMeterPermitValue = this.meterPermit.asObservable();
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getApplications(data, array): Observable<any> {
    
    // var page
    // var application_Type
    // page = data['page'],
    // application_Type = data.a
    // const actors = ['Elvis', 'Jane', 'Frances'];
    let actors = []
    actors = array
    let params = new HttpParams();
    // for (const actor of actors) {
    //   params = params.append('actors', actor);
    // }
    if(actors.length > 0){
      actors.map(actor => {
        Object.keys(actor).forEach(obj => {
          params = params.append(obj,actor[obj]);
  
        })
      })
    }
   
    Object.keys(data).forEach(value => {

      params = params.append(value,data[value])
    })
    // data[''] = params
    const href = `${environment['getApplication']}`
    return this.http.get<any>(href, { params: params }).pipe(
      map(
        ({ status, ...rest }) => {
          if (status === 'success') {
          }
          return rest;
        }
      )
    );
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  meterPermitValue(message: string) {
    this.meterPermit.next(message)
  }


  inspector(): Observable<any> {
    const href = `${environment['inspector']}`
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

  examiner(): Observable<any> {
    const href = `${environment['examiner']}`
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

  reletedPermit(id): Observable<any> {
    const href = `${environment['reletedPermit']}/${id}`
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

  acceptApplicationByClerk(data) {
    const href = `${environment['acceptApplication']}`
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

  submitMeterFireReviewAndWaterReview(data) {
    const href = `${environment['meterFireReviewAndWater']}`
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


  voidMeterFireAndWaterReview(data) {
    const href = `${environment['voidMeterFireAndWaterReview']}`
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

 
  applicantUpdate(data, id) {
    const href = `${environment['updateApplicant']}/${id}`
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
  saveProjectInfo(data, id) {
    const href = `${environment['saveprojectInfo']}/${id}`
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

  emailAndPickUp(data) {
    const href = `${environment['emailAndPickUp']}`
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

  addNotes(data) {
    const href = `${environment['addNotes']}`
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

  deleteNotes(data) {
    const href = `${environment['deleteNotes']}`
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


  addReltedPemrit(data) {
    const href = `${environment['addReletedPermit']}`
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

  editDescription(data, id) {

    const href = `${environment['editDescription']}/${id}`
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

  addDecision(data) {
    const href = `${environment['addDecision']}`
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

  addFee(data) {
    const href = `${environment['addFee']}`
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

  feeDelete(data) {
    const href = `${environment['deleteFee']}`
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

  inspection(data) {
    const href = `${environment['inspection']}`
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

  voidInspection(data) {
    const href = `${environment['voidInspection']}`
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

  selectSpecialCondition(id) {
    const href = `${environment['selectSpecialCondition']}/${id}`
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

  updateContratorInfo(data) {
    const href = `${environment['updateContractor']}`
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

  addLicenseDetails(data) {
    const href = `${environment['addLicense']}`
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

  updateLicenseDetails(data, id) {
    const href = `${environment['addLicense']}/${id}`
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

  getInspection() {
    const href = `${environment['getInspection']}`
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

  getInspector() {

    const href = `${environment['inspector']}`
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


  voidPaymentFee(data) {
    const href = `${environment['voidPaymentFee']}`
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

  voidDecision(data) {
    const href = `${environment['voidDecision']}`
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
