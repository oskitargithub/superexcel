import 'messenger/build/js/messenger.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { ClasProfesional1Component } from './clasprofesional1.component';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio';

export const routes = [
  { path: '', component: ClasProfesional1Component, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            FormsModule,
            ReactiveFormsModule, 
            MdRadioModule,
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ ClasProfesional1Component ],
  providers: [ MdUniqueSelectionDispatcher]
})
export class ClasProfesional1Module {
  static routes = routes;
}
