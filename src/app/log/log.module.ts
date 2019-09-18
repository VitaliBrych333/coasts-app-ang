import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MessageWindowComponent } from '../shared/message-window/message-window.component';
@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ MessageWindowComponent ],
  exports: [ LoginComponent ]
})
export class LogModule { }
