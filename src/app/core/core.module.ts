import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AuthService } from '../services/auth.service'

@NgModule({
  declarations: [ HeaderComponent ],
  imports: [
    CommonModule
  ],
  exports: [ HeaderComponent ],
  providers: [ AuthService ]
})
export class CoreModule { }
