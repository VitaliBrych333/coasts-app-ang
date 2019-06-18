import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log('jjijjjjjjjjjj');
  }
  constructor() {}

  ngOnInit() {
  }

}
