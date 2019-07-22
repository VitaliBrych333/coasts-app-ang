import { Injectable } from '@angular/core';
import { NewField } from '../main/field.model';
import { Observable, BehaviorSubject, Subject, } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseURL = 'http://localhost:5500';

  constructor(private http: HttpClient) { }

  addField(body: NewField): Observable<object>  {
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post<NewField>(this.baseURL + '/purchases', JSON.stringify(body), options);
  }

}
