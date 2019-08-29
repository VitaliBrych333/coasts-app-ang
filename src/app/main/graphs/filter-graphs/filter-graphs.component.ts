import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { DataService } from '../../../services/data.service';
import { NewField } from '../../field.model';
import { NewIncome } from '../../income.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatInput } from '@angular/material';
import { FilterDataService } from '../../../services/filter-data.service';
import { ISubscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { FiltersComponent } from '../../statistics/filters/filters.component';

import { NgDropdownPanelService } from '@ng-select/ng-select/lib/ng-dropdown-panel.service';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';
@Component({
  selector: 'app-filter-graphs',
  templateUrl: './filter-graphs.component.html',
  styleUrls: ['./filter-graphs.component.css']
})
export class FilterGraphsComponent extends FiltersComponent implements OnInit, OnDestroy {

  someYears: boolean = true;
  oneYear: boolean = false;
  // startDate = new Date(2019, 0, 1);

  // selectedMounth: string;
  // mounths: object[] = [];
  // mounthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  years: Array<number> = [2019, 2020, 2021, 2022];

  coastsRequired: Array<string> = ['food', 'rent', 'child', 'gym'];
  coastsOptional: Array<string> = ['clothes', 'petrol', 'present', 'other'];
  incomesTotal: Array<string> = ['salary', 'sick leave', 'child benefit', 'gift', 'holiday pay'];
  incomesUsers: Array<string> = ['incomes Vitali', 'incomes Nastya'];
  coastsKinds: Array<string> = ['coasts required', 'coasts optional'];

  parameters: Array<string> = this.coastsRequired.concat(this.coastsOptional, this.incomesTotal, this.incomesUsers,
                                                         this.coastsKinds, 'coasts total', 'incomes total', 'accumulation')

  listCoasts: NewField[];
  listIncomes: NewIncome[];

  // currentListCoasts: NewField[];
  // currentListIncomes: NewIncome[];

  // topDateFilter: Date;
  // lowDateFilter: Date;

  // minDateFrom = new Date(2018, 0, 1);
  // maxDateFrom = new Date();
  // minDateTo = new Date(2018, 0, 1);
  // maxDateTo = new Date();

  // arrayIdMounths: Array<number> = [];
  selectedYear: number;
  selectedParameters: string[];

  selectedYears: number[];
  selectedParameter: string;

  subscriptionGetAllFields: ISubscription;
  subscriptionGetAllFieldsIncomes: ISubscription;

  arrayDataCompare: object[] = [];

  constructor(public dataService: DataService,
              public filterDataService: FilterDataService) { super(dataService, filterDataService); }

  ngOnInit() {

  //   this.mounthsNames.forEach((c, i) => {
  //     this.mounths.push({ id: i, name: c });
  //   });

    this.subscriptionGetAllFields = this.dataService.getAllFields().subscribe(data => {
      this.listCoasts = data;
    });
    this.subscriptionGetAllFieldsIncomes = this.dataService.getAllFieldsIncomes().subscribe(data => {
      this.listIncomes = data;
    });
  }

  ngOnDestroy() {
    this.onChange();
    this.subscriptionGetAllFields.unsubscribe();
    this.subscriptionGetAllFieldsIncomes.unsubscribe();
  }

  filterAnniversary() {
    this.arrayDataCompare = [];

    if (_.isNil(this.selectedYear) || _.isNil(this.selectedParameters) || this.selectedParameters.length === 0) {
      this.filterDataService.changeSourceDataCompare(this.arrayDataCompare);
      return;
    }

    this.filterOnlyByYear();
    this.selectedParameters.forEach(value => {
      let newDataGraphs: Array<object> = this.filterByKindParameter(value);

      let newData = this.getSumDataByMonths(newDataGraphs);
      newData.set(12, value);
      this.arrayDataCompare.push(newData);
    });

    this.filterDataService.changeSourceDataCompare(this.arrayDataCompare);
  }

  private getSumDataByMonths(newDataGraphs: object[], year?: number) {
    let newData = new Map();
    let sumResult: number = 0;

    for (let i = 0; i < 12; i++) {
      if(year) {
        sumResult = +_.sumBy(newDataGraphs.filter((obj: any) => (new Date(obj.date).getMonth() === i) && (new Date(obj.date).getFullYear() === year)), 'sum').toFixed(2);
      } else {
        sumResult = +_.sumBy(newDataGraphs.filter((obj: any) => new Date(obj.date).getMonth() === i), 'sum').toFixed(2);
      }
      newData.set(i, sumResult);
    }
    return newData;
  }

  filterByKindParameter(value: string):  Array<object>  {
    let newDataGraphs: Array<object>;

    if (this.coastsRequired.includes(value) || this.coastsOptional.includes(value)) {
        newDataGraphs = this.currentListCoasts.filter(obj => obj.type === value);

    } else if (this.incomesTotal.includes(value)) {
      newDataGraphs = this.currentListIncomes.filter(obj => obj.type === value);

    } else if (this.incomesUsers.includes(value)) {
      newDataGraphs = this.currentListIncomes.filter(obj => obj.who === value.slice(8));

    } else {

      switch (value) {
        case 'coasts required':
          newDataGraphs = this.currentListCoasts.filter(obj => this.coastsRequired.includes(obj.type));
          break;
        case 'coasts optional':
          newDataGraphs = this.currentListCoasts.filter(obj => this.coastsOptional.includes(obj.type));
          break;
        case 'coasts total':
          newDataGraphs = _.cloneDeep(this.currentListCoasts);
          break;
        case 'incomes total':
          newDataGraphs = _.cloneDeep(this.currentListIncomes);
          break;
        case 'accumulation':
          const tempListCoasts = _.cloneDeep(this.currentListCoasts);
          const tempListIncomes = _.cloneDeep(this.currentListIncomes) as any;

          tempListCoasts.forEach(obj => obj.sum = -obj.sum);
          newDataGraphs = tempListIncomes.concat(tempListCoasts);
          break;
        default:
          break;
      }
    }
    return newDataGraphs;
  }

  filterYears() {
    this.arrayDataCompare = [];

    if (_.isNil(this.selectedParameter) || _.isNil(this.selectedYears) || this.selectedYears.length === 0) {
      this.filterDataService.changeSourceDataCompare(this.arrayDataCompare);
      return;
    }

    this.filterOnlyByYears(this.selectedYears);

    this.selectedYears.forEach(value => {
      let newDataGraphs: Array<object> = this.filterByKindParameter(this.selectedParameter);

      let newData = this.getSumDataByMonths(newDataGraphs, value);
      newData.set(12, value);
      this.arrayDataCompare.push(newData);
    });

    this.filterDataService.changeSourceDataCompare(this.arrayDataCompare);
  }

  filterOnlyByYears(arrayYears: number[]): void {
    this.currentListCoasts = this.listCoasts.filter(obg => arrayYears.includes(new Date(obg.date).getFullYear()));
    this.currentListIncomes = this.listIncomes.filter(obg => arrayYears.includes(new Date(obg.date).getFullYear()));
  }

  // setDate(value: Date): Date {
  //   const date = new Date(value);
  //   date.setHours(0, 0, 0, 0);
  //   return date;
  // }

  // setLowDateFilter(event: MatDatepickerInputEvent<Date>) {
  //   if (event.value === null) {
  //     this.lowDateFilter = undefined;
  //     this.minDateTo = new Date(2018, 0, 1);

  //     if (this.topDateFilter) {
  //       this.currentListCoasts = this.listCoasts.filter((obg: NewField)  =>
  //         this.setDate(obg.date) <= this.topDateFilter
  //       );
  //       this.currentListIncomes = this.listIncomes.filter((obg: NewIncome) =>
  //         this.setDate(obg.date) <= this.topDateFilter
  //       );

  //     } else {
  //       this.currentListCoasts = [];
  //       this.currentListIncomes = [];
  //     }

  //   } else {
  //     this.lowDateFilter = new Date(event.value);
  //     this.minDateTo = new Date(event.value);

  //     if (this.topDateFilter) {
  //       this.currentListCoasts = this.listCoasts.filter((obg: NewField)  =>
  //         (this.setDate(obg.date) >= this.lowDateFilter) && (this.setDate(obg.date) <= this.topDateFilter)
  //       );
  //       this.currentListIncomes = this.listIncomes.filter((obg: NewIncome) =>
  //         (this.setDate(obg.date) >= this.lowDateFilter) && (this.setDate(obg.date) <= this.topDateFilter)
  //       );

  //     } else {
  //       this.currentListCoasts = this.listCoasts.filter(obg => this.setDate(obg.date) >= this.lowDateFilter);
  //       this.currentListIncomes = this.listIncomes.filter(obg => this.setDate(obg.date) >= this.lowDateFilter);
  //     }
  //   }
  //   this.filterDataService.changeSourceListCoasts(this.currentListCoasts);
  //   this.filterDataService.changeSourceListIncomes(this.currentListIncomes);
  // }

  // setTopDateFilter(event: MatDatepickerInputEvent<Date>) {
  //   if (event.value === null) {
  //     this.topDateFilter = undefined;
  //     this.maxDateFrom = new Date();

  //     if (this.lowDateFilter) {
  //       this.currentListCoasts = this.listCoasts.filter((obg: NewField) =>
  //         this.setDate(obg.date) >= this.lowDateFilter
  //       );
  //       this.currentListIncomes = this.listIncomes.filter((obg: NewIncome) =>
  //         this.setDate(obg.date) >= this.lowDateFilter
  //       );

  //     } else {
  //       this.currentListCoasts = [];
  //       this.currentListIncomes = [];
  //     }

  //   } else {
  //     this.topDateFilter = new Date(event.value);
  //     this.maxDateFrom = new Date(event.value);

  //     if (this.lowDateFilter) {
  //       this.currentListCoasts = this.listCoasts.filter((obg: NewField) =>
  //         (this.setDate(obg.date) >= this.lowDateFilter) && (this.setDate(obg.date) <= this.topDateFilter)
  //       );
  //       this.currentListIncomes = this.listIncomes.filter((obg: NewIncome) =>
  //         (this.setDate(obg.date) >= this.lowDateFilter) && (this.setDate(obg.date) <= this.topDateFilter)
  //       );

  //     } else {
  //       this.currentListCoasts = this.listCoasts.filter(obg => this.setDate(obg.date) <= this.topDateFilter);
  //       this.currentListIncomes = this.listIncomes.filter(obg => this.setDate(obg.date) <= this.topDateFilter);
  //     }
  //   }
  //   this.filterDataService.changeSourceListCoasts(this.currentListCoasts);
  //   this.filterDataService.changeSourceListIncomes(this.currentListIncomes);
  // }

  // filterByYearAndByMounth(): void {
  //   this.currentListCoasts = this.listCoasts
  //                                 .filter(obg => (new Date(obg.date).getFullYear() >= this.selectedYear)
  //                                                 && (this.arrayIdMounths.includes(new Date(obg.date).getMonth())));
  //   this.currentListIncomes = this.listIncomes
  //                                 .filter(obg => (new Date(obg.date).getFullYear() >= this.selectedYear)
  //                                                 && (this.arrayIdMounths.includes(new Date(obg.date).getMonth())));
  // }

  // filterOnlyByYear(): void {
  //   this.currentListCoasts = this.listCoasts.filter(obg => new Date(obg.date).getFullYear() >= this.selectedYear);
  //   this.currentListIncomes = this.listIncomes.filter(obg => new Date(obg.date).getFullYear() >= this.selectedYear);
  // }

  // filterFormYear(value: number): void {
  //   this.selectedYear = value;

  //   if (this.arrayIdMounths.length) {
  //     this.filterByYearAndByMounth();
  //   } else {
  //     this.filterOnlyByYear();
  //   }
  //   this.filterDataService.changeSourceListCoasts(this.currentListCoasts);
  //   this.filterDataService.changeSourceListIncomes(this.currentListIncomes);
  // }

  // filterFormMounth(value: Array<object>): void {
  //   if (!value.length) {
  //     this.arrayIdMounths = [];
  //   } else {
  //     value.forEach((obj: Mounth) => this.arrayIdMounths.push(obj.id));
  //   }

  //   if (this.selectedYear && value.length) {
  //     this.filterByYearAndByMounth();

  //   } else if (this.selectedYear) {
  //     this.filterOnlyByYear();

  //   } else {
  //     this.currentListCoasts = this.listCoasts.filter(obg => this.arrayIdMounths.includes(new Date(obg.date).getMonth()));
  //     this.currentListIncomes = this.listIncomes.filter(obg => this.arrayIdMounths.includes(new Date(obg.date).getMonth()));
  //   }
  //   this.filterDataService.changeSourceListCoasts(this.currentListCoasts);
  //   this.filterDataService.changeSourceListIncomes(this.currentListIncomes);
  // }

  onChange() {
    this.selectedYear = null;
    this.selectedParameter = null;

    this.selectedYears = null;
    this.selectedParameters = null;

    this.oneYear = !this.oneYear;
    this.someYears = !this.someYears;
    //TODO: probable change arrayDataCompare on []
    this.arrayDataCompare = [];
    this.filterDataService.changeSourceDataCompare(this.arrayDataCompare);
    // this.currentListCoasts = this.listCoasts;
    // this.currentListIncomes = this.listIncomes;

    // this.inputFrom.value = '';
    // this.inputTo.value = '';

    // this.minDateFrom = new Date(2018, 0, 1);
    // this.maxDateFrom = new Date();
    // this.minDateTo = new Date(2018, 0, 1);
    // this.maxDateTo = new Date();


    // this.arrayIdMounths = [];

    // this.filterDataService.changeSourceListCoasts([]);
    // this.filterDataService.changeSourceListIncomes([]);
  }

  addTagFnYear(name) {
    return { name: name, tag: true };
  }

  addTagFnParameter(name) {
    return { name: name, tag: true };
  }
}
