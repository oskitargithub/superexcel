import { Component, Input, OnInit } from '@angular/core';
import { ClasProfesional1Service } from './ClasProfesional1.service';

import { FormArray, FormBuilder, FormGroup, Validators }                 from '@angular/forms';

import { DynamicFormComponent }         from '../../question/dynamic-form.component';
import { DynamicFormQuestionComponent } from '../../question/dynamic-form-question.component';

import { QuestionBase }     from '../../question/question-base';
import { TextboxQuestion }  from '../../question/question-textbox';
import { DobleTextQuestion }  from '../../question/question-dobletext';


import {InformacionBasicaModel, CentroActividad} from '../informacionbasica/informacionbasica.model';

@Component({    
    selector: 'clasprofesional',
    templateUrl: './clasprofesional1.template.html'
})
export class ClasProfesional1Component implements OnInit {   
    questions: QuestionBase<any>[];
    ifForm: FormGroup;
    
    constructor(
        private fb: FormBuilder,
        private ClasProfesional1Service: ClasProfesional1Service
    ) {    
        this.questions = [new TextboxQuestion({
                            key: 'firstName',
                            label: 'First name',
                            value: 'Bombasto',
                            required: true,
                            order: 1
                        })];
        this.createForm(); 
}

    ngOnInit() {           
        this.ClasProfesional1Service.getDatos()
            .subscribe(
                result => {
                    console.log(result.data);
                        this.ifForm = this.fb.group([{"razon_social":"mi empresa", "cif": "68484654F"}]); 
                        this.setCentroActividad([{"centro":"centro1", "actividad":"actividad1"},{"centro":"centro2", "actividad":"actividad2"}]);
                        
                        
                        
                        let mispreguntas: QuestionBase<any>[] = 
                        //this.datos = result;  
                        [
                            /*new TextboxQuestion({
                                key: result.data.id,
                                label: result.data.nombre,
                                value: result.data.valor,
                                required: false,
                                order: result.data.orden
                            }),*/
                            new TextboxQuestion({
                                key: 'razon_social',
                                label: 'Razon Social',
                                type: 'text',
                                value: 'mi empresatxtbox',
                                order: 1
                            }),
                            new TextboxQuestion({
                                key: 'cif',
                                label: 'Cif',
                                type: 'text',
                                value: '48523698F',
                                order: 2
                            }),
                            new DobleTextQuestion({
                                key: '27',
                                TituloGeneral: 'Centros/Actividades',
                                value: 'Centro',
                                label: 'Actividad',
                                order: 3,
                                centros_actividades: [{"centro":"centro1", "actividad":"actividad1"},{"centro":"centro2", "actividad":"actividad2"}],
                                options: [
                                   {key: 'centro1',  value: 'actividad1'},
                                   {key: 'centro2',  value: 'actividad2'}, 
                                ]
                            })];    

                        this.questions =   mispreguntas;                                    
                        //console.log(this.datos);
                },
                error => {
                    console.log(<any>error);                                            
                }
            );
    }
    createForm() {
        this.ifForm = this.fb.group({
            razon_social: '',
            cif: '',         
            centros_actividades: this.fb.array([])
        });
    }

    setCentroActividad(centros_actividades: CentroActividad[]){
     const addressFGs = centros_actividades.map(centroact => this.fb.group(centroact));
     const addressFormArray = this.fb.array(addressFGs);
     this.ifForm.setControl('centros_actividades', addressFormArray);
 }

 get centros_actividades(): FormArray {
    return this.ifForm.get('centros_actividades') as FormArray;
  };
}