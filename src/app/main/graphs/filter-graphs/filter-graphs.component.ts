import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { NewField } from '../../field.model';
import { NewIncome } from '../../income.model';
import { FiltersComponent } from '../../statistics/filters/filters.component';
import { FilterDataService } from '../../../services/filter-data.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-filter-graphs',
  templateUrl: './filter-graphs.component.html',
  styleUrls: ['./filter-graphs.component.css']
})
export class FilterGraphsComponent extends FiltersComponent implements OnInit, OnDestroy {

  someYears: boolean = true;
  oneYear: boolean = false;
  years: Array<number> = [2019, 2020, 2021, 2022];

  coastsRequired: Array<string> = ['food', 'rent', 'child', 'gym'];
  coastsOptional: Array<string> = ['clothes', 'petrol', 'present', 'other'];
  incomesTotal: Array<string> = ['salary', 'sick leave', 'child benefit', 'gift', 'holiday pay'];
  incomesUsers: Array<string> = ['incomes Vitali', 'incomes Nastya'];
  coastsKinds: Array<string> = ['coasts required', 'coasts optional'];

  parameters: Array<string> = this.coastsRequired.concat(this.coastsOptional, this.incomesTotal, this.incomesUsers,
                                                         this.coastsKinds, 'coasts total', 'incomes total', 'accumulation');

  listCoasts: NewField[];
  listIncomes: NewIncome[];
  selectedYear: number;
  selectedParameters: string[];

  selectedYears: number[];
  selectedParameter: string;
  arrayDataCompare: object[] = [];

  constructor(public dataService: DataService,
              public filterDataService: FilterDataService) { super(dataService, filterDataService); }

  ngOnInit() {
    console.log(this.selectedYear, this.selectedParameter, this.selectedYears, this.selectedParameters, this.oneYear, this.someYears)
    this.dataService.getAllFields().then(data => {
      this.listCoasts = data;
    });

    this.dataService.getAllFieldsIncomes().then(data => {
      this.listIncomes = data;
    });
  }

  ngOnDestroy() {
    this.onChange();
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
      if (year) {
        sumResult = +_.sumBy(newDataGraphs.filter((obj: any) => (new Date(obj.date).getMonth() === i)
                                                                  && (new Date(obj.date).getFullYear() === year)), 'sum').toFixed(2);
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

  onChange() {
    this.selectedYear = null;
    this.selectedParameter = null;

    this.selectedYears = null;
    this.selectedParameters = null;

    this.oneYear = !this.oneYear;
    this.someYears = !this.someYears;

    this.arrayDataCompare = [];
    this.filterDataService.changeSourceDataCompare(this.arrayDataCompare);
  }

  addTagFnYear(name) {
    return { name: name, tag: true };
  }

  addTagFnParameter(name) {
    return { name: name, tag: true };
  }
}
