import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import { LogModule } from './log/log.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingScreenInterceptor } from './core/loading-screen/loading.interceptor';
import { AuthInterceptor } from './log/auth/auth.interceptor';

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { RegistrEffects } from './store/effects/registr.effects';
import { CoastEffects } from './store/effects/coast.effects';
// import { CoursesEffects } from './store/effects/courses.effects';
import { reducerAuth } from './store/reducers/auth.reducer';
import { reducerRegistr } from './store/reducers/registr.reducer';
import { reducerCoast } from './store/reducers/coast.reducer';
// import { reducerCoursesList } from './store/reducers/courses.reducers';
import { AppState } from './store/state/app.states';

export const appReducers: ActionReducerMap<AppState, any> = {
  authState: reducerAuth,
  registrState: reducerRegistr,
  coastState: reducerCoast,
  // coursesState: reducerCoursesList
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    LogModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([AuthEffects, RegistrEffects, CoastEffects
      // CoursesEffects
     ]),
    FlexLayoutModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingScreenInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})

export class AppModule {}
