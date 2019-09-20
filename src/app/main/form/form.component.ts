import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { NewField } from '../field.model';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ DatePipe ],
})

export class FormComponent implements OnInit {

  infoBuy: object;
  myDate = new Date().toString();
  formForValid: FormGroup;

  constructor(private datePipe: DatePipe,
              private router: Router,
              private dataService: DataService,
              private authService: AuthService,
              private message: MatDialog) {}

  ngOnInit() {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.infoBuy = {
      date: this.myDate,
      author: this.authService.getUserPayload().login,
      sum: null,
      type: null,
      other: null,
    };
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  add() {
    const newField: NewField = new NewField(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.dataService.addField(newField).then(
      res => {
        const messageWindowRef = this.message.open(MessageWindowComponent, {
          panelClass: 'my-custom-container',
          data: {content: 'The purchase was saved successfully', class: 'success', time: 800}
        });

        messageWindowRef.afterClosed().subscribe(() => {
          this.router.navigate(['/main']);
        });
      },

      err => {
        const messageWindowRef = this.message.open(MessageWindowComponent, {
          panelClass: 'my-custom-container',
          data: {content: 'Error, the purchase was not saved', class: 'error', time: 800}
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


