import 'messenger/build/js/messenger.js';
import { AuthGuard } from '../../auth/auth-guard.service';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { ClasProfesional2PrComponent } from './clasprofesional2pr.component';


export const routes = [
  { path: '', component: ClasProfesional2PrComponent,canDeactivate: [AuthGuard],canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            FormsModule,
            ReactiveFormsModule, 
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ ClasProfesional2PrComponent ]
})
export class ClasProfesional2PrModule {
  static routes = routes;
}
