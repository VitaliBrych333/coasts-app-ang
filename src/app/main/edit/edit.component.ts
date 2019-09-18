import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { NewField } from '../field.model';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ DatePipe ]
})
export class EditComponent implements OnInit {

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

  constructor(private dataService: DataService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.dataService.getFieldId(this.currentFieldEditId).then(editField => {
      this.editField = {
        date: editField.date,
        sum: editField.sum,
        author: editField.author,
        type: editField.type,
        other: editField.other
      };
    });
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  save(): void {
    let newField: NewField = new NewField(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.dataService.updateField(this.currentFieldEditId, newField).then(() => this.router.navigate(['/purchases/all']));
  }

  cancel(): void {
    this.router.navigate(['/purchases/all']);
  }
}
