import 'messenger/build/js/messenger.js';
import 'chart.js/src/chart.js'

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TooltipModule, AccordionModule } from 'ng2-bootstrap';
import { RetribucionesPrAdm2Component } from './retribucionespradm2.component';
import { ChartModule } from 'angular2-highcharts';


export const routes = [
  { path: '', component: RetribucionesPrAdm2Component, pathMatch: 'full' }
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
  declarations: [RetribucionesPrAdm2Component]
})
export class RetribucionesPrAdm2Module {
  static routes = routes;
}