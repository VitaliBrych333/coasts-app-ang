import { Component, OnInit } from '@angular/core';
import { FilterDataService } from '../../../services/filter-data.service';

interface RequireObject {
  food: any,
  rent: any,
  child: any,
  gym: any,
  required: any,
}

interface OptionalObject {
  clothes: any,
  petrol: any,
  present: any,
  other: any,
  optional: any,
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

  // listCoasts: Array<object>;
  listIncomes: Array<object>;

  total: number;
  currentRequired: RequireObject;
  currentOptional: OptionalObject;

  constructor(private filterDataService: FilterDataService ) { }

  ngOnInit() {

    this.filterDataService.currentMessageListCoasts.subscribe(data => {
      let food, rent, child, gym, required, clothes, petrol, present, other, optional;
      if (data.length) {
        food = +data.filter(obj => obj.type === 'food').reduce((acc, cur) => acc + cur.price, 0).toFixed(2);
        rent = +data.filter(obj => obj.type === 'rent').reduce((acc, cur) => acc + cur.price, 0).toFixed(2);
        child = +data.filter(obj => obj.type === 'child').reduce((acc, cur) => acc + cur.price, 0).toFixed(2);
        gym = +data.filter(obj => obj.type === 'gym').reduce((acc, cur) => acc + cur.price, 0).toFixed(2);

        clothes = +data.filter(obj => obj.type === 'clothes').reduce((acc, cur) => acc + cur.price, 0).toFixed(2);
        petrol = +data.filter(obj => obj.type === 'petrol').reduce((acc, cur) => acc + cur.price, 0).toFixed(2);
        present = +data.filter(obj => obj.type === 'present').reduce((acc, cur) => acc + cur.price, 0).toFixed(2);
        other = +data.filter(obj => obj.type === 'other').reduce((acc, cur) => acc + cur.price, 0).toFixed(2);

        required = +(food + rent + child + gym).toFixed(2);
        optional = +(clothes + petrol + present + other).toFixed(2);
      } else {
        food = rent = child = gym = required = clothes = petrol = present = other = optional = '';
      }

      this.currentRequired = {
        food: food,
        rent: rent,
        child: child,
        gym: gym,
        required: required,
      };

      this.currentOptional = {
        clothes: clothes,
        petrol: petrol,
        present: present,
        other: other,
        optional: optional,
      }
    });

    this.filterDataService.currentMessageListIncomes.subscribe(data => {

    });

  }

}
