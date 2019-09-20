import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { NewIncome } from '../income.model';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
import { MatDialog } from '@angular/material/dialog';

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
              private router: Router,
              private message: MatDialog) { }

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
    const newField: NewIncome = new NewIncome(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.who,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.dataService.updateFieldIncome(this.currentFieldEditId, newField).then(
      res => {
        const messageWindowRef = this.message.open(MessageWindowComponent, {
          panelClass: 'my-custom-container',
          data: {content: 'The income was changed successfully', class: 'success', time: 800}
        });

        messageWindowRef.afterClosed().subscribe(() => {
          this.router.navigate(['/incomes/all']);
        });
      },

      err => {
        const messageWindowRef = this.message.open(MessageWindowComponent, {
          panelClass: 'my-custom-container',
          data: {content: 'Error, the income was not changed', class: 'error', time: 800}
        });

        messageWindowRef.afterClosed().subscribe(() => {
          this.router.navigate(['/incomes/all']);
        });
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/incomes/all']);
  }
}
