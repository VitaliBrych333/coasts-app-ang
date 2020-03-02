import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { NewUser } from '../log/user.model';
import { Url } from '../shared/constants/url.enum';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public messageStatusLog = new BehaviorSubject<boolean>(false);
         currentStatusLog = this.messageStatusLog.asObservable();

         options = { headers: {'Content-Type': 'application/json'} };

  constructor(private http: HttpClient) {}

  public register(user: NewUser): Promise<object> {
    return this.http.post(Url.BASE + Url.REGIST, user, this.options).toPromise();
  }

  public login(user: NewUser): Promise<object> {
    return this.http.post(Url.BASE + Url.AUTH, user, this.options).toPromise();
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public deleteToken(): void {
    localStorage.removeItem('token');
  }

  public getUserPayload(): any {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public changeStatusLog(message: boolean): void {
    this.messageStatusLog.next(message);
  }
}
