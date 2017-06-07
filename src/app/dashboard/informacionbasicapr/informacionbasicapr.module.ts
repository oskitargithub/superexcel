import 'messenger/build/js/messenger.js';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { InformacionBasicaPrComponent } from './informacionbasicapr.component';
import { DatepickerModule } from 'ng2-bootstrap';
import { MomentModule } from 'angular2-moment';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { AuthGuard } from '../../auth/auth-guard.service';

export const routes = [
  { path: '', component: InformacionBasicaPrComponent, pathMatch: 'full' }
];

@NgModule({
 imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    MdRadioModule,
    MdCheckboxModule,
    DatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(routes)],
  declarations: [InformacionBasicaPrComponent],
  providers: [ MdUniqueSelectionDispatcher]
})
export class InformacionBasicaPrModule {
  static routes = routes;
}