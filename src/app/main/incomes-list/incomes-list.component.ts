import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectIncomeState } from '../../store/state/app.states';
import { IncomeState } from '../../store/reducers/income.reducer';
import { LoadIncomes } from '../../store/actions/income.actions';
import { DataService } from '../../services/data.service';
import { CoastsListComponent } from '../coasts-list/coasts-list.component';
import { NewIncome } from '../../shared/models/income.model';
import { ColumnNames } from '../../shared/constants/columnNamesForm';
import { Url } from '../../shared/constants/url.enum';

@Component({
  selector: 'app-incomes-list',
  templateUrl: './incomes-list.component.html',
  styleUrls: ['./incomes-list.component.scss']
})

export class IncomesListComponent extends CoastsListComponent implements OnInit {

  public displayedColumns: string[] = [...ColumnNames];
         getStateIncome: Observable<object>;

  constructor(public router: Router,
              public dataService: DataService,
              public viewContainerRef: ViewContainerRef,
              public componentFactoryResolver: ComponentFactoryResolver,
              protected store: Store<AppState>) {
                super(router, dataService, viewContainerRef, componentFactoryResolver, store);
              }

  public ngOnInit(): void {
    this.displayedColumns.splice(3, 0, 'who');
    this.getStateIncome = this.store.select(selectIncomeState);

    this.subscriptions.push(
      this.getStateIncome.subscribe((state: IncomeState) => {
        if (state.incomes) {
          state.incomes.forEach((obj: NewIncome) => this.listData.push(Object.assign({}, obj)));
          this.listData.forEach((obj: NewIncome) => obj.position = (this.listData.indexOf(obj) + 1));
          this.createTable(this.listData);
        }
      }),
    );

    this.store.dispatch(new LoadIncomes());
  }

  public editField(fieldEdit: NewIncome): void {
    this.router.navigate([`${Url.INC}/${fieldEdit._id}`]);
  }
}
