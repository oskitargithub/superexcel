import 'messenger/build/js/messenger.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { PRLLComponent } from './prll.component';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio';

export const routes = [
  { path: '', component: PRLLComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            FormsModule,
            ReactiveFormsModule, 
            MdRadioModule,
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ PRLLComponent ],
  providers: [MdUniqueSelectionDispatcher]
})
export class PRLLModule {
  static routes = routes;
}