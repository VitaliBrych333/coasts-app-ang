import { Component, OnInit } from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent implements OnInit {

  checkDate: boolean = false;
  checkMounth: boolean = true;

  startDate = new Date(2019, 0, 1);

  selectedMounths;
  mounths: any[] = [];
  mounthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  years:  string[] = ['2019', '2020'];

  ngOnInit() {
    this.mounthsNames.forEach((c, i) => {
      this.mounths.push({ id: i, name: c });
    });
  }

  onChange() {
    this.checkDate = !this.checkDate;
    this.checkMounth = !this.checkMounth;
  }

  addTagFn(name) {
    return { name: name, tag: true };
  }


}
