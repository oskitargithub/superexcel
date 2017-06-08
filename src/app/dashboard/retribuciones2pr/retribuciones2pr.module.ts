import 'messenger/build/js/messenger.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { Retribuciones2PrComponent } from './retribuciones2pr.component';
import { AuthGuard } from '../../auth/auth-guard.service';
import { Autosize } from 'angular2-autosize';

export const routes = [
  { path: '', component: Retribuciones2PrComponent,canDeactivate: [AuthGuard],canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            FormsModule,
            ReactiveFormsModule, 
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ Retribuciones2PrComponent ]
})
export class Retribuciones2PrModule {
  static routes = routes;
}