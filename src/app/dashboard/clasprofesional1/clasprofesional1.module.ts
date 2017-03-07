import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ClasProfesional1Component } from './clasprofesional1.component';


import { QuestionModule } from '../../question/question.module';

import { ClasProfesional1Service } from './ClasProfesional1.service';

export const routes = [
  { path: '', component: ClasProfesional1Component, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule, QuestionModule, RouterModule.forChild(routes) ],
  declarations: [ ClasProfesional1Component ],
  providers: [ ClasProfesional1Service ]
})
export class ClasProfesional1Module {
  static routes = routes;
}
