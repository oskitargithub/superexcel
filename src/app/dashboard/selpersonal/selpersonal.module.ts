import 'messenger/build/js/messenger.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { SelPersonalComponent } from './selpersonal.component';
import { Autosize } from 'angular2-autosize';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { MdCheckboxModule } from '@angular2-material/checkbox';

export const routes = [
  { path: '', component: SelPersonalComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            MdRadioModule,
            MdCheckboxModule,
            FormsModule,
            ReactiveFormsModule, 
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ Autosize,SelPersonalComponent ],
  providers: [MdUniqueSelectionDispatcher]
})
export class SelPersonalModule {
  static routes = routes;
}