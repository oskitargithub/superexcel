
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertModule, TooltipModule } from 'ng2-bootstrap';
import { ButtonsModule, DropdownModule, PaginationModule  } from 'ng2-bootstrap';
import { DataTableModule } from 'angular2-datatable';

import 'jquery.animate-number/jquery.animateNumber.js';
import 'jQuery-Mapael/js/jquery.mapael.js';
import 'jQuery-Mapael/js/maps/usa_states';
import 'bootstrap_calendar/bootstrap_calendar/js/bootstrap_calendar.js';
import 'messenger/build/js/messenger.js';

import { DashboardAdmin } from './dashboardadmin.component.ts';
import { WidgetModule } from '../layout/widget/widget.module';
import { UtilsModule } from '../layout/utils/utils.module';
import { RickshawChartModule } from '../components/rickshaw/rickshaw.module';

import 'parsleyjs';
import 'parsleyjs/dist/i18n/es.js';

import {DashBoardAdminService} from "./dashboardadmin.service";

import { Ng2TableModule } from 'ng2-table';
import { SearchPipe } from './pipes/search-pipe';

export const routes = [
  { path: '', component: DashboardAdmin, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(routes),
    ButtonsModule.forRoot(),
    DropdownModule.forRoot(),
    PaginationModule.forRoot(),
    WidgetModule,
    UtilsModule,
    Ng2TableModule,
    DataTableModule,
    RickshawChartModule
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    DashboardAdmin,
    SearchPipe
  ],
  providers: [DashBoardAdminService]
})
export class DashboardAdminModule {
  static routes = routes;
}
