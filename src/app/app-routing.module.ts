import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './log/login/login.component';
import { FormComponent } from './main/form/form.component';
import { ButtonsComponent } from './main/buttons/buttons.component'

const routes: Routes = [
  { path: 'purchases/new', component: FormComponent },
  { path: 'main', component: ButtonsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  // { path: '**', component: NoContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
