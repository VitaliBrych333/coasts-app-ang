import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css'],
  providers:[DatePipe]
})
export class EnterComponent implements OnInit {

  myDate = new Date().toString();
  dataMin = `${new Date().getFullYear().toString()}` + '-01-01';
  dataMax = `${new Date().getFullYear().toString()}` + '-12-31';

  constructor(private datePipe: DatePipe) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit() {
  }

}
