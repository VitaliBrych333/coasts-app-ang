import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NewUser } from '../user.model';

import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
import { MatDialog } from '@angular/material/dialog';

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
              private message: MatDialog) { }

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
        this.message.open(MessageWindowComponent, {
          panelClass: 'my-custom-container',
          data: {content: 'Your login or password is incorrect', class: 'error', time: 1200}
        });
      }
    );
  }

  // if need for regisration

  // register(): void {
  //   this.authservice.register(new NewUser(this.form.login.value, this.form.password.value)).then(
  //     res => {
  //       const messageWindowRef = this.message.open(MessageWindowComponent, {
  //         panelClass: 'my-custom-container',
  //         data: {content: 'Registration completed successfully. Now log in', class: 'success', time: 1200}
  //       });

  //       messageWindowRef.afterClosed().subscribe(() => {
  //         this.router.navigate(['/login']);
  //       });
  //     },
  //     err => {
  //       const messageWindowRef = this.message.open(MessageWindowComponent, {
  //         panelClass: 'my-custom-container',
  //         data: { content: 'Duplicate login or registration error', class: 'error', time: 1200}
  //       });

  //       messageWindowRef.afterClosed().subscribe(() => {
  //         this.router.navigate(['/login']);
  //       });
  //     }
  //   );
  // }
}
