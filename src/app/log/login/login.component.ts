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
        name: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  }

  get form() {
    return this.profileForm.controls;
  }

  submit(): void {
    this.authservice.login(new NewUser(this.form.name.value, this.form.password.value)).subscribe(
      res => {
        this.authservice.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
      },
      err => {
        this.authservice = err.error.message;
      }
    );
    // localStorage.setItem('userName', this.profileForm.value.name);

    // this.authservice.changeStatusLog(true);
    // this.router.navigate(['/main'])
  }

}
