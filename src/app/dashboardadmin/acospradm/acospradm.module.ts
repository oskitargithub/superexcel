import 'messenger/build/js/messenger.js';
import 'chart.js/src/chart.js'

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule } from '@angular/router';
import { TooltipModule, AccordionModule } from 'ng2-bootstrap';
import { AcosPRAdmComponent } from './acospradm.component';
import { ChartsModule } from 'ng2-charts';


export const routes = [
  { path: '', component: AcosPRAdmComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            ChartsModule,
            AccordionModule.forRoot(),
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ AcosPRAdmComponent ]
})
export class AcosPRAdmModule {
  static routes = routes;
}