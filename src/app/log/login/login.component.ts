import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  onSubmit() {

  }

  ngOnInit() {

    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  login(): void {
    localStorage.setItem('userName', this.profileForm.value.name);

    this.authservice.changeStatusLog(true);
    this.router.navigate(['/main'])
  }

}
