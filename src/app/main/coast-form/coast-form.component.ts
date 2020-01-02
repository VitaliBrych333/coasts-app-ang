import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NewCoast } from '../coast.model';
import { NewContent } from '../../shared/content-model';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
import { AppState, selectCoastState } from '../../store/state/app.states';
import { CoastState } from '../../store/reducers/coast.reducer';
import { AddCoast, ClearStateCoast } from '../../store/actions/coast.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-coast-form',
  templateUrl: './coast-form.component.html',
  styleUrls: ['./coast-form.component.scss'],
  providers: [ DatePipe ],
})

export class CoastFormComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

  infoBuy: object;
  myDate = new Date().toString();
  formForValid: FormGroup;
  getStateCoast: Observable<object>;

  constructor(private datePipe: DatePipe,
              private router: Router,
              private authService: AuthService,
              private message: MatDialog,
              private store: Store<AppState>) {}

  ngOnInit() {
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
              this.router.navigate(['/main']);
            })
          );
        }
      }),
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearStateCoast());
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  add() {
    const newField: NewCoast = new NewCoast(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.store.dispatch(new AddCoast({ newCoast: newField }));
  }

  cancel(): void {
    this.router.navigate(['/main']);
  }
}


