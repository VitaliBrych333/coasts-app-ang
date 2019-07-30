import { Injectable } from '@angular/core';
import { NewField } from '../main/field.model';
import { NewIncome } from '../main/income.model';
import { Observable, BehaviorSubject, Subject, } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseURL = 'http://localhost:5500';

  fieldEdit: NewField;

  constructor(private http: HttpClient) { }

  addField(body: NewField): Observable<NewField>  {
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post<NewField>(this.baseURL + '/purchases', JSON.stringify(body), options);
  }

  getAllFields(): Observable<NewField[]> {
    return this.http.get<NewField[]>(this.baseURL + '/purchases');
  }

  deleteId(field: NewField): Observable<NewField> {
    const id = field._id;
    return this.http.delete<NewField>(this.baseURL + '/purchases' + `/${id}`);
  }

  getFieldId(id: string): Observable<NewField> {
    return this.http.get<NewField>(this.baseURL + '/purchases' + `/${id}`);
  }

  updateField(id: string, field: NewField): Observable<NewField> {
    return this.http.put<NewField>(this.baseURL + '/purchases' + `/${id}/update`, field);
  }

  addFieldIncome(body: NewIncome): Observable<NewIncome>  {
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post<NewIncome>(this.baseURL + '/income', JSON.stringify(body), options);
  }


}
