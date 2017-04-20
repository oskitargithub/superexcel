import 'messenger/build/js/messenger.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { Retribuciones2Component } from './retribuciones2.component';
import { AuthGuard } from '../../auth/auth-guard.service';

export const routes = [
  { path: '', component: Retribuciones2Component,canDeactivate: [AuthGuard],canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            FormsModule,
            ReactiveFormsModule, 
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ Retribuciones2Component ]
})
export class Retribuciones2Module {
  static routes = routes;
}