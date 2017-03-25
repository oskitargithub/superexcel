import 'messenger/build/js/messenger.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';

/*import 'ng2-datetime/src/vendor/bootstrap-datepicker/bootstrap-datepicker.min.js';
import 'ng2-datetime/src/vendor/bootstrap-timepicker/bootstrap-timepicker.min.js';*/
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { RouterModule } from '@angular/router';

import { TooltipModule } from 'ng2-bootstrap';

import { InformacionBasicaPrComponent } from './informacionbasicapr.component';


/*import { InformacionBasicaService } from './informacionbasica.service';*/

export const routes = [
  { path: '', component: InformacionBasicaPrComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            FormsModule,
            NKDatetimeModule,
            ReactiveFormsModule, 
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ InformacionBasicaPrComponent  ] ,
  providers: [ /*InformacionBasicaService*/ ]
})
export class InformacionBasicaPrModule {
  static routes = routes;
}