import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject, Subject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public messageStatusLog = new BehaviorSubject<boolean>(false);
  currentStatusLog = this.messageStatusLog.asObservable();

  constructor(private http: HttpClient,
              private router: Router) { }

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
