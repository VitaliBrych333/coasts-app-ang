import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';

import { Field } from '../field.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ DatePipe,
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => FormComponent),
  //     multi: true
  // },
  // {
  //   provide: NG_VALIDATORS,
  //   useExisting: forwardRef(() => MultipleDemoComponent),
  //   multi: true,
  // }
 ],

})

export class FormComponent implements OnInit {

  infoBuy: FormGroup;
  listCategory: Array<string> = ['food', 'rent', 'clothes', 'child', 'petrol', 'present', 'gym', 'other'];

  myDate = new Date().toString();
  dataMin = `${new Date().getFullYear().toString()}` + '-01-01';
  dataMax = `${new Date().getFullYear().toString()}` + '-12-31';

  constructor(private datePipe: DatePipe,
              private fb: FormBuilder,
              private router: Router,
              private dataService: DataService ) { }

  ngOnInit() {

    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    this.infoBuy = this.fb.group({
      date: [this.myDate, Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      type: ['', Validators.required],
      other: [''],
    })
  }

  add() {
    let newField: Field = {
      id: 2121,
      date: this.infoBuy.value.date,
      price: this.infoBuy.value.price,
      type: this.infoBuy.value.type,
      other: this.infoBuy.value.other,
      author: localStorage.getItem('userName'),
    }

    this.dataService.sendData(newField);
    this.router.navigate(['/main'])
  }

  cancel(): void {
    this.router.navigate(['/main'])
  }

}


