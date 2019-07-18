import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  onSubmit() {

  }

  ngOnInit() {


    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

}
