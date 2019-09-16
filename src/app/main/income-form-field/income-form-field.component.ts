import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewIncome } from '../income.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-income-form-field',
  templateUrl: './income-form-field.component.html',
  styleUrls: ['./income-form-field.component.css']
})

export class IncomeFormFieldComponent implements OnChanges {
  @Input() newFieldIncome: NewIncome;
  @Output() validForm = new EventEmitter<FormGroup>();

  types: string[] = ['salary', 'sick leave', 'child benefit', 'gift', 'holiday pay'];
  persons: string[] = ['Vitali', 'Nastya'];
  fieldIncome: FormGroup;

  dataMin = `${new Date().getFullYear().toString()}` + '-01-01';
  dataMax = `${new Date().getFullYear().toString()}` + '-12-31';

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe) {}

  ngOnChanges() {
    const date = this.datePipe.transform(this.newFieldIncome.date, 'yyyy-MM-dd');

    this.fieldIncome = this.fb.group({
      date: [date, Validators.required],
      sum: [this.newFieldIncome.sum, [Validators.required, Validators.min(0.01)]],
      who: [this.newFieldIncome.who, Validators.required],
      author: [this.newFieldIncome.author, Validators.required],
      type: [this.newFieldIncome.type, Validators.required],
      other: [this.newFieldIncome.other],
    });

    this.validForm.emit(this.fieldIncome);
  }
}
