import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { parse, format, addMonth } from 'ts-date/esm/locale/en';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers:[DatePipe]
})



export class CalendarComponent implements OnInit {

  myDate = new Date().toString();
  dataMin = `${new Date().getFullYear().toString()}` + '-01-01';
  dataMax = `${new Date().getFullYear().toString()}` + '-12-31';

  constructor(private datePipe: DatePipe) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit() {
  }

}
