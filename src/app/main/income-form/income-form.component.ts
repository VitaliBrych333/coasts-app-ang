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
import { NewIncome } from '../../shared/models/income.model';
import { NewContent } from '../../shared/models/content.model';
import { MessageWindowComponent } from '../../shared/components/message-window/message-window.component';
import { Url } from '../../shared/constants/url.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
  providers: [ DatePipe ]
})

export class IncomeFormComponent implements OnInit, OnDestroy {

  public infoIncome: object;
         getStateIncome: Observable<object>;

  protected readonly subscriptions: Subscription[] = [];

  private myDate = new Date().toString();
  private formForValid: FormGroup;

  constructor(private datePipe: DatePipe,
              private router: Router,
              private authService: AuthService,
              private message: MatDialog,
              private store: Store<AppState>) {}

  public ngOnInit(): void {
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

  public ngOnDestroy(): void {
    this.store.dispatch(new ClearStateIncome());
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  public validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  public add(): void {
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

  public cancel(): void {
    this.router.navigate([Url.MAIN]);
  }
}
