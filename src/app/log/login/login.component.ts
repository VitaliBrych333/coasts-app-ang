import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NewUser } from '../user.model';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

  profileForm: FormGroup = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authservice: AuthService,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (this.authservice.isLoggedIn()) {
      this.router.navigate(['/main']);
    } else {
      this.setForm();
    }
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
    this.subscriptions.push(
      this.authservice.login(new NewUser(this.form.login.value, this.form.password.value)).subscribe(
        res => {
          this.authservice.setToken(res['token']);
          this.authservice.changeStatusLog(true);
          this.router.navigate(['/main']);
        },
        err => {
          this.setForm();
          this.showMessageWindow('Your login or password is incorrect');
        }
      )
    );
  }

  // if need for regisration

  // register(): void {
  //   this.subscriptions.push(
  //     this.authservice.register(new NewUser(this.form.login.value, this.form.password.value)).subscribe(
  //       res => {
  //         this.showMessageWindow('Registration completed successfully. Now log in');
  //         this.router.navigate(['/login']);
  //       },
  //       err => {
  //         this.showMessageWindow('Duplicate login or registration error');
  //       }
  //     )
  //   );
  // }

  showMessageWindow(newContent: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalErrorComponent);
    let componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.content = newContent;

    setTimeout(() => {
                       componentRef.destroy();
                       componentRef = null;
                      }, 1500);
  }

  ngOnDestroy(): void {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }
}
