import { Injectable } from '@angular/core';
import { NewField } from '../main/field.model';
import { NewIncome } from '../main/income.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class DataService {

  options = {headers: {'Content-Type': 'application/json'}};
  baseURL = 'http://localhost:5500';

  constructor(private http: HttpClient) {}

  addField(body: NewField): Observable<NewField>  {
    return this.http.post<NewField>(this.baseURL + '/purchases', JSON.stringify(body), this.options);
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
    return this.http.post<NewIncome>(this.baseURL + '/incomes', JSON.stringify(body), this.options);
  }

  getAllFieldsIncomes(): Observable<NewIncome[]> {
    return this.http.get<NewIncome[]>(this.baseURL + '/incomes');
  }

  deleteIncomeId(field: NewIncome): Observable<NewIncome> {
    const id = field._id;
    return this.http.delete<NewIncome>(this.baseURL + '/incomes' + `/${id}`);
  }

  getFieldIncomeId(id: string): Observable<NewIncome> {
    return this.http.get<NewIncome>(this.baseURL + '/incomes' + `/${id}`);
  }

  updateFieldIncome(id: string, field: NewIncome): Observable<NewIncome> {
    return this.http.put<NewIncome>(this.baseURL + '/incomes' + `/${id}/update`, field);
  }
}
