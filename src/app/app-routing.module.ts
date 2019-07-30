import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './log/login/login.component';
import { FormComponent } from './main/form/form.component';
import { IncomeFormComponent } from './main/income-form/income-form.component';
import { ButtonsComponent } from './main/buttons/buttons.component';
import { NoContentComponent } from './main/no-content/no-content.component';
import { FieldListComponent } from './main/field-list/field-list.component';
import { EditComponent } from './main/edit/edit.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'purchases/new', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'income/new', component: IncomeFormComponent, canActivate: [AuthGuard] },
  { path: 'purchases/all', component: FieldListComponent, canActivate: [AuthGuard] },
  { path: 'purchases/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'main', component: ButtonsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', component: NoContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
