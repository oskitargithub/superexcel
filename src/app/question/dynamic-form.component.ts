import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup, FormBuilder }                 from '@angular/forms';

import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() ifForm: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService,private fb: FormBuilder) {  }

  ngOnInit() {
    //this.ifForm = this.qcs.toFormGroup(this.questions);
    this.ifForm = this.fb.group( this.questions );           
  }

  

  onSubmit() {
    this.payLoad = JSON.stringify(this.ifForm.value);
  }
}