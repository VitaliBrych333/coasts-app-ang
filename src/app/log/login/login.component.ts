import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NewUser } from '../user.model';
import { NewContent } from '../../shared/content-model';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
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
    this.authservice.login(new NewUser(this.form.login.value, this.form.password.value)).then(
      res => {
        this.authservice.setToken(res['token']);
        this.authservice.changeStatusLog(true);
        this.router.navigate(['/main']);
      },
      err => {
        this.setForm();
        this.showMessageWindow({content: 'Your login or password is incorrect', class: 'error'});
      }
    );
  }

  // if need for regisration

  // register(): void {
  //   this.authservice.register(new NewUser(this.form.login.value, this.form.password.value)).then(
  //     res => {
  //       this.showMessageWindow({content: 'Registration completed successfully. Now log in', class: 'success'})
  //         .then(() => this.router.navigate(['/login']));
  //     },
  //     err => {
  //       this.showMessageWindow({content: 'Duplicate login or registration error', class: 'error'})
  //         .then(() => this.router.navigate(['/login']));
  //     }
  //   );
  // }

  showMessageWindow(newContent: NewContent): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageWindowComponent);
      let componentRef = this.viewContainerRef.createComponent(componentFactory);

      componentRef.instance.content = newContent.content;
      componentRef.instance.myClass = newContent.class;

      setTimeout(() => {
                        componentRef.destroy();
                        componentRef = null;
                        resolve();
                      }, 1200);
      });

    return promise;
  }
}
