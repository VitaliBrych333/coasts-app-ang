import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { MessageWindowComponent } from '../shared/components/message-window/message-window.component';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  entryComponents: [ MessageWindowComponent ],
  exports: [ LoginComponent ],
})

export class LogModule { }
