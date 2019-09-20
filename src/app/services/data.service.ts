import { Injectable } from '@angular/core';
import { NewField } from '../main/field.model';
import { NewIncome } from '../main/income.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  options = {headers: {'Content-Type': 'application/json'}};
  baseURL = 'http://localhost:5500';

  constructor(private http: HttpClient) {}

  addField(body: NewField): Promise<NewField>  {
    return this.http.post<NewField>(this.baseURL + '/purchases', JSON.stringify(body), this.options).toPromise();
  }

  getAllFields(): Promise<NewField[]> {
    return this.http.get<NewField[]>(this.baseURL + '/purchases').toPromise();
  }

  deleteId(field: NewField): Promise<NewField> {
    const id = field._id;
    return this.http.delete<NewField>(this.baseURL + '/purchases' + `/${id}`).toPromise();
  }

  getFieldId(id: string): Promise<NewField> {
    return this.http.get<NewField>(this.baseURL + '/purchases' + `/${id}`).toPromise();
  }

  updateField(id: string, field: NewField): Promise<NewField> {
    return this.http.put<NewField>(this.baseURL + '/purchases' + `/${id}/update`, field).toPromise();
  }

  addFieldIncome(body: NewIncome): Promise<NewIncome>  {
    return this.http.post<NewIncome>(this.baseURL + '/incomes', JSON.stringify(body), this.options).toPromise();
  }

  getAllFieldsIncomes(): Promise<NewIncome[]> {
    return this.http.get<NewIncome[]>(this.baseURL + '/incomes').toPromise();
  }

  deleteIncomeId(field: NewIncome): Promise<NewIncome> {
    const id = field._id;
    return this.http.delete<NewIncome>(this.baseURL + '/incomes' + `/${id}`).toPromise();
  }

  getFieldIncomeId(id: string): Promise<NewIncome> {
    return this.http.get<NewIncome>(this.baseURL + '/incomes' + `/${id}`).toPromise();
  }

  updateFieldIncome(id: string, field: NewIncome): Promise<NewIncome> {
    return this.http.put<NewIncome>(this.baseURL + '/incomes' + `/${id}/update`, field).toPromise();
  }
}
