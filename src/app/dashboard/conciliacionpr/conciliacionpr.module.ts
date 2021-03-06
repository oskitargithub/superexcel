import 'messenger/build/js/messenger.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { ConciliacionPrComponent } from './conciliacionpr.component';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { AuthGuard } from '../../auth/auth-guard.service';

export const routes = [
  { path: '', component: ConciliacionPrComponent,canDeactivate: [AuthGuard],canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            FormsModule,
            ReactiveFormsModule,  
            MdRadioModule,           
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  providers: [MdUniqueSelectionDispatcher],
  declarations: [ ConciliacionPrComponent ]
})
export class ConciliacionPrModule {
  static routes = routes;
  
}