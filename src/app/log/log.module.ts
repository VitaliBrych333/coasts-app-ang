import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalErrorComponent } from './modal-error/modal-error.component';

@NgModule({
  declarations: [ LoginComponent, ModalErrorComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  entryComponents: [ ModalErrorComponent ],
  exports: [ LoginComponent ]
})
export class LogModule { }
