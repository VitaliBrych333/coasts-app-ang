import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { NewIncome } from '../income.model';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NewContent } from '../../shared/content-model';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
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
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) { }

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
        this.showMessageWindow({content: 'The income was changed successfully', class: 'success'})
          .then(() => this.router.navigate(['/incomes/all']));
      },

      err => {
        this.showMessageWindow({content: 'Error, the income was not changed', class: 'error'})
          .then(() => this.router.navigate(['/incomes/all']));
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/incomes/all']);
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
