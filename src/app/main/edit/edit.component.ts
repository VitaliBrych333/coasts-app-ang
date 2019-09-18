import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { NewField } from '../field.model';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NewContent } from '../../shared/content-model';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
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
              private router: Router,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) { }

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
    const newField: NewField = new NewField(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.dataService.updateField(this.currentFieldEditId, newField).then(
      res => {
        this.showMessageWindow({content: 'The purchase was changed successfully', class: 'success'})
          .then(() => this.router.navigate(['/purchases/all']));
      },

      err => {
        this.showMessageWindow({content: 'Error, the purchase was not changed', class: 'error'})
          .then(() => this.router.navigate(['/purchases/all']));
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/purchases/all']);
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
