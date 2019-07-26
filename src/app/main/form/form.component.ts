import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';

import { NewField } from '../field.model';


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

  infoBuy: object;
  listCategory: Array<string> = ['food', 'rent', 'clothes', 'child', 'petrol', 'present', 'gym', 'other'];

  myDate = new Date().toString();
  dataMin = `${new Date().getFullYear().toString()}` + '-01-01';
  dataMax = `${new Date().getFullYear().toString()}` + '-12-31';

  constructor(private datePipe: DatePipe,
              private fb: FormBuilder,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {

    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    this.infoBuy = {
      date: this.myDate,
      price: null,
      type: null,
      other: null,
    }
  }

  add() {
    let newField: NewField = new NewField(
      2121,
      this.infoBuy.value.date,
      this.infoBuy.value.price,
      this.infoBuy.value.type,
      localStorage.getItem('userName'),
      this.infoBuy.value.other
    );

    this.dataService.addField(newField).subscribe();

    this.router.navigate(['/main'])
  }

  cancel(): void {
    this.router.navigate(['/main'])
  }

}


