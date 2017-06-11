import 'messenger/build/js/messenger.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { BajasEIncorpPrComponent } from './bajaseincorppr.component';
import { AuthGuard } from '../../auth/auth-guard.service';

export const routes = [
  { path: '', component: BajasEIncorpPrComponent,canDeactivate: [AuthGuard],canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            FormsModule,
            ReactiveFormsModule, 
            MdRadioModule,
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ BajasEIncorpPrComponent ],
  providers: [ MdUniqueSelectionDispatcher]
})
export class BajasEIncorpPrModule {
  static routes = routes;
}