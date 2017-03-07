import 'messenger/build/js/messenger.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';

import { RouterModule } from '@angular/router';

import { TooltipModule } from 'ng2-bootstrap';

import { InformacionBasicaComponent } from './informacionbasica.component';


/*import { InformacionBasicaService } from './informacionbasica.service';*/

export const routes = [
  { path: '', component: InformacionBasicaComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            FormsModule,
            ReactiveFormsModule, 
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ InformacionBasicaComponent  ] ,
  providers: [ /*InformacionBasicaService*/ ]
})
export class InformacionBasicaModule {
  static routes = routes;
}