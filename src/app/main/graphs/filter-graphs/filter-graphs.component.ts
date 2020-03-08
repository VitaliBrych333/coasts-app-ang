import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.states';
import { FiltersComponent } from '../../statistics/filters/filters.component';
import { FilterDataService } from '../../../services/filter-data.service';
import { RequiredCoasts, OptionalCoasts } from '../../../shared/constants/coasts.enum';
import { TypesIncomes } from '../../../shared/constants/incomes.enum';
import { FilterValue } from '../../../shared/constants/filterValue.enum';
import { Filters } from '../../../shared/constants/filters';

@Component({
  selector: 'app-filter-graphs',
  templateUrl: './filter-graphs.component.html',
  styleUrls: ['./filter-graphs.component.scss']
})

export class FilterGraphsComponent extends FiltersComponent {

  public someYears: boolean = true;
         oneYear: boolean = false;

         coastsRequired: Array<string> = _.values(RequiredCoasts);
         coastsOptional: Array<string> = _.values(OptionalCoasts);
         incomesTotal: Array<string> = _.values(TypesIncomes);
         incomesUsers: Array<string> = [ FilterValue.INCOMES_USER_1, FilterValue.INCOMES_USER_2 ];
         coastsKinds: Array<string> = [ FilterValue.COASTS_REQUIRED, FilterValue.COASTS_OPTIONAL ];

         parameters: Array<string> = this.coastsRequired
                                       .concat(this.coastsOptional, this.incomesTotal, this.incomesUsers, this.coastsKinds,
                                               FilterValue.COASTS_TOTAL, FilterValue.INCOMES_TOTAL, FilterValue.ACCUMULATION);

         selectedYear: number;
         selectedParameters: string[];

         selectedYears: number[];
         selectedParameter: string;
         arrayDataCompare: object[] = [];

  constructor(public filterDataService: FilterDataService,
              protected store: Store<AppState>) { super(filterDataService, store); }

  public filterAnniversary(): void {
    this.arrayDataCompare = [];

    if (_.isNil(this.selectedYear) || _.isNil(this.selectedParameters) || this.selectedParameters.length === 0) {
      this.filterDataService.changeSourceDataCompare(this.arrayDataCompare);
      return;
    }

    this.factoryUpdateData(this.listCoasts, this.listIncomes, this.selectedYear, Filters.byYear);

    this.selectedParameters.forEach(value => {
      const newDataGraphs: Array<object> = this.filterByKindParameter(value);
      const newData = this.getSumDataByMonths(newDataGraphs);
      newData.set(12, value);
      this.arrayDataCompare.push(newData);
    });

    this.filterDataService.changeSourceDataCompare(this.arrayDataCompare);
  }

  public filterByKindParameter(value: string): Array<object>  {
    let newDataGraphs: Array<object>;

    if (this.coastsRequired.includes(value) || this.coastsOptional.includes(value)) {
      newDataGraphs = this.currentListCoasts.filter(obj => obj.type === value);
      // newDataGraphs =  this.filterDataService.filter(this.currentListCoasts, value, Filters.byType);
    } else if (this.incomesTotal.includes(value)) {
      newDataGraphs = this.currentListIncomes.filter(obj => obj.type === value);

    } else if (this.incomesUsers.includes(value)) {
      newDataGraphs = this.filterDataService.filter(this.currentListIncomes, value.slice(8), Filters.byAuthor);
      // newDataGraphs = this.currentListIncomes.filter(obj => obj.who === value.slice(8));

    } else {
      switch (value) {
        case FilterValue.COASTS_REQUIRED:
          newDataGraphs = this.currentListCoasts.filter(obj => this.coastsRequired.includes(obj.type));
          break;
        case FilterValue.COASTS_OPTIONAL:
          newDataGraphs = this.currentListCoasts.filter(obj => this.coastsOptional.includes(obj.type));
          break;
        case FilterValue.COASTS_TOTAL:
          newDataGraphs = _.cloneDeep(this.currentListCoasts);
          break;
        case FilterValue.INCOMES_TOTAL:
          newDataGraphs = _.cloneDeep(this.currentListIncomes);
          break;
        case FilterValue.ACCUMULATION:
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

  public filterYears(): void {
    this.arrayDataCompare = [];

    if (_.isNil(this.selectedParameter) || _.isNil(this.selectedYears) || this.selectedYears.length === 0) {
      this.filterDataService.changeSourceDataCompare(this.arrayDataCompare);
      return;
    }

    this.filterOnlyByYears(this.selectedYears);

    this.selectedYears.forEach(value => {
      const newDataGraphs: Array<object> = this.filterByKindParameter(this.selectedParameter);
      const newData = this.getSumDataByMonths(newDataGraphs, value);
      newData.set(12, value);
      this.arrayDataCompare.push(newData);
    });

    this.filterDataService.changeSourceDataCompare(this.arrayDataCompare);
  }

  public filterOnlyByYears(arrayYears: number[]): void {
    this.currentListCoasts = this.listCoasts.filter(obg => arrayYears.includes(new Date(obg.date).getFullYear()));
    this.currentListIncomes = this.listIncomes.filter(obg => arrayYears.includes(new Date(obg.date).getFullYear()));
  }

  public onChange(): void {
    this.selectedYear = null;
    this.selectedParameter = null;

    this.selectedYears = null;
    this.selectedParameters = null;

    this.oneYear = !this.oneYear;
    this.someYears = !this.someYears;

    this.arrayDataCompare = [];
    this.filterDataService.changeSourceDataCompare(this.arrayDataCompare);
  }

  public addTagFnYear(name): object {
    return { name: name, tag: true };
  }

  public addTagFnParameter(name): object {
    return { name: name, tag: true };
  }

  private getSumDataByMonths(newDataGraphs: object[], year?: number): Map<number, number | string> {
    const newData = new Map();
    let sumResult: number = 0;

    for (let i = 0; i < 12; i++) {
      const filtertByMonth = this.filterDataService.filter(newDataGraphs, i, Filters.byMonth);

      if (year) {
        const filtertByYear = this.filterDataService.filter(filtertByMonth, year, Filters.byYear);
        sumResult = +_.sumBy(filtertByYear, 'sum').toFixed(2);
        // sumResult = +_.sumBy(newDataGraphs.filter((obj: any) => (new Date(obj.date).getMonth() === i)
        //                                                           && (new Date(obj.date).getFullYear() === year)), 'sum').toFixed(2);

      } else {
        sumResult = +_.sumBy(filtertByMonth, 'sum').toFixed(2);
        // sumResult = +_.sumBy(newDataGraphs.filter((obj: any) => new Date(obj.date).getMonth() === i), 'sum').toFixed(2);
      }

      newData.set(i, sumResult);
    }
    return newData;
  }
}
