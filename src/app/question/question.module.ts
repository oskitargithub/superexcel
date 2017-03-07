import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';

import { DynamicFormComponent }         from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

import { QuestionControlService } from './question-control.service';
import { TooltipModule } from 'ng2-bootstrap';

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule,TooltipModule.forRoot(), ],
  declarations: [ DynamicFormComponent, DynamicFormQuestionComponent ],
  providers: [ QuestionControlService ],
  exports: [ DynamicFormComponent, DynamicFormQuestionComponent ],
})
export class QuestionModule {
  }