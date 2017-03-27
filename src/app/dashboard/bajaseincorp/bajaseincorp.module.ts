import 'messenger/build/js/messenger.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { BajasEIncorpComponent } from './bajaseincorp.component';


export const routes = [
  { path: '', component: BajasEIncorpComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            FormsModule,
            ReactiveFormsModule, 
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ BajasEIncorpComponent ]
})
export class BajasEIncorpModule {
  static routes = routes;
}