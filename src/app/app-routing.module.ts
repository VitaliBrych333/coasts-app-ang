import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './log/login/login.component';
import { CoastFormComponent } from './main/coast-form/coast-form.component';
import { IncomeFormComponent } from './main/income-form/income-form.component';
import { ButtonsComponent } from './main/buttons/buttons.component';
import { NoContentComponent } from './main/no-content/no-content.component';
import { CoastsListComponent } from './main/coasts-list/coasts-list.component';
import { IncomesListComponent } from './main/incomes-list/incomes-list.component';
import { EditCoastComponent } from './main/edit-coast/edit-coast.component';
import { EditIncomeComponent } from './main/edit-income/edit-income.component';
import { StatisticsComponent } from './main/statistics/statistics.component';
import { GraphsComponent } from './main/graphs/graphs.component';
import { AuthGuard } from './log/auth/auth.guard';

const routes: Routes = [
  { path: 'purchases/new', component: CoastFormComponent, canActivate: [AuthGuard] },
  { path: 'incomes/new', component: IncomeFormComponent, canActivate: [AuthGuard] },
  { path: 'purchases/all', component: CoastsListComponent, canActivate: [AuthGuard] },
  { path: 'incomes/all', component: IncomesListComponent, canActivate: [AuthGuard] },
  { path: 'purchases/:id', component: EditCoastComponent, canActivate: [AuthGuard] },
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
