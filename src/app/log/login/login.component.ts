import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NewUser } from '../user.model';

import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { Store, select } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/state/app.states'
import { LogIn, LogInFailure } from '../../store/actions/user.actions';
import { AuthEffects } from '../../store/effects/auth.effects';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

  profileForm: FormGroup = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authservice: AuthService,
              private message: MatDialog,
              private store: Store<AppState>) { this.getState = this.store.select(selectAuthState);}

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      if (this.errorMessage) {
        // this.store.dispatch(new LogInFailure({error: 'ffff'}));
        this.setForm();
        this.message.open(MessageWindowComponent, {
          panelClass: 'my-custom-container',
          data: {content: 'Your login or password is incorrect', class: 'error', time: 1200}
        });

      }
    });

    if (this.authservice.isLoggedIn()) {
      this.router.navigate(['/main']);
    } else {
      this.setForm();
    }
  }

  ngOnDestroy() {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  setForm() {
    this.profileForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form() {
    return this.profileForm.controls;
  }

  signIn(): void {
    this.store.dispatch(new LogIn(this.form));

    // this.setForm();
    // this.authservice.login(new NewUser(this.form.login.value, this.form.password.value)).then(
    //   res => {
    //     this.authservice.setToken(res['token']);
    //     this.authservice.changeStatusLog(true);
    //     this.router.navigate(['/main']);
    //   },

    //   err => {
    //     this.setForm();
    //     this.message.open(MessageWindowComponent, {
    //       panelClass: 'my-custom-container',
    //       data: {content: 'Your login or password is incorrect', class: 'error', time: 1200}
    //     });
    //   }
    // );
  }

  // if need the regisration

  // register(): void {
  //   this.authservice.register(new NewUser(this.form.login.value, this.form.password.value)).then(
  //     res => {
  //       const messageWindowRef = this.message.open(MessageWindowComponent, {
  //         panelClass: 'my-custom-container',
  //         data: {content: 'Registration completed successfully. Now log in', class: 'success', time: 1200}
  //       });

  //       this.subscriptions.push(
  //         messageWindowRef.afterClosed().subscribe(() => {
  //           this.router.navigate(['/login']);
  //         })
  //       );
  //     },

  //     err => {
  //       const messageWindowRef = this.message.open(MessageWindowComponent, {
  //         panelClass: 'my-custom-container',
  //         data: { content: 'Duplicate login or registration error', class: 'error', time: 1200}
  //       });

  //       this.subscriptions.push(
  //         messageWindowRef.afterClosed().subscribe(() => {
  //           this.router.navigate(['/login']);
  //         })
  //       );
  //     }
  //   );
  // }
}
