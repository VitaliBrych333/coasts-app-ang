import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './log/login/login.component';
import { FormComponent } from './main/form/form.component';
import { IncomeFormComponent } from './main/income-form/income-form.component';
import { ButtonsComponent } from './main/buttons/buttons.component';
import { NoContentComponent } from './main/no-content/no-content.component';
import { FieldListComponent } from './main/field-list/field-list.component';
import { IncomesListComponent } from './main/incomes-list/incomes-list.component';
import { EditComponent } from './main/edit/edit.component';
import { EditIncomeComponent } from './main/edit-income/edit-income.component';
import { StatisticsComponent } from './main/statistics/statistics.component';
import { GraphsComponent } from './main/graphs/graphs.component';
import { AuthGuard } from './log/auth/auth.guard';

const routes: Routes = [
  { path: 'purchases/new', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'incomes/new', component: IncomeFormComponent, canActivate: [AuthGuard] },
  { path: 'purchases/all', component: FieldListComponent, canActivate: [AuthGuard] },
  { path: 'incomes/all', component: IncomesListComponent, canActivate: [AuthGuard] },
  { path: 'purchases/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'incomes/:id', component: EditIncomeComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'graphs', component: GraphsComponent, canActivate: [AuthGuard] },
  { path: 'main', component: ButtonsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', component: NoContentComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
