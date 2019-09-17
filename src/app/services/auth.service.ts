import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from '../log/user.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public messageStatusLog = new BehaviorSubject<boolean>(false);
  currentStatusLog = this.messageStatusLog.asObservable();

  baseURL = 'http://localhost:5500';
  options = {headers: {'Content-Type': 'application/json'}};
  constructor(private http: HttpClient) {}

  // noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  register(user: NewUser) {
    return this.http.post(this.baseURL + '/register', JSON.stringify(user), this.options);
  }

  login(user: NewUser) {
    return this.http.post(this.baseURL + '/authenticate', JSON.stringify(user), this.options);
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
    this.messageStatusLog.next(message);
  }
}
