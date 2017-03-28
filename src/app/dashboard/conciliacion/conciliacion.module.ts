import 'messenger/build/js/messenger.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { ConciliacionComponent } from './conciliacion.component';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio';


export const routes = [
  { path: '', component: ConciliacionComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            FormsModule,
            ReactiveFormsModule,  
            MdRadioModule,           
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  providers: [MdUniqueSelectionDispatcher],
  declarations: [ ConciliacionComponent ]
})
export class ConciliacionModule {
  static routes = routes;
  
}