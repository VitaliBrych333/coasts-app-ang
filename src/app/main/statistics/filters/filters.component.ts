import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { NewCoast } from '../../coast.model';
import { NewIncome } from '../../income.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatInput } from '@angular/material';
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

  @ViewChild('inputFrom', { read: MatInput, static: false}) inputFrom: MatInput;
  @ViewChild('inputTo', { read: MatInput, static: false}) inputTo: MatInput;

  checkDate: boolean = false;
  checkMounth: boolean = true;

  startDate = new Date(2019, 0, 1);
  selectedMounth: string;
  mounths: object[] = [];
  mounthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  years: Array<number>;
  listCoasts: NewCoast[];
  listIncomes: NewIncome[];

  currentListCoasts: NewCoast[];
  currentListIncomes: NewIncome[];

  topDateFilter: Date;
  lowDateFilter: Date;

  minDateFrom = new Date(2018, 0, 1);
  maxDateFrom = new Date();
  minDateTo = new Date(2018, 0, 1);
  maxDateTo = new Date();

  arrayIdMounths: Array<number> = [];
  selectedYear: number;

  constructor(public dataService: DataService,
              public filterDataService: FilterDataService) {}

  ngOnInit() {
    this.mounthsNames.forEach((c, i) => {
      this.mounths.push({ id: i, name: c });
    });

    const tempYearsCoasts = [];
    const tempYearsIncomes = [];

    const promiseCoasts = this.dataService.getAllFieldsCoasts().then(data => {
      this.listCoasts = data;
      data.forEach(obj => tempYearsCoasts.push(new Date(obj.date).getFullYear()));
    });

    const promiseIncomes = this.dataService.getAllFieldsIncomes().then(data => {
      this.listIncomes = data;
      data.forEach(obj => tempYearsIncomes.push(new Date(obj.date).getFullYear()));
    });

    Promise.all([promiseCoasts, promiseIncomes]).then(() => this.years = _.uniq(tempYearsCoasts.concat(tempYearsIncomes)));
  }

  ngOnDestroy() {
    this.onChange();
  }

  setDate(value: Date): Date {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
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

    this.minDateFrom = new Date(2018, 0, 1);
    this.maxDateFrom = new Date();
    this.minDateTo = new Date(2018, 0, 1);
    this.maxDateTo = new Date();

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
