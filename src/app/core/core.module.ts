import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AuthService } from '../services/auth.service';
import { FooterComponent } from './footer/footer.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ HeaderComponent, FooterComponent, LoadingScreenComponent, ],
  imports: [
    SharedModule
  ],
  exports: [ HeaderComponent, FooterComponent, LoadingScreenComponent ],
  providers: [ AuthService ]
})

export class CoreModule {}
