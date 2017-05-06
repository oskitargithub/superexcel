import 'messenger/build/js/messenger.js';
import 'chart.js/src/chart.js'

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TooltipModule, AccordionModule } from 'ng2-bootstrap';
import { ConciliacionAdmComponent } from './conciliacionadm.component';
import { ChartModule } from 'angular2-highcharts';

export const routes = [
  { path: '', component: ConciliacionAdmComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule,
    ChartModule.forRoot(
      require('highcharts'),
      require('highcharts/modules/exporting'),
      require('highcharts/highcharts-3d')),
    AccordionModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(routes)],
  declarations: [ConciliacionAdmComponent]
})
export class ConciliacionAdmModule {
  static routes = routes;
}