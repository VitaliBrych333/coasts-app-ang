import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { NewIncome } from '../income.model';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css'],
  providers: [ DatePipe ],
})

export class IncomeFormComponent implements OnInit {

  infoIncome: object;
  myDate = new Date().toString();
  formForValid: FormGroup;

  constructor(private datePipe: DatePipe,
              private router: Router,
              private dataService: DataService,
              private authService: AuthService,
              private message: MatDialog) {}

  ngOnInit() {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.infoIncome = {
      date: this.myDate,
      author: this.authService.getUserPayload().login,
      sum: null,
      type: null,
      other: null,
      who: null,
    };
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  add() {
    const newFieldIncome: NewIncome = new NewIncome(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.who,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.dataService.addFieldIncome(newFieldIncome).then(
      res => {
        const messageWindowRef = this.message.open(MessageWindowComponent, {
          panelClass: 'my-custom-container',
          data: {content: 'The income was saved successfully', class: 'success', time: 800}
        });

        messageWindowRef.afterClosed().subscribe(() => {
          this.router.navigate(['/main']);
        });
      },

      err => {
        const messageWindowRef = this.message.open(MessageWindowComponent, {
          panelClass: 'my-custom-container',
          data: {content: 'Error, the income was not saved', class: 'error', time: 800}
        });

        messageWindowRef.afterClosed().subscribe(() => {
          this.router.navigate(['/main']);
        });
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/main']);
  }
}
