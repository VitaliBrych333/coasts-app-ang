import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewCoast } from '../shared/models/coast.model';
import { NewIncome } from '../shared/models/income.model';

@Injectable({
  providedIn: 'root'
})

export class FilterDataService {

  private listCoastsSource = new BehaviorSubject([]);
  private listIncomesSource = new BehaviorSubject([]);
  private arrayDataCompare = new BehaviorSubject([]);

  public currentMessageListCoasts = this.listCoastsSource.asObservable();
         currentMessageListIncomes = this.listIncomesSource.asObservable();
         currentDataCompare = this.arrayDataCompare.asObservable();

  public changeSourceListCoasts(newArray: Array<object>): void {
    this.listCoastsSource.next(newArray);
  }

  public changeSourceListIncomes(newArray: Array<object>): void {
    this.listIncomesSource.next(newArray);
  }

  public changeSourceDataCompare(newArray: Array<object>): void {
    this.arrayDataCompare.next(newArray);
  }

  public filter(data: NewCoast[] | NewIncome[] | object[],
                filterValue: string | number | Date,
                filterType: any): any {
    return filterType(data, filterValue);
  }
}
