import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NewUser } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authservice: AuthService) { }

  ngOnInit() {
    if (this.authservice.isLoggedIn()) {
      this.router.navigateByUrl('/main');
    } else {

      this.profileForm = this.fb.group({
        login: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  }

  get form() {
    return this.profileForm.controls;
  }

  signIn(): void {
    this.authservice.login(new NewUser(this.form.login.value, this.form.password.value)).subscribe(
      res => {
        this.authservice.setToken(res['token']);
        this.authservice.changeStatusLog(true);
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err)
        // this.authservice = err.error.message;
      }
    );
  }

  register(): void {
    this.authservice.register(new NewUser(this.form.name.value, this.form.password.value)).subscribe(
      res => {
        // this.authservice.setToken(res['token']);
        this.router.navigate(['/login']);
      },
      err => {
        this.authservice = err.error.message;
      }
    );
  }

}
