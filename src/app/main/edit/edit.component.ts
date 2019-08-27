import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NewField } from '../field.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DataService, DatePipe]
})
export class EditComponent implements OnInit, OnDestroy {

  listCategory: Array<string> = ['food', 'rent', 'clothes', 'child', 'petrol', 'present', 'gym', 'other'];
  editField: object = {
    date: null,
    sum: null,
    author: null,
    type: null,
    other: null
  };

  formForValid: FormGroup;
  currentFieldEditId: string = this.router.url.slice(11);

  subscriptionGetFieldId: ISubscription;

  constructor(private dataService: DataService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private router: Router,) { }

  ngOnInit() {
    this.subscriptionGetFieldId = this.dataService.getFieldId(this.currentFieldEditId).subscribe(editField => {

      this.editField = {
        date: editField.date,
        sum: editField.sum,
        author: editField.author,
        type: editField.type,
        other: editField.other
      };
    });
  }

  ngOnDestroy() {
    this.subscriptionGetFieldId.unsubscribe();
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  save(): void {
    let newField: NewField = new NewField(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.type,
      localStorage.getItem('userName'),
      this.formForValid.value.other
    );

    this.dataService.updateField(this.currentFieldEditId, newField).subscribe(() =>
      this.router.navigate(['/purchases/all'])
    );
  }

  cancel(): void {
    this.router.navigate(['/purchases/all']);
  }


}
