import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio'
import { DataService } from '../../../services/data.service';
import { NewField } from '../../field.model';
import { NewIncome } from '../../income.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatInput } from '@angular/material';
interface Mounth {
  id: number,
  name: string
}
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent implements OnInit {
  @ViewChild('inputFrom', { read: MatInput, static: false}) inputFrom: MatInput;
  @ViewChild('inputTo', { read: MatInput, static: false}) inputTo: MatInput;

  checkDate: boolean = false;
  checkMounth: boolean = true;

  startDate = new Date(2019, 0, 1);

  selectedMounths: string;
  mounths: object[] = [];
  mounthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  years:  string[] = ['2019', '2020'];

  listCoasts: NewField[];
  listIncomes:  NewIncome[];

  currentListCoasts: NewField[];
  currentListIncomes:  NewIncome[];

  topDateFilter: Date;
  lowDateFilter: Date;

  minDateFrom = new Date(2018, 0, 1);
  maxDateFrom = new Date();

  minDateTo = new Date(2018, 0, 1);
  maxDateTo = new Date();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.mounthsNames.forEach((c, i) => {
      this.mounths.push({ id: i, name: c });
    });

    this.dataService.getAllFields().subscribe(data => {
      this.listCoasts = data;
    });
    this.dataService.getAllFieldsIncomes().subscribe(data => {
      this.listIncomes = data;
    });
  }

  setDate(value: Date): Date {
    let date = new Date(value);
    date.setHours(0,0,0,0);
    return date;
  }

  setLowDateFilter(event: MatDatepickerInputEvent<Date>) {
    if(event.value === null) {
      this.lowDateFilter = undefined;
      this.minDateTo = new Date(2018, 0, 1);

      if(this.topDateFilter) {
        this.currentListCoasts = this.listCoasts.filter((obg: NewField)  =>
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

      if(this.topDateFilter) {
        this.currentListCoasts = this.listCoasts.filter((obg: NewField)  =>
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
  }

  setTopDateFilter(event: MatDatepickerInputEvent<Date>) {
    if(event.value === null) {
      this.topDateFilter = undefined;
      this.maxDateFrom = new Date();

      if(this.lowDateFilter) {
        this.currentListCoasts = this.listCoasts.filter((obg: NewField) =>
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

      if(this.lowDateFilter) {
        this.currentListCoasts = this.listCoasts.filter((obg: NewField) =>
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
  }









  filterYear(value: number): void {
    this.currentListCoasts = this.listCoasts.filter(obg => new Date(obg.date).getFullYear() >= value);
    this.currentListIncomes = this.listIncomes.filter(obg => new Date(obg.date).getFullYear() >= value);
  }

  filterMounth(value: Array<object>):void {
    const arrayIdMounths = [];
    value.forEach((obj: Mounth) => arrayIdMounths.push(obj.id));

    this.currentListCoasts = this.listCoasts.filter(obg => arrayIdMounths.includes(new Date(obg.date).getMonth()));
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
  }

  addTagFn(name) {
    return { name: name, tag: true };
  }
}
