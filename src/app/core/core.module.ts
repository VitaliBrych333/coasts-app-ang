import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AuthService } from '../services/auth.service';
import { FooterComponent } from './footer/footer.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

@NgModule({
  declarations: [ HeaderComponent, FooterComponent, LoadingScreenComponent, ],
  imports: [
    CommonModule
  ],
  exports: [ HeaderComponent, FooterComponent, LoadingScreenComponent ],
  providers: [ AuthService ]
})

export class CoreModule {}
