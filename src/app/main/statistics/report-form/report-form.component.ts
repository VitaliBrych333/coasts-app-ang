import { Component, OnInit } from '@angular/core';
import { FilterDataService } from '../../../services/filter-data.service';

interface RequiredObject {
  food: number,
  rent: number,
  child: number,
  gym: number,
  required: number,
}

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})


export class ReportFormComponent implements OnInit {

  required: Array<string> = ['food', 'rent', 'child', 'gym'];
  optional: Array<string> = ['clothes', 'petrol', 'present', 'other'];
  users: Array<string> = ['Vitali', 'Nastya'];

  listCoasts: Array<object>;
  listIncomes: Array<object>;

  total: number;
  currentRequired: RequiredObject = {
    food: 0,
    rent: 0,
    child: 0,
    gym: 0,
    required: 0,
  };

  constructor(private filterDataService: FilterDataService ) { }

  ngOnInit() {
    this.filterDataService.currentMessageListCoasts.subscribe(data => {
      this.listCoasts = data;
      console.log(data)
      this.total = data.reduce((acc, cur) => acc + cur.price, 0);
      this.currentRequired.food = data.filter(obj => obj.type === 'food').reduce((acc, cur) => acc + cur.price, 0);
      console.log('gg', data.filter(obj => obj.type === 'food').reduce((acc, cur) => acc + cur.price, 0))
      this.currentRequired.rent = data.filter(obj => obj.type === 'rent').reduce((acc, cur) => acc + cur.price, 0);
      this.currentRequired.child = data.filter(obj => obj.type === 'child').reduce((acc, cur) => acc + cur.price, 0);
      this.currentRequired.gym = data.filter(obj => obj.type === 'gym').reduce((acc, cur) => acc + cur.price, 0);
      this.currentRequired.required = this.currentRequired.food + this.currentRequired.rent + this.currentRequired.child + this.currentRequired.gym;

     console.log(this.total)

    });
    this.filterDataService.currentMessageListIncomes.subscribe(data => this.listIncomes = data);

  }

}
