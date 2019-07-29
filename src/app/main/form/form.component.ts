import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';

import { NewField } from '../field.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ DatePipe ],
})

export class FormComponent implements OnInit {

  infoBuy: object;
  listCategory: Array<string> = ['food', 'rent', 'clothes', 'child', 'petrol', 'present', 'gym', 'other'];

  myDate = new Date().toString();

  formForValid: FormGroup;

  constructor(private datePipe: DatePipe,
              private fb: FormBuilder,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.infoBuy = {
      date: this.myDate,
      author: localStorage.getItem('userName'),
      price: null,
      type: null,
      other: null,
    }
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  add() {
    let newField: NewField = new NewField(
      this.formForValid.value.date,
      this.formForValid.value.price,
      this.formForValid.value.type,
      localStorage.getItem('userName'),
      this.formForValid.value.other
    );

    this.dataService.addField(newField).subscribe();
    this.router.navigate(['/main'])
  }

  cancel(): void {
    this.router.navigate(['/main'])
  }

}


