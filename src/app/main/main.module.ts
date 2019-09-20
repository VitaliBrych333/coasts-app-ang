import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsComponent } from './buttons/buttons.component';
import { NoContentComponent } from './no-content/no-content.component';
import { FieldListComponent } from './field-list/field-list.component';
import { MatTableModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { EditComponent } from './edit/edit.component';

import { FormFieldComponent } from './form-field/form-field.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { IncomeFormFieldComponent } from './income-form-field/income-form-field.component';
import { MatSelectModule } from '@angular/material/select';
import { IncomesListComponent } from './incomes-list/incomes-list.component';
import { EditIncomeComponent } from './edit-income/edit-income.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material';

import { NgSelectModule } from '@ng-select/ng-select';
import { ReportFormComponent } from './statistics/report-form/report-form.component';
import { FiltersComponent } from './statistics/filters/filters.component';
import { GraphsComponent } from './graphs/graphs.component';
import { ChartsModule } from 'ng2-charts';
import { SheduleComponent } from './graphs/shedule/shedule.component';
import { FilterGraphsComponent } from './graphs/filter-graphs/filter-graphs.component';

@NgModule({
  declarations: [ FormComponent,
                  ButtonsComponent,
                  NoContentComponent,
                  FieldListComponent,
                  ModalDialogComponent,
                  EditComponent,
                  FormFieldComponent,
                  IncomeFormComponent,
                  IncomeFormFieldComponent,
                  IncomesListComponent,
                  EditIncomeComponent,
                  StatisticsComponent,
                  ReportFormComponent,
                  FiltersComponent,
                  GraphsComponent,
                  SheduleComponent,
                  FilterGraphsComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgSelectModule,
    ChartsModule
  ],
  entryComponents: [ ModalDialogComponent ],
  exports: [ FormComponent, NoContentComponent, IncomeFormComponent ]
})

export class MainModule {}
