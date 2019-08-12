import { Component, OnInit } from '@angular/core';
import { FilterDataService } from '../../../services/filter-data.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  required: Array<string> = ['Food', 'Rent', 'Child', 'Gym'];
  optional: Array<string> = ['Clothes', 'Petrol', 'Present', 'Other'];
  users: Array<string> = ['Vitali', 'Nastya'];

  listCoasts: Array<object>;
  listIncomes: Array<object>;

  total: number = 0;



  constructor(private filterDataService: FilterDataService ) { }


  ngOnInit() {
    this.filterDataService.currentMessageListCoasts.subscribe(data => {
      this.listCoasts = data;
    //   this.total = data.reduce((acc, cur) => acc + cur)
    //  console.log(data)

    });
    this.filterDataService.currentMessageListIncomes.subscribe(data => this.listIncomes = data);

  }

}
