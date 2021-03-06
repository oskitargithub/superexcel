import 'messenger/build/js/messenger.js';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { PromoCarreraPrComponent } from './promocarrerapr.component';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { AuthGuard } from '../../auth/auth-guard.service';
export const routes = [
  { path: '', component: PromoCarreraPrComponent,canDeactivate: [AuthGuard],canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdRadioModule,
    MdCheckboxModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes)],
  providers: [MdUniqueSelectionDispatcher],
  declarations: [PromoCarreraPrComponent]
})
export class PromoCarreraPrModule {
  static routes = routes;
}