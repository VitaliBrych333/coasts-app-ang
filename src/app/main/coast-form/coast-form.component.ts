import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { AppState, selectCoastState } from '../../store/state/app.states';
import { CoastState } from '../../store/reducers/coast.reducer';
import { AddCoast, ClearStateCoast } from '../../store/actions/coast.actions';
import { AuthService } from '../../services/auth.service';
import { NewCoast } from '../../shared/models/coast.model';
import { NewContent } from '../../shared/models/content.model';
import { MessageWindowComponent } from '../../shared/components/message-window/message-window.component';
import { Url } from '../../shared/constants/url.enum';

@Component({
  selector: 'app-coast-form',
  templateUrl: './coast-form.component.html',
  styleUrls: ['./coast-form.component.scss'],
  providers: [ DatePipe ]
})

export class CoastFormComponent implements OnInit, OnDestroy {

  public getStateCoast: Observable<object>;
         infoBuy: object;
         formForValid: FormGroup;

  protected readonly subscriptions: Subscription[] = [];

  private myDate = new Date().toString();

  constructor(private datePipe: DatePipe,
              private router: Router,
              private authService: AuthService,
              private message: MatDialog,
              private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.getStateCoast = this.store.select(selectCoastState);
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    this.infoBuy = {
      date: this.myDate,
      author: this.authService.getUserPayload().login,
      sum: null,
      type: null,
      other: null,
    };

    this.subscriptions.push(
      this.getStateCoast.subscribe((state: CoastState) => {
        if (state.errorMessage || state.isAdded) {
          let settingMessage: NewContent;

          if (state.errorMessage) {
            settingMessage = { content: 'Error, the purchase was not saved', class: 'error', time: 800 };
          } else {
            settingMessage = { content: 'The purchase was saved successfully', class: 'success', time: 800 };
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
    this.store.dispatch(new ClearStateCoast());
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  public validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  public add(): void {
    const valueForm = this.formForValid.value;
    const newField: NewCoast = new NewCoast(
      valueForm.date,
      valueForm.sum,
      valueForm.type,
      this.authService.getUserPayload().login,
      valueForm.other
    );

    this.store.dispatch(new AddCoast({ newCoast: newField }));
  }

  public cancel(): void {
    this.router.navigate([Url.MAIN]);
  }
}
