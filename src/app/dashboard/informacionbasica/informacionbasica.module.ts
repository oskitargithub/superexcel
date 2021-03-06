import 'messenger/build/js/messenger.js';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { InformacionBasicaComponent } from './informacionbasica.component';
import { DatepickerModule } from 'ng2-bootstrap';
import { MomentModule } from 'angular2-moment';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { AuthGuard } from '../../auth/auth-guard.service';

export const routes = [
  { path: '', component: InformacionBasicaComponent,canDeactivate: [AuthGuard],canActivate: [AuthGuard], pathMatch: 'full' }
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
  declarations: [InformacionBasicaComponent],
  providers: [ MdUniqueSelectionDispatcher]
})
export class InformacionBasicaModule {
  static routes = routes;
}