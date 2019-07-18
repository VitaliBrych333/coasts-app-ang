import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) { }

  onSubmit() {

  }

  ngOnInit() {

    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  login(): void {
    this.router.navigate(['/main'])
  }

}
