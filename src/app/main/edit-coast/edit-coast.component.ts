import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { NewCoast } from '../coast.model';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-coast',
  templateUrl: './edit-coast.component.html',
  styleUrls: ['./edit-coast.component.css'],
  providers: [ DatePipe ]
})

export class EditCoastComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

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
              private router: Router,
              private message: MatDialog) {}

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

  ngOnDestroy() {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  save(): void {
    const newField: NewCoast = new NewCoast(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.dataService.updateField(this.currentFieldEditId, newField).then(
      res => {
        const messageWindowRef = this.message.open(MessageWindowComponent, {
          panelClass: 'my-custom-container',
          data: {content: 'The purchase was changed successfully', class: 'success', time: 800}
        });

        this.subscriptions.push(
          messageWindowRef.afterClosed().subscribe(() => {
            this.router.navigate(['/purchases/all']);
          })
        );
      },

      err => {
        const messageWindowRef = this.message.open(MessageWindowComponent, {
          panelClass: 'my-custom-container',
          data: {content: 'Error, the purchase was not changed', class: 'error', time: 800}
        });

        this.subscriptions.push(
          messageWindowRef.afterClosed().subscribe(() => {
            this.router.navigate(['/purchases/all']);
          })
        );
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/purchases/all']);
  }
}
