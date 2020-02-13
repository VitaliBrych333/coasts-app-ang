import { Injectable } from '@angular/core';
import { NewCoast } from '../main/coast.model';
import { NewIncome } from '../main/income.model';
import { HttpClient } from '@angular/common/http';
import { Url } from '../shared/constants/url-enum';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public options = { headers: {'Content-Type': 'application/json'} };

  constructor(private http: HttpClient) {}

  public addField(body: NewCoast): Promise<NewCoast>  {
    return this.http.post<NewCoast>(Url.BASE + Url.PURCH, JSON.stringify(body), this.options).toPromise();
  }

  public getAllFieldsCoasts(): Promise<NewCoast[]> {
    return this.http.get<NewCoast[]>(Url.BASE + Url.PURCH).toPromise();
  }

  public deleteId(field: NewCoast): Promise<NewCoast> {
    const id = field._id;
    return this.http.delete<NewCoast>(Url.BASE + Url.PURCH + `/${id}`).toPromise();
  }

  public getFieldId(id: string): Promise<NewCoast> {
    return this.http.get<NewCoast>(Url.BASE + Url.PURCH + `/${id}`).toPromise();
  }

  public updateField(id: string, field: NewCoast): Promise<NewCoast> {
    return this.http.put<NewCoast>(Url.BASE + Url.PURCH + `/${id + Url.UPD}`, field).toPromise();
  }

  public addFieldIncome(body: NewIncome): Promise<NewIncome>  {
    return this.http.post<NewIncome>(Url.BASE + Url.INC, JSON.stringify(body), this.options).toPromise();
  }

  public getAllFieldsIncomes(): Promise<NewIncome[]> {
    return this.http.get<NewIncome[]>(Url.BASE + Url.INC).toPromise();
  }

  public deleteIncomeId(field: NewIncome): Promise<NewIncome> {
    const id = field._id;
    return this.http.delete<NewIncome>(Url.BASE + Url.INC + `/${id}`).toPromise();
  }

  public getFieldIncomeId(id: string): Promise<NewIncome> {
    return this.http.get<NewIncome>(Url.BASE + Url.INC + `/${id}`).toPromise();
  }

  public updateFieldIncome(id: string, field: NewIncome): Promise<NewIncome> {
    return this.http.put<NewIncome>(Url.BASE + Url.INC + `/${id + Url.UPD}`, field).toPromise();
  }
}
