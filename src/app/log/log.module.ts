import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MessageWindowComponent } from '../shared/message-window/message-window.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../store/effects/auth.effects';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    EffectsModule.forRoot([AuthEffects,
      // CoursesEffects
    ]),
  ],
  entryComponents: [ MessageWindowComponent ],
  exports: [ LoginComponent ],
  // providers: [AuthEffects]
})

export class LogModule { }
