import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NewContent } from '../../shared/content-model';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';

import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { NewField } from '../field.model';
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
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {}

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
        this.showMessageWindow({content: 'The purchase was saved successfully', class: 'success'})
          .then(() => this.router.navigate(['/main']));
      },

      err => {
        this.showMessageWindow({content: 'Error, the purchase was not saved', class: 'error'})
          .then(() => this.router.navigate(['/main']));
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/main']);
  }

  showMessageWindow(newContent: NewContent): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageWindowComponent);
      let componentRef = this.viewContainerRef.createComponent(componentFactory);

      componentRef.instance.content = newContent.content;
      componentRef.instance.myClass = newContent.class;

      setTimeout(() => {
                        componentRef.destroy();
                        componentRef = null;
                        resolve();
                      }, 800);
      });

    return promise;
  }
}


