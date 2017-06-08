import 'messenger/build/js/messenger.js';
import { AuthGuard } from '../../auth/auth-guard.service';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { SelPersonalPrComponent } from './selpersonalpr.component';
import { Autosize } from 'angular2-autosize';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { MdCheckboxModule } from '@angular2-material/checkbox';

export const routes = [
  { path: '', component: SelPersonalPrComponent,canDeactivate: [AuthGuard],canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, 
            MdRadioModule,
            MdCheckboxModule,
            FormsModule,
            ReactiveFormsModule, 
            TooltipModule.forRoot(),
            RouterModule.forChild(routes) ],
  declarations: [ Autosize,SelPersonalPrComponent ],
  providers: [MdUniqueSelectionDispatcher]
})
export class SelPersonalPrModule {
  static routes = routes;
}