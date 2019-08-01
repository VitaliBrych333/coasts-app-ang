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
  selectedCompanies;
  companies: any[] = [];
  companiesNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    ngOnInit() {
        this.companiesNames.forEach((c, i) => {
            this.companies.push({ id: i, name: c });
        });
    }

    onChange() {
      this.checkDate = !this.checkDate;
      this.checkMounth = !this.checkMounth;
   }

    addTagFn(name) {
      console.log('ffffffffff')
      return { name: name, tag: true };
    }


}
