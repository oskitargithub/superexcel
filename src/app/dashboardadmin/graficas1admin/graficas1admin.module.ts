import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { RouterModule } from '@angular/router';

import { JqSparklineModule } from '../../components/sparkline/sparkline.module';

import { Graficas1AdminComponent } from './graficas1admin.component';

import { Graficas1AdminService } from './graficas1admin.service';

export const routes = [
  { path: '', component: Graficas1AdminComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ 
    JqSparklineModule,
    CommonModule, FormsModule, RouterModule.forChild(routes) ],
  declarations: [ Graficas1AdminComponent ],
  providers: [ Graficas1AdminService ]
})
export class Graficas1AdminModule {
  static routes = routes;
}