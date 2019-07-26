import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NewField } from '../field.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit, OnChanges {
  @Input() newField: NewField;
  @Output() validForm = new EventEmitter<FormGroup>();

  listCategory: Array<string> = ['food', 'rent', 'clothes', 'child', 'petrol', 'present', 'gym', 'other'];

  field = new FormGroup({
    date: new FormControl(),
    price: new FormControl(),
    author: new FormControl(),
    type: new FormControl(),
    other: new FormControl(),
  });

  dataMin = `${new Date().getFullYear().toString()}` + '-01-01';
  dataMax = `${new Date().getFullYear().toString()}` + '-12-31';

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit() { }

  ngOnChanges() {
    const date = this.datePipe.transform(this.newField.date, 'yyyy-MM-dd');

    this.field = this.fb.group({
      date: [date, Validators.required],
      price: [this.newField.price, [Validators.required, Validators.min(0.01)]],
      author: [this.newField.author, Validators.required],
      type: [this.newField.type, Validators.required],
      other: [this.newField.other],
    })

    // if(this.field.valid) {
      this.validForm.emit(this.field);
      
    // }


  }

}
