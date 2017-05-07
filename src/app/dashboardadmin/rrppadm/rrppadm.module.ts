import 'messenger/build/js/messenger.js';
import 'chart.js/src/chart.js'

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TooltipModule, AccordionModule } from 'ng2-bootstrap';
import { RRPPAdmComponent } from './rrppadm.component';
import { ChartModule } from 'angular2-highcharts';


export const routes = [
  { path: '', component: RRPPAdmComponent, pathMatch: 'full' }
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
  declarations: [RRPPAdmComponent]
})
export class RRPPAdmModule {
  static routes = routes;
}