import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { NewUser } from '../log/user.model';
import { Observable, BehaviorSubject, Subject, } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public messageStatusLog = new BehaviorSubject<boolean>(false);
  currentStatusLog = this.messageStatusLog.asObservable();

  baseURL = 'http://localhost:5500';

  constructor(private http: HttpClient,
              private router: Router) { }


  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  login(user: NewUser) {
    return this.http.post(this.baseURL + '/authenticate', JSON.stringify(user), this.noAuthHeader);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  // login(user: NewUser) {
  //   const options = {headers: {'Content-Type': 'application/json'}};
  //   return this.http.post<NewUser>(this.baseURL + '/purchases', JSON.stringify(user), options)
  //                   .pipe(map(user => {
  //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //                    localStorage.setItem('currentUser', JSON.stringify(user));
  //     // this.currentUserSubject.next(user);
  //                    return user;
  //   }));
  // }

  // }

  changeStatusLog(message: boolean) {
    this.messageStatusLog.next(message)
  }

  exit(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.changeStatusLog(false);
  }

  isAuth() {
    if(localStorage.getItem('userName')) return true;
    return false;
  }


}
