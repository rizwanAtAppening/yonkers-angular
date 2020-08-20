import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, debounce } from 'rxjs/operators';
import { of as observableOf, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Login } from '../../shared/models/login.model';
const credentialsKey = 'currentUser';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  login(loginData: Login): Observable<any> {
    const href = `${environment['login']}`;
    return this.http.post<any>(href, loginData).pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
            const storage = localStorage;
            storage.setItem(credentialsKey, JSON.stringify(data.response));
          }
          return data;
        }
      )
    );
  }

  adminLogin(loginData: Login): Observable<any> {
    const href = `${environment['adminLogin']}`;
    return this.http.post<any>(href, loginData).pipe(
      tap(
        (data) => {
          if (data.status === 'success') {
            const storage = localStorage;
            storage.setItem(credentialsKey, JSON.stringify(data.response));
          }
          return data;
        }
      )
    );
  }

  logout(): Observable<boolean> {
    sessionStorage.removeItem(credentialsKey);
    localStorage.removeItem(credentialsKey);
    return observableOf(true);
  }

  getUserInfo(): Observable<any> {
    const savedCredentials = this.getUser();
    return observableOf(savedCredentials);
  }

  isLogin() {
    if (localStorage.getItem(credentialsKey)) {
      return true;
    }
    return false;

  }

  getToken() {
    const savedCredentials = this.getUser();
    return savedCredentials && savedCredentials['token'];
  }

  getUserRole(): Observable<any> {
    const savedCredentials = this.getUser();
    return observableOf(savedCredentials['role']);
  }

  getUserType() {
    const savedCredentials = this.getUser();
    if (this.isLogin()) {
      return savedCredentials['role'];
    } else {
      return false;
    }


  }

  private getUser() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    return JSON.parse(savedCredentials);
  }

  setUser(user: any): void {
    localStorage.setItem(credentialsKey, JSON.stringify(user));
  }

  addStaff(data) {
    const href = `${environment['addstaff']}`
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

  staffList(page) {
    const href = `${environment['staffList']}`
    return this.http.get<any>(href,{ params:page }).pipe(
      map(
        ({ status, ...rest }) => {
          if (status === 'success') {
          }
          return rest;
        }
      )
    );
  }

  getStaffById(staffId) {
    const href = `${environment['getStffById']}/${staffId}`
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

  updateStaff(data, staffId) {
    const href = `${environment['updateStaff']}/${staffId}`
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

  resendMail(staff) {
    const href = `${environment['resendMail']}`
    return this.http.post<any>(href,staff).pipe(
      map(
        ({ status, ...rest }) => {
          if (status === 'success') {
          }
          return rest;
        }
      )
    );
  }

  createNewPassword(data) {
    const href = `${environment['createNewPasswordForAdmin']}`
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

