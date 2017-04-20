import 'messenger/build/js/messenger.js';
import { AuthGuard } from '../../auth/auth-guard.service';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { ClasProfesional2Component } from './clasprofesional2.component';


export const routes = [
  { path: '', component: ClasProfesional2Component,canDeactivate: [AuthGuard],canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            FormsModule,
            ReactiveFormsModule, 
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ ClasProfesional2Component ]
})
export class ClasProfesional2Module {
  static routes = routes;
}
