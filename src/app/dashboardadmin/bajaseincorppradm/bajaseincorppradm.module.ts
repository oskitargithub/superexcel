import 'messenger/build/js/messenger.js';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TooltipModule, AccordionModule } from 'ng2-bootstrap';
import { BajasEIncorpPrAdmComponent } from './bajaseincorppradm.component';
import { ChartModule } from 'angular2-highcharts';
import {OrderByPipe} from './orderby.pipe';

export const routes = [
  { path: '', component: BajasEIncorpPrAdmComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule,
    ChartModule.forRoot(
      require('highcharts'),
      require('highcharts/modules/exporting'),
      require('highcharts/highcharts-3d')),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(routes)],
  declarations: [BajasEIncorpPrAdmComponent,OrderByPipe]
})
export class BajasEIncorpPrAdmModule {
  static routes = routes;
}