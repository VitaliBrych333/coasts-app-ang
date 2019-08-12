import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  private listCoastsSource = new BehaviorSubject([]);
  currentMessageListCoasts = this.listCoastsSource.asObservable();

  private listIncomesSource = new BehaviorSubject([]);
  currentMessageListIncomes = this.listIncomesSource.asObservable();

  constructor() { }

  changeSourceListCoasts(newArray: Array<object>) {
    this.listCoastsSource.next(newArray)
  }

  changeSourceListIncomes(newArray: Array<object>) {
    this.listIncomesSource.next(newArray)
  }
}
