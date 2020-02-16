import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageWindowComponent } from './components/message-window/message-window.component';

@NgModule({
  declarations: [ MessageWindowComponent ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [ CommonModule, MessageWindowComponent ]
})

export class SharedModule { }
