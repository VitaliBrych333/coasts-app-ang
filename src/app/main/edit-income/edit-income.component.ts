import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectIncomeState } from '../../store/state/app.states';
import { IncomeState } from '../../store/reducers/income.reducer';
import { LoadIncomeById, UpdateIncome, ClearStateIncome } from '../../store/actions/income.actions';
import { AuthService } from '../../services/auth.service';
import { NewIncome } from '../../shared/models/income.model';
import { NewContent } from '../../shared/models/content.model';
import { MessageWindowComponent } from '../../shared/components/message-window/message-window.component';
import { Url } from '../../shared/constants/url.enum';

@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.scss'],
  providers: [ DatePipe ]
})

export class EditIncomeComponent implements OnInit, OnDestroy {

  //public listCategory: Array<string> = ['food', 'rent', 'clothes', 'child', 'petrol', 'present', 'gym', 'other'];
  public editFieldIncome: object = {
    date: null,
    sum: null,
    who: null,
    author: null,
    type: null,
    other: null
  };

  public formForValid: FormGroup;
         getStateIncome: Observable<object>;

  protected readonly subscriptions: Subscription[] = [];

  private currentFieldEditId: string = this.activatedRouter.snapshot.paramMap.get('id');

  constructor(private authService: AuthService,
              private activatedRouter: ActivatedRoute,
              private router: Router,
              private message: MatDialog,
              private store: Store<AppState>) {}

  public ngOnInit(): void {
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

  public ngOnDestroy(): void {
    this.store.dispatch(new ClearStateIncome());
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  public validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  public save(): void {
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

  public cancel(): void {
    this.router.navigate([Url.ALLINC]);
  }
}
