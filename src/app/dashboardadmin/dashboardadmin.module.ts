import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { DashboardAdmin } from './dashboardadmin.component.ts';
import { WidgetModule } from '../layout/widget/widget.module';
import {DashBoardAdminService} from "./dashboardadmin.service";
import { SearchPipe } from './pipes/search-pipe';
import { AlertModule, TooltipModule } from 'ng2-bootstrap';

import 'messenger/build/js/messenger.js';
import 'parsleyjs';
export const routes = [
  { path: '', component: DashboardAdmin, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(routes)
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
