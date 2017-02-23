import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule } from '@angular/router';
import { IntroduccionComponent } from './introduccion.component.ts';

export const routes = [
  { path: '', component: IntroduccionComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes) ],
  declarations: [ IntroduccionComponent ]
})
export class IntroduccionModule {
  static routes = routes;
}
