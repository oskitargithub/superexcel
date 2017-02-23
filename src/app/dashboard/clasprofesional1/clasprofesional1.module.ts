import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ClasProfesional1Component } from './clasprofesional1.component';

import { ClasProfesional1Service } from './ClasProfesional1.service';

export const routes = [
  { path: '', component: ClasProfesional1Component, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule.forChild(routes) ],
  declarations: [ ClasProfesional1Component ],
  providers: [ ClasProfesional1Service ]
})
export class ClasProfesional1Module {
  static routes = routes;
}
