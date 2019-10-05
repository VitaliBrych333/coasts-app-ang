import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterDataService } from '../../../services/filter-data.service';
import { combineLatest, Subscription } from 'rxjs';
import * as _ from 'lodash';

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
  styleUrls: ['./report-form.component.scss']
})

export class ReportFormComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

  required: Array<string> = ['food', 'rent', 'child', 'gym'];
  optional: Array<string> = ['clothes', 'petrol', 'present', 'other'];
  typesIncomes: Array<string> = ['salary', 'sick leave', 'child benefit', 'gift', 'holiday pay'];
  users: Array<string> = ['Vitali', 'Nastya'];

  coastsTotal: number;
  incomesTotal: number;
  balanse: number;
  currentRequired: RequireObject;
  currentOptional: OptionalObject;

  allUsers: any = {
    Vitali: {},
    Nastya: {},
  };

  constructor(private filterDataService: FilterDataService ) {}

  ngOnInit() {

    this.subscriptions.push(
      combineLatest(this.filterDataService.currentMessageListCoasts, this.filterDataService.currentMessageListIncomes)
        .subscribe(([dataCoasts, dataIncomes]) => {
          let food, rent, child, gym, required, clothes, petrol, present, other, optional;

          if (dataCoasts.length) {
            food = +dataCoasts.filter(obj => obj.type === 'food').reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);
            rent = +dataCoasts.filter(obj => obj.type === 'rent').reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);
            child = +dataCoasts.filter(obj => obj.type === 'child').reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);
            gym = +dataCoasts.filter(obj => obj.type === 'gym').reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);

            clothes = +dataCoasts.filter(obj => obj.type === 'clothes').reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);
            petrol = +dataCoasts.filter(obj => obj.type === 'petrol').reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);
            present = +dataCoasts.filter(obj => obj.type === 'present').reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);
            other = +dataCoasts.filter(obj => obj.type === 'other').reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);

            required = +(food + rent + child + gym).toFixed(2);
            optional = +(clothes + petrol + present + other).toFixed(2);
            this.coastsTotal = +(required + optional).toFixed(2);

          } else {
            this.coastsTotal = food = rent = child = gym = required = clothes = petrol = present = other = optional = null;
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

          if (dataIncomes.length) {
            this.users.forEach(user => {
              this.allUsers[user].total = null;
              this.typesIncomes.forEach(type => {
                this.allUsers[user][type] = +dataIncomes.filter(obj => obj.who === user)
                                              .filter(obj => obj.type === type)
                                              .reduce((acc, cur) => acc + cur.sum, 0)
                                              .toFixed(2);
              });

              this.allUsers[user].total = +_.sum(_.values(this.allUsers[user])).toFixed(2);
            });

            this.incomesTotal =  +(this.allUsers.Vitali.total + this.allUsers.Nastya.total).toFixed(2);

          } else {
            this.users.forEach(user => {
              this.typesIncomes.forEach(type => {
                this.allUsers[user][type] = null;
              });

              this.allUsers[user].total = null;
              this.incomesTotal = null;
            });
          }

          if (this.coastsTotal && this.incomesTotal) {
            this.balanse = +(this.incomesTotal - this.coastsTotal).toFixed(2);
          } else if (this.coastsTotal === null && this.incomesTotal) {
            this.balanse = +this.incomesTotal.toFixed(2);
          } else if (this.coastsTotal && this.incomesTotal === null) {
            this.balanse = +(- this.coastsTotal).toFixed(2);
          } else {
            this.balanse = null;
          }
        })
    );
  }

  ngOnDestroy() {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  checkValue(value: any) {
    return value || _.isNull(value);
  }
}
