import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsComponent } from './buttons/buttons.component';

@NgModule({
  declarations: [ FormComponent, ButtonsComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ FormComponent ]
})
export class MainModule { }
