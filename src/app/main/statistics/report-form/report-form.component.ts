import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { RequireObject } from '../../../shared/interfaces/requireObject.interface';
import { OptionalObject } from '../../../shared/interfaces/optionalObject.interface';
import { RequiredCoasts, OptionalCoasts } from '../../../shared/constants/coasts.enum';
import { TypesIncomes } from '../../../shared/constants/incomes.enum';
import { UserName } from '../../../shared/constants/userNames.enum';
import { NewUsers } from '../../../shared/models/users.model';
import { Filters } from '../../../shared/constants/filters';
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

  constructor(private filterDataService: FilterDataService) {}

  public ngOnInit(): void {

    this.subscriptions.push(
      combineLatest(this.filterDataService.currentMessageListCoasts, this.filterDataService.currentMessageListIncomes)
        .subscribe(([dataCoasts, dataIncomes]) => {
          let food: number,
              rent: number,
              child: number,
              gym: number,
              required: number,
              clothes: number,
              petrol: number,
              present: number,
              other: number,
              optional: number;

          if (dataCoasts.length) {
            food = this.filterDataService.filter(dataCoasts, RequiredCoasts.FOOD, Filters.byType);
            rent = this.filterDataService.filter(dataCoasts, RequiredCoasts.RENT, Filters.byType);
            child = this.filterDataService.filter(dataCoasts, RequiredCoasts.CHILD, Filters.byType);
            gym = this.filterDataService.filter(dataCoasts, RequiredCoasts.GYM, Filters.byType);

            clothes = this.filterDataService.filter(dataCoasts, OptionalCoasts.CLOTHES, Filters.byType);
            petrol = this.filterDataService.filter(dataCoasts, OptionalCoasts.PETROL, Filters.byType);
            present = this.filterDataService.filter(dataCoasts, OptionalCoasts.PRESENT, Filters.byType);
            other = this.filterDataService.filter(dataCoasts, OptionalCoasts.OTHER, Filters.byType);

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
            this.incomesTotal = null;

            this.users.forEach(user => {
              this.allUsers[user].total = null;
              this.typesIncomes.forEach(type => {

                const filterAuthor = this.filterDataService.filter(dataIncomes, user, Filters.byAuthor);
                this.allUsers[user][type] = this.filterDataService.filter(filterAuthor, type, Filters.byType);
              });

              this.allUsers[user].total = +_.sum(_.values(this.allUsers[user])).toFixed(2);
              this.incomesTotal += this.allUsers[user].total;
            });

            this.incomesTotal = +this.incomesTotal.toFixed(2);

          } else {
            this.users.forEach(user => {
              this.typesIncomes.forEach(type => {
                this.allUsers[user][type] = null;
              });

              this.allUsers[user].total = null;
              this.incomesTotal = null;
            });
          }

          if (this.coastsTotal || this.incomesTotal) {
            this.balanse = +(this.incomesTotal - this.coastsTotal).toFixed(2);
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
