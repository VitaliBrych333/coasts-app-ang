import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { NewIncome } from '../income.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.css'],
  providers: [ DatePipe ]
})
export class EditIncomeComponent implements OnInit, OnDestroy {

  listCategory: Array<string> = ['food', 'rent', 'clothes', 'child', 'petrol', 'present', 'gym', 'other'];
  editFieldIncome: object = {
    date: null,
    sum: null,
    who: null,
    author: null,
    type: null,
    other: null
  };

  formForValid: FormGroup;
  currentFieldEditId: string = this.router.url.slice(9);

  subscriptionGetFieldIncomeId: ISubscription;

  constructor(private dataService: DataService,
              private authService: AuthService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private router: Router,) { }

  ngOnInit() {
    this.subscriptionGetFieldIncomeId = this.dataService.getFieldIncomeId(this.currentFieldEditId).subscribe(editFieldIncome => {

      this.editFieldIncome = {
        date: editFieldIncome.date,
        sum: editFieldIncome.sum,
        who: editFieldIncome.who,
        author: editFieldIncome.author,
        type: editFieldIncome.type,
        other: editFieldIncome.other
      };
    });
  }

  ngOnDestroy() {
    this.subscriptionGetFieldIncomeId.unsubscribe();
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  save(): void {
    let newField: NewIncome = new NewIncome(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.who,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.dataService.updateFieldIncome(this.currentFieldEditId, newField).subscribe(() =>
      this.router.navigate(['/incomes/all'])
    );
  }

  cancel(): void {
    this.router.navigate(['/incomes/all']);
  }
}
