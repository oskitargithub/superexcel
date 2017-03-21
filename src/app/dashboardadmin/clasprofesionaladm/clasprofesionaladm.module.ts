import 'messenger/build/js/messenger.js';
import 'chart.js/src/chart.js'

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule } from '@angular/router';
import { TooltipModule, AccordionModule } from 'ng2-bootstrap';
import { ClasProfesionalAdmComponent } from './clasprofesionaladm.component';
import { ChartsModule } from 'ng2-charts';


export const routes = [
  { path: '', component: ClasProfesionalAdmComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            ChartsModule,
            AccordionModule.forRoot(),
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ ClasProfesionalAdmComponent ]
})
export class ClasProfesionalAdmModule {
  static routes = routes;
}