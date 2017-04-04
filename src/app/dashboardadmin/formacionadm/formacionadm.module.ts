import 'messenger/build/js/messenger.js';
import 'chart.js/src/chart.js'

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule } from '@angular/router';
import { TooltipModule, AccordionModule } from 'ng2-bootstrap';
import { FormacionAdmComponent } from './formacionadm.component';
import { ChartsModule } from 'ng2-charts';


export const routes = [
  { path: '', component: FormacionAdmComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            ChartsModule,
            AccordionModule.forRoot(),
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ FormacionAdmComponent ]
})
export class FormacionAdmModule {
  static routes = routes;
}