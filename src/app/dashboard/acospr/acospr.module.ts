import 'messenger/build/js/messenger.js';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { AcosPRComponent } from './acospr.component';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio';

export const routes = [
  { path: '', component: AcosPRComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdRadioModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes)],
  providers: [MdUniqueSelectionDispatcher],
  declarations: [AcosPRComponent]
})
export class AcosPRModule {
  static routes = routes;
}