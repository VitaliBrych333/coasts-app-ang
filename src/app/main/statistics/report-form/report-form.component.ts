import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { RequireObject } from '../../../shared/interfaces/requireObject.interface';
import { OptionalObject } from '../../../shared/interfaces/optionalObject.interface';
import { RequiredCoasts, OptionalCoasts } from '../../../shared/constants/coasts.enum';
import { TypesIncomes } from '../../../shared/constants/incomes.enum';
import { UserName } from '../../../shared/constants/userNames.enum';
import { NewUsers } from '../../../shared/models/users.model';
import { FilterDataService } from '../../../services/filter-data.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})

export class ReportFormComponent implements OnInit, OnDestroy {

  public required: Array<string> = _.values(RequiredCoasts);
         optional: Array<string> = _.values(OptionalCoasts);
         typesIncomes: Array<string> = _.values(TypesIncomes);
         users: Array<string> = [...UserName];

         coastsTotal: number;
         incomesTotal: number;
         balanse: number;
         currentRequired: RequireObject;
         currentOptional: OptionalObject;

  public allUsers: any = new NewUsers({}, {});

  protected readonly subscriptions: Subscription[] = [];

  constructor(private filterDataService: FilterDataService ) {}

  public ngOnInit(): void {

    this.subscriptions.push(
      combineLatest(this.filterDataService.currentMessageListCoasts, this.filterDataService.currentMessageListIncomes)
        .subscribe(([dataCoasts, dataIncomes]) => {
          let food, rent, child, gym, required, clothes, petrol, present, other, optional;

          if (dataCoasts.length) {
            food = +dataCoasts.filter(obj => obj.type === RequiredCoasts.FOOD).reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);
            rent = +dataCoasts.filter(obj => obj.type === RequiredCoasts.RENT).reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);
            child = +dataCoasts.filter(obj => obj.type === RequiredCoasts.CHILD).reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);
            gym = +dataCoasts.filter(obj => obj.type === RequiredCoasts.GYM).reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);

            clothes = +dataCoasts.filter(obj => obj.type === OptionalCoasts.CLOTHES).reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);
            petrol = +dataCoasts.filter(obj => obj.type === OptionalCoasts.PETROL).reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);
            present = +dataCoasts.filter(obj => obj.type === OptionalCoasts.PRESENT).reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);
            other = +dataCoasts.filter(obj => obj.type === OptionalCoasts.OTHER).reduce((acc, cur) => acc + cur.sum, 0).toFixed(2);

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

  public ngOnDestroy(): void {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  public checkValue(value: any): boolean {
    return value || _.isNull(value);
  }
}
