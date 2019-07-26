import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsComponent } from './buttons/buttons.component';
import { NoContentComponent } from './no-content/no-content.component';
import { FieldListComponent } from './field-list/field-list.component';
import { MatTableModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { EditComponent } from './edit/edit.component';
import { ButtonMenuComponent } from './button-menu/button-menu.component';
import { FormFieldComponent } from './form-field/form-field.component';





@NgModule({
  declarations: [ FormComponent, ButtonsComponent, NoContentComponent, FieldListComponent, ModalDialogComponent, EditComponent, ButtonMenuComponent, FormFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  entryComponents: [ ModalDialogComponent ],
  exports: [ FormComponent, NoContentComponent ]
})
export class MainModule { }
