import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable, BehaviorSubject, Subject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public messageSource = new BehaviorSubject<boolean>(false);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  changeMessage(message: boolean) {
    this.messageSource.next(message)
  }


}
