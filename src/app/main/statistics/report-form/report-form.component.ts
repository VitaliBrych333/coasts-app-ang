import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterDataService } from '../../../services/filter-data.service';
import { ISubscription } from 'rxjs/Subscription';

interface RequireObject {
  food: any;
  rent: any;
  child: any;
  gym: any;
  required: any;
}

interface OptionalObject {
  clothes: any;
  petrol: any;
  present: any;
  other: any;
  optional: any;
}

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})

export class ReportFormComponent implements OnInit, OnDestroy {

  required: Array<string> = ['food', 'rent', 'child', 'gym'];
  optional: Array<string> = ['clothes', 'petrol', 'present', 'other'];
  typesIncomes: Array<string> = ['salary', 'sick leave', 'child benefit', 'present', 'holiday pay'];
  users: Array<string> = ['Vitali', 'Nastya'];

  total: number;
  incomeTotal: number;

  currentRequired: RequireObject;
  currentOptional: OptionalObject;

  allUsers: any = {
    Vitali: {},
    Nastya: {},
  };

  subscriptionGetAllFields: ISubscription;

  constructor(private filterDataService: FilterDataService ) { }

  ngOnInit() {
    this.subscriptionGetAllFields = this.filterDataService.currentMessageListCoasts.subscribe(data => {
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
        food = rent = child = gym = required = clothes = petrol = present = other = optional = null;
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
      };
    });

    this.filterDataService.currentMessageListIncomes.subscribe(data => {

      if (data.length) {
        this.users.forEach(user => {

          this.typesIncomes.forEach(type => {
            this.allUsers[user][type] = +data.filter(obj => obj.who === user)
                        .filter(obj => obj.type === type)
                        .reduce((acc, cur) => acc + cur.sum, 0)
                        .toFixed(2);
          });

          this.allUsers[user].total = this.sumKeysObject(this.allUsers[user]);
        });

      } else {
        this.users.forEach(user => {
          this.typesIncomes.forEach(type => {
            this.allUsers[user][type] = null;
          });

          this.allUsers[user].total = null;
        });
      }

      this.incomeTotal =  +(this.allUsers.Vitali.total + this.allUsers.Nastya.total).toFixed(2);
    });
  }

  ngOnDestroy() {
    console.log('fffffffffff');
    //TODO: new EventEmitter to clear data
    this.subscriptionGetAllFields.unsubscribe();
  }

  checkValue(value: any) {
    if (value || value === null) return true;
    return false;
  }

  sumKeysObject(obj: object): number {
    let total = 0;
    for(let key in obj) {
      total += obj[key];
    }
    return +total.toFixed(2);
  }

}
