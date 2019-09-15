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

  constructor(private http: HttpClient) { }


  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  register(user: NewUser) {
    return this.http.post(this.baseURL + '/register', JSON.stringify(user), this.noAuthHeader);
  }

  login(user: NewUser) {
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post(this.baseURL + '/authenticate', JSON.stringify(user), options);
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

  changeStatusLog(message: boolean) {
    this.messageStatusLog.next(message)
  }


}
