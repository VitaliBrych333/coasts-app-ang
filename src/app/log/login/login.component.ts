import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState, selectRegistrState } from '../../store/state/app.states';
import { LogIn } from '../../store/actions/auth.actions';
import { RegIn } from '../../store/actions/registr.actions';
import { Observable } from 'rxjs/Observable';
import { AuthState } from '../../store/reducers/auth.reducers';
import { RegistrState } from '../../store/reducers/registr.reducers';
import * as _ from 'lodash';

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

  getStateAuth: Observable<object>;
  getStateRegistr: Observable<object>;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authservice: AuthService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.getStateAuth = this.store.select(selectAuthState);
    this.getStateRegistr = this.store.select(selectRegistrState);

    this.subscriptions.push(
      this.getStateAuth.subscribe((state: AuthState) => {
        if (state.errorMessage) {
          this.setForm();
        }
      }),

      this.getStateRegistr.subscribe((state: RegistrState) => {
        if (state.errorMessage) {
          this.setForm();
        }
      })
    );

    if (this.authservice.isLoggedIn()) {
      this.router.navigate(['/main']);
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

  signIn(): void {
    this.store.dispatch(new LogIn({ login: this.form.login.value, password: this.form.password.value }));
  }

  // if need the regisration

  register(): void {
    this.store.dispatch(new RegIn({ login: this.form.login.value, password: this.form.password.value }));
  }

  private get form() {
    return this.profileForm.controls;
  }
}
