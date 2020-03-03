import { Component, Input, OnChanges, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NewCoast } from '../../shared/models/coast.model';
import { RequiredCoasts, OptionalCoasts } from '../../shared/constants/coasts.enum';

@Component({
  selector: 'app-coast-form-field',
  templateUrl: './coast-form-field.component.html',
  styleUrls: ['./coast-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoastFormFieldComponent implements OnChanges {

  @Input() newField: NewCoast;
  @Output() validForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public listCategory: Array<string> = _.concat(_.values(RequiredCoasts) as any, _.values(OptionalCoasts));

  public field: FormGroup = new FormGroup({
    date: new FormControl(),
    sum: new FormControl(),
    author: new FormControl(),
    type: new FormControl(),
    other: new FormControl(),
  });

  public dataMin = `${new Date().getFullYear().toString()}` + '-01-01';
         dataMax = `${new Date().getFullYear().toString()}` + '-12-31';

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe) {}

  public ngOnChanges(): void {
    const date = this.datePipe.transform(this.newField.date, 'yyyy-MM-dd');

    this.field = this.fb.group({
      date: [date, Validators.required],
      sum: [this.newField.sum, [Validators.required, Validators.min(0.01)]],
      author: [this.newField.author, Validators.required],
      type: [this.newField.type, Validators.required],
      other: [this.newField.other],
    });

    this.validForm.emit(this.field);
  }
}
