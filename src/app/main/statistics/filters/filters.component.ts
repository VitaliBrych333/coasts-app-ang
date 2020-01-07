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
import { NewCoast } from '../../coast.model';
import { NewIncome } from '../../income.model';
import { FilterDataService } from '../../../services/filter-data.service';
import * as _ from 'lodash';

interface Mounth {
  id: number;
  name: string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

  @ViewChild('inputFrom', { read: MatInput, static: false}) inputFrom: MatInput;
  @ViewChild('inputTo', { read: MatInput, static: false}) inputTo: MatInput;

  checkDate: boolean = false;
  checkMounth: boolean = true;

  startDate = new Date();
  selectedMounth: string;
  mounths: object[] = [];
  mounthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

  constructor(public filterDataService: FilterDataService,
              protected store: Store<AppState>) {}

  ngOnInit() {
    this.getStateCoast = this.store.select(selectCoastState);
    this.getStateIncome = this.store.select(selectIncomeState);

    this.setInitialDateFilter();

    const tempYearsCoasts = [];
    const tempYearsIncomes = [];

    this.subscriptions.push(
      combineLatest(this.getStateCoast, this.getStateIncome)
        .subscribe(([stateCoast, stateIncome]: [CoastState, IncomeState]) => {
          if (stateCoast.coasts) {
            stateCoast.coasts.forEach((obj: NewCoast) => this.listCoasts.push(Object.assign({}, obj)));
            this.listCoasts.forEach(obj => tempYearsCoasts.push(new Date(obj.date).getFullYear()));
          }

          if (stateIncome.incomes) {
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

  ngOnDestroy() {
    this.onChange();
    this.store.dispatch(new ClearStateCoast());
    this.store.dispatch(new ClearStateIncome());
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  setDate(value: Date): Date {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  setInitialDateFilter(): void {
    this.minDateFrom = new Date(2018, 0, 1);
    this.maxDateFrom = new Date();
    this.minDateTo = new Date(2018, 0, 1);
    this.maxDateTo = new Date();
  }

  setLowDateFilter(event: MatDatepickerInputEvent<Date>) {
    if (event.value === null) {
      this.lowDateFilter = undefined;
      this.minDateTo = new Date(2018, 0, 1);

      if (this.topDateFilter) {
        this.currentListCoasts = this.listCoasts.filter((obg: NewCoast)  =>
          this.setDate(obg.date) <= this.topDateFilter
        );
        this.currentListIncomes = this.listIncomes.filter((obg: NewIncome) =>
          this.setDate(obg.date) <= this.topDateFilter
        );

      } else {
        this.currentListCoasts = [];
        this.currentListIncomes = [];
      }

    } else {
      this.lowDateFilter = new Date(event.value);
      this.minDateTo = new Date(event.value);

      if (this.topDateFilter) {
        this.currentListCoasts = this.listCoasts.filter((obg: NewCoast)  =>
          (this.setDate(obg.date) >= this.lowDateFilter) && (this.setDate(obg.date) <= this.topDateFilter)
        );
        this.currentListIncomes = this.listIncomes.filter((obg: NewIncome) =>
          (this.setDate(obg.date) >= this.lowDateFilter) && (this.setDate(obg.date) <= this.topDateFilter)
        );

      } else {
        this.currentListCoasts = this.listCoasts.filter(obg => this.setDate(obg.date) >= this.lowDateFilter);
        this.currentListIncomes = this.listIncomes.filter(obg => this.setDate(obg.date) >= this.lowDateFilter);
      }
    }
    this.filterDataService.changeSourceListCoasts(this.currentListCoasts);
    this.filterDataService.changeSourceListIncomes(this.currentListIncomes);
  }

  setTopDateFilter(event: MatDatepickerInputEvent<Date>) {
    if (event.value === null) {
      this.topDateFilter = undefined;
      this.maxDateFrom = new Date();

      if (this.lowDateFilter) {
        this.currentListCoasts = this.listCoasts.filter((obg: NewCoast) =>
          this.setDate(obg.date) >= this.lowDateFilter
        );
        this.currentListIncomes = this.listIncomes.filter((obg: NewIncome) =>
          this.setDate(obg.date) >= this.lowDateFilter
        );

      } else {
        this.currentListCoasts = [];
        this.currentListIncomes = [];
      }

    } else {
      this.topDateFilter = new Date(event.value);
      this.maxDateFrom = new Date(event.value);

      if (this.lowDateFilter) {
        this.currentListCoasts = this.listCoasts.filter((obg: NewCoast) =>
          (this.setDate(obg.date) >= this.lowDateFilter) && (this.setDate(obg.date) <= this.topDateFilter)
        );
        this.currentListIncomes = this.listIncomes.filter((obg: NewIncome) =>
          (this.setDate(obg.date) >= this.lowDateFilter) && (this.setDate(obg.date) <= this.topDateFilter)
        );

      } else {
        this.currentListCoasts = this.listCoasts.filter(obg => this.setDate(obg.date) <= this.topDateFilter);
        this.currentListIncomes = this.listIncomes.filter(obg => this.setDate(obg.date) <= this.topDateFilter);
      }
    }
    this.filterDataService.changeSourceListCoasts(this.currentListCoasts);
    this.filterDataService.changeSourceListIncomes(this.currentListIncomes);
  }

  filterByYearAndByMounth(): void {
    this.currentListCoasts = this.listCoasts
                                  .filter(obg => (new Date(obg.date).getFullYear() === this.selectedYear)
                                                  && (this.arrayIdMounths.includes(new Date(obg.date).getMonth())));
    this.currentListIncomes = this.listIncomes
                                  .filter(obg => (new Date(obg.date).getFullYear() === this.selectedYear)
                                                  && (this.arrayIdMounths.includes(new Date(obg.date).getMonth())));
  }

  filterOnlyByYear(): void {
    this.currentListCoasts = this.listCoasts.filter(obg => new Date(obg.date).getFullYear() === this.selectedYear);
    this.currentListIncomes = this.listIncomes.filter(obg => new Date(obg.date).getFullYear() === this.selectedYear);
  }

  filterFormYear(value: number): void {
    this.selectedYear = value;

    if (this.arrayIdMounths.length) {
      this.filterByYearAndByMounth();
    } else {
      this.filterOnlyByYear();
    }
    this.filterDataService.changeSourceListCoasts(this.currentListCoasts);
    this.filterDataService.changeSourceListIncomes(this.currentListIncomes);
  }

  filterFormMounth(value: Array<object>): void {
    this.arrayIdMounths = [];

    if (!value.length) {
      this.arrayIdMounths = [];
    } else {
      value.forEach((obj: Mounth) => this.arrayIdMounths.push(obj.id));
    }

    if (this.selectedYear && value.length) {
      this.filterByYearAndByMounth();

    } else if (this.selectedYear) {
      this.filterOnlyByYear();

    } else {
      this.currentListCoasts = this.listCoasts.filter(obg => this.arrayIdMounths.includes(new Date(obg.date).getMonth()));
      this.currentListIncomes = this.listIncomes.filter(obg => this.arrayIdMounths.includes(new Date(obg.date).getMonth()));
    }

    this.filterDataService.changeSourceListCoasts(this.currentListCoasts);
    this.filterDataService.changeSourceListIncomes(this.currentListIncomes);
  }

  onChange() {
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

    this.filterDataService.changeSourceListCoasts([]);
    this.filterDataService.changeSourceListIncomes([]);
  }

  addTagFn(name) {
    return { name: name, tag: true };
  }
}
