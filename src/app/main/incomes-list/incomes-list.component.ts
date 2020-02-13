import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectIncomeState } from '../../store/state/app.states';
import { IncomeState } from '../../store/reducers/income.reducer';
import { LoadIncomes } from '../../store/actions/income.actions';
import { DataService } from '../../services/data.service';
import { NewIncome } from '../income.model';
import { CoastsListComponent } from '../coasts-list/coasts-list.component';
import { Url } from '../../shared/constants/url-enum';

@Component({
  selector: 'app-incomes-list',
  templateUrl: './incomes-list.component.html',
  styleUrls: ['./incomes-list.component.scss']
})

export class IncomesListComponent extends CoastsListComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'date', 'sum', 'who', 'type', 'other', 'author', 'actions'];
         getStateIncome: Observable<object>;

  constructor(public router: Router,
              public dataService: DataService,
              public viewContainerRef: ViewContainerRef,
              public componentFactoryResolver: ComponentFactoryResolver,
              protected store: Store<AppState>) {
                super(router, dataService, viewContainerRef, componentFactoryResolver, store);
              }

  public ngOnInit(): void {
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
