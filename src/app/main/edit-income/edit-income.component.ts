import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectIncomeState } from '../../store/state/app.states';
import { IncomeState } from '../../store/reducers/income.reducer';
import { LoadIncomeById, UpdateIncome, ClearStateIncome } from '../../store/actions/income.actions';
import { AuthService } from '../../services/auth.service';
import { NewIncome } from '../income.model';
import { NewContent } from '../../shared/content-model';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.scss'],
  providers: [ DatePipe ]
})

export class EditIncomeComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

  //listCategory: Array<string> = ['food', 'rent', 'clothes', 'child', 'petrol', 'present', 'gym', 'other'];
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
  getStateIncome: Observable<object>;

  constructor(private authService: AuthService,
              private router: Router,
              private message: MatDialog,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.getStateIncome = this.store.select(selectIncomeState);

    this.subscriptions.push(
      this.getStateIncome.subscribe((state: IncomeState) => {
        if (state.incomeById) {
          const editFieldIncome = Object.assign({}, state.incomeById);

          this.editFieldIncome = {
            date: editFieldIncome.date,
            sum: editFieldIncome.sum,
            who: editFieldIncome.who,
            author: editFieldIncome.author,
            type: editFieldIncome.type,
            other: editFieldIncome.other
          };
        }

        if (state.errorMessage || state.isAdded) {
          let settingMessage: NewContent;

          if (state.errorMessage) {
            settingMessage = { content: 'Error, the income was not changed', class: 'error', time: 800 };
          } else {
            settingMessage = { content: 'The income was changed successfully', class: 'success', time: 800 };
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

    this.store.dispatch(new LoadIncomeById({ Id: this.currentFieldEditId }));
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearStateIncome());
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  save(): void {
    const newField: NewIncome = new NewIncome(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.who,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.store.dispatch(new UpdateIncome({ Id: this.currentFieldEditId, newValueIncome: newField }));
  }

  cancel(): void {
    this.router.navigate(['/incomes/all']);
  }
}
