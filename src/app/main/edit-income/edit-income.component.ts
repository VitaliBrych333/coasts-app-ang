import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { NewIncome } from '../income.model';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.css'],
  providers: [ DatePipe ]
})
export class EditIncomeComponent implements OnInit {

  listCategory: Array<string> = ['food', 'rent', 'clothes', 'child', 'petrol', 'present', 'gym', 'other'];
  editFieldIncome: object = {
    date: null,
    sum: null,
    who: null,
    author: null,
    type: null,
    other: null
  };

  formForValid: FormGroup;
  currentFieldEditId: string = this.router.url.slice(9);

  constructor(private dataService: DataService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.dataService.getFieldIncomeId(this.currentFieldEditId).then(editFieldIncome => {
      this.editFieldIncome = {
        date: editFieldIncome.date,
        sum: editFieldIncome.sum,
        who: editFieldIncome.who,
        author: editFieldIncome.author,
        type: editFieldIncome.type,
        other: editFieldIncome.other
      };
    });
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  save(): void {
    let newField: NewIncome = new NewIncome(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.who,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.dataService.updateFieldIncome(this.currentFieldEditId, newField).then(() => this.router.navigate(['/incomes/all']));
  }

  cancel(): void {
    this.router.navigate(['/incomes/all']);
  }
}
