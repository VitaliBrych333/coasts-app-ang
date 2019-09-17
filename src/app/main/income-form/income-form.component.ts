import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { NewIncome } from '../income.model';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css'],
  providers: [ DatePipe ],
})
export class IncomeFormComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

  infoIncome: object;
  myDate = new Date().toString();
  formForValid: FormGroup;

  constructor(private datePipe: DatePipe,
              private fb: FormBuilder,
              private router: Router,
              private dataService: DataService,
              private authService: AuthService) { }

  ngOnInit() {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.infoIncome = {
      date: this.myDate,
      author: this.authService.getUserPayload().login,
      sum: null,
      type: null,
      other: null,
      who: null,
    };
  }

  ngOnDestroy() {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  add() {
    let newFieldIncome: NewIncome = new NewIncome(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.who,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.subscriptions.push(
      this.dataService.addFieldIncome(newFieldIncome).subscribe()
    );

    this.router.navigate(['/main']);
  }

  cancel(): void {
    this.router.navigate(['/main']);
  }
}
