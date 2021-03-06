import { Component, Input, OnChanges, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NewIncome } from '../../shared/models/income.model';
import { TypesIncomes } from '../../shared/constants/incomes.enum';
import { UserName } from '../../shared/constants/userNames.enum';

@Component({
  selector: 'app-income-form-field',
  templateUrl: './income-form-field.component.html',
  styleUrls: ['./income-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class IncomeFormFieldComponent implements OnChanges {

  @Input() newFieldIncome: NewIncome;
  @Output() validForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public types: string[] = _.values(TypesIncomes);
         persons: string[] = [...UserName];
         fieldIncome: FormGroup;

  public dataMin = `${new Date().getFullYear().toString()}` + '-01-01';
         dataMax = `${new Date().getFullYear().toString()}` + '-12-31';

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe) {}

  public ngOnChanges(): void {
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
