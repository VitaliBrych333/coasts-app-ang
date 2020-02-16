import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState, selectRegistrState } from '../../store/state/app.states';
import { LogIn } from '../../store/actions/auth.actions';
import { RegIn } from '../../store/actions/registr.actions';
import { AuthState } from '../../store/reducers/auth.reducer';
import { RegistrState } from '../../store/reducers/registr.reducer';
import { AuthService } from '../../services/auth.service';
import { Url } from '../../shared/constants/url.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {

  public profileForm: FormGroup = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  public getStateAuth: Observable<object>;
         getStateRegistr: Observable<object>;

  protected readonly subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private authservice: AuthService,
              private store: Store<AppState>) { }

  public ngOnInit(): void {
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
      this.router.navigate([Url.MAIN]);
    }
  }

  public ngOnDestroy(): void {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  public setForm(): void {
    this.profileForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public signIn(): void {
    this.store.dispatch(new LogIn({ login: this.form.login.value, password: this.form.password.value }));
  }

  // if need the regisration

  public register(): void {
    this.store.dispatch(new RegIn({ login: this.form.login.value, password: this.form.password.value }));
  }

  private get form(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }
}
