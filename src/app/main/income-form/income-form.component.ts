import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { AppState, selectIncomeState } from '../../store/state/app.states';
import { IncomeState } from '../../store/reducers/income.reducer';
import { AddIncome, ClearStateIncome } from '../../store/actions/income.actions';
import { NewIncome } from '../income.model';
import { NewContent } from '../../shared/content-model';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
import { AuthService } from '../../services/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
  providers: [ DatePipe ],
})

export class IncomeFormComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

  infoIncome: object;
  myDate = new Date().toString();
  formForValid: FormGroup;
  getStateIncome: Observable<object>;

  constructor(private datePipe: DatePipe,
              private router: Router,
              private authService: AuthService,
              private message: MatDialog,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.getStateIncome = this.store.select(selectIncomeState);
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    this.infoIncome = {
      date: this.myDate,
      author: this.authService.getUserPayload().login,
      sum: null,
      type: null,
      other: null,
      who: null,
    };

    this.subscriptions.push(
      this.getStateIncome.subscribe((state: IncomeState) => {
        if (state.errorMessage || state.isAdded) {
          let settingMessage: NewContent;

          if (state.errorMessage) {
            settingMessage = { content: 'Error, the income was not saved', class: 'error', time: 800 };
          } else {
            settingMessage = { content: 'The income was saved successfully', class: 'success', time: 800 };
          }

          const messageWindowRef = this.message.open(MessageWindowComponent, {
            panelClass: 'my-custom-container',
            data: settingMessage
          });

          this.subscriptions.push(
            messageWindowRef.afterClosed().subscribe(() => {
              this.cancel();
            })
          );
        }
      }),
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearStateIncome());
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  add() {
    const newFieldIncome: NewIncome = new NewIncome(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.who,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.store.dispatch(new AddIncome({ newIncome: newFieldIncome }));
  }

  cancel(): void {
    this.router.navigate(['/main']);
  }
}
