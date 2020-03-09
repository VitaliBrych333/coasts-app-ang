import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatInput } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCoastState, selectIncomeState } from '../../../store/state/app.states';
import { CoastState } from '../../../store/reducers/coast.reducer';
import { IncomeState } from '../../../store/reducers/income.reducer';
import { LoadCoasts, ClearStateCoast } from '../../../store/actions/coast.actions';
import { LoadIncomes, ClearStateIncome } from '../../../store/actions/income.actions';
import { NewCoast } from '../../../shared/models/coast.model';
import { NewIncome } from '../../../shared/models/income.model';
import { Mounth } from '../../../shared/interfaces/mounth.interface';
import { Months } from '../../../shared/constants/months';
import { Filters } from '../../../shared/constants/filters';
import { FilterDataService } from '../../../services/filter-data.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})

export class FiltersComponent implements OnInit, OnDestroy {

  @ViewChild('inputFrom', { read: MatInput, static: false}) inputFrom: MatInput;
  @ViewChild('inputTo', { read: MatInput, static: false}) inputTo: MatInput;

  public checkDate: boolean = false;
         checkMounth: boolean = true;

         startDate = new Date();
         selectedMounth: string;
         mounths: object[] = [];
         mounthsNames = [...Months];

         years: Array<number>;
         listCoasts: NewCoast[] = [];
         listIncomes: NewIncome[] = [];

         currentListCoasts: NewCoast[];
         currentListIncomes: NewIncome[];

         topDateFilter: Date;
         lowDateFilter: Date;
         minDateFrom: Date;
         maxDateFrom: Date;
         minDateTo: Date;
         maxDateTo: Date;

         arrayIdMounths: Array<number> = [];
         selectedYear: number;

         getStateCoast: Observable<object>;
         getStateIncome: Observable<object>;

  protected readonly subscriptions: Subscription[] = [];

  constructor(public filterDataService: FilterDataService,
              protected store: Store<AppState>) {}

  public ngOnInit(): void {
    this.getStateCoast = this.store.select(selectCoastState);
    this.getStateIncome = this.store.select(selectIncomeState);

    this.setInitialDateFilter();

    const tempYearsCoasts = [];
    const tempYearsIncomes = [];

    this.subscriptions.push(
      combineLatest(this.getStateCoast, this.getStateIncome)
        .subscribe(([stateCoast, stateIncome]: [CoastState, IncomeState]) => {
          if (stateCoast.coasts) {
            this.listCoasts = [];
            stateCoast.coasts.forEach((obj: NewCoast) => this.listCoasts.push(Object.assign({}, obj)));
            this.listCoasts.forEach(obj => tempYearsCoasts.push(new Date(obj.date).getFullYear()));
          }

          if (stateIncome.incomes) {
            this.listIncomes = [];
            stateIncome.incomes.forEach((obj: NewIncome) => this.listIncomes.push(Object.assign({}, obj)));
            this.listIncomes.forEach(obj => tempYearsIncomes.push(new Date(obj.date).getFullYear()));
          }

          this.years = _.uniq(tempYearsCoasts.concat(tempYearsIncomes));
        })
    );

    this.mounthsNames.forEach((c, i) => {
      this.mounths.push({ id: i, name: c });
    });

    this.store.dispatch(new LoadCoasts());
    this.store.dispatch(new LoadIncomes());
  }

  public ngOnDestroy(): void {
    this.onChange();
    this.store.dispatch(new ClearStateCoast());
    this.store.dispatch(new ClearStateIncome());
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  public setInitialDateFilter(): void {
    this.minDateFrom = new Date(2018, 0, 1);
    this.maxDateFrom = new Date();
    this.minDateTo = new Date(2018, 0, 1);
    this.maxDateTo = new Date();
  }

  public setLowDateFilter(event: MatDatepickerInputEvent<Date>): void {
    if (event.value === null) {
      this.lowDateFilter = undefined;
      this.minDateTo = new Date(2018, 0, 1);

      this.topDateFilter ? this.factoryUpdateData(this.listCoasts, this.listIncomes, this.topDateFilter, Filters.byTopDate)
                         : this.setEmptyData();

    } else {
      this.lowDateFilter = new Date(event.value);
      this.minDateTo = new Date(event.value);

      this.factoryUpdateData(this.listCoasts, this.listIncomes, this.lowDateFilter, Filters.byLowDate);

      this.topDateFilter ? this.factoryUpdateData(this.currentListCoasts, this.currentListIncomes, this.topDateFilter, Filters.byTopDate)
                         : undefined;
    }

    this.updateData(this.currentListCoasts, this.currentListIncomes);
  }

  public setTopDateFilter(event: MatDatepickerInputEvent<Date>): void {
    if (event.value === null) {
      this.topDateFilter = undefined;
      this.maxDateFrom = new Date();

      this.lowDateFilter ? this.factoryUpdateData(this.listCoasts, this.listIncomes, this.lowDateFilter, Filters.byLowDate)
                         : this.setEmptyData();

    } else {
      this.topDateFilter = new Date(event.value);
      this.maxDateFrom = new Date(event.value);

      this.factoryUpdateData(this.listCoasts, this.listIncomes, this.topDateFilter, Filters.byTopDate);

      this.lowDateFilter ? this.factoryUpdateData(this.currentListCoasts, this.currentListIncomes, this.lowDateFilter, Filters.byLowDate)
                         : undefined;
    }

    this.updateData(this.currentListCoasts, this.currentListIncomes);
  }

  public filterByYearAndByMounth(): void {
    this.factoryUpdateData(this.listCoasts, this.listIncomes, this.selectedYear, Filters.byYear);
    this.updateDataByMonth(this.currentListCoasts, this.currentListIncomes);
  }

  public updateDataByMonth(listCoast: NewCoast[], listIncomes: NewIncome[]): void {
    this.currentListCoasts = listCoast.filter(obj => this.arrayIdMounths.includes(new Date(obj.date).getMonth()));
    this.currentListIncomes = listIncomes.filter(obj => this.arrayIdMounths.includes(new Date(obj.date).getMonth()));
  }

  public filterFormYear(value: number): void {
    this.selectedYear = value;

    this.arrayIdMounths.length ? this.filterByYearAndByMounth()
                               : this.factoryUpdateData(this.listCoasts, this.listIncomes, this.selectedYear, Filters.byYear);

    this.updateData(this.currentListCoasts, this.currentListIncomes);
  }

  public filterFormMounth(value: Array<object>): void {
    this.arrayIdMounths = [];

    value.length ? value.forEach((obj: Mounth) => this.arrayIdMounths.push(obj.id))
                 : this.arrayIdMounths = [];

    if (this.selectedYear && value.length) {
      this.filterByYearAndByMounth();

    } else if (this.selectedYear) {
      this.factoryUpdateData(this.listCoasts, this.listIncomes, this.selectedYear, Filters.byYear);

    } else {
      this.updateDataByMonth(this.listCoasts, this.listIncomes);
    }

    this.updateData(this.currentListCoasts, this.currentListIncomes);
  }

  public onChange(): void {
    this.checkDate = !this.checkDate;
    this.checkMounth = !this.checkMounth;

    this.currentListCoasts = this.listCoasts;
    this.currentListIncomes = this.listIncomes;

    this.inputFrom.value = '';
    this.inputTo.value = '';

    this.setInitialDateFilter();

    this.selectedYear = NaN;
    this.selectedMounth = '';
    this.arrayIdMounths = [];

    this.lowDateFilter = undefined;
    this.topDateFilter = undefined;

    this.updateData([], []);
  }

  public addTagFn(name): object {
    return { name: name, tag: true };
  }

  public setEmptyData(): void {
    this.currentListCoasts = [];
    this.currentListIncomes = [];
  }

  public factoryUpdateData(dataCoasts: NewCoast[], dataIncomes: NewIncome[],
                           valueFilter: string | number | Date, typeFilter: any): void {
    this.currentListCoasts = this.filterDataService.filter(dataCoasts, valueFilter, typeFilter);
    this.currentListIncomes = this.filterDataService.filter(dataIncomes, valueFilter, typeFilter);
  }

  public updateData(listCoasts: NewCoast[], listIncomes: NewIncome[]): void {
    this.filterDataService.changeSourceListCoasts(listCoasts);
    this.filterDataService.changeSourceListIncomes(listIncomes);
  }
}
