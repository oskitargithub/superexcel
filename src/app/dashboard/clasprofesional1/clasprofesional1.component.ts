import { Component, ViewEncapsulation, Injector, OnInit} from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClasProfesional1Service } from './ClasProfesional1.service';
import { ClasProfesional1Model, Tabla3Model } from './ClasProfesional1.model';

declare var jQuery: any;
declare var Messenger: any;

@Component({    
    selector: 'clasprofesional',
    templateUrl: './clasprofesional1.template.html',
    styleUrls: [ '../../forms/elements/elements.style.scss','../../ui-elements/notifications/notifications.style.scss' ],
    providers: [ClasProfesional1Service],
    encapsulation: ViewEncapsulation.None,
})
export class ClasProfesional1Component implements OnInit {   
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = {color: '#f0b518'};    
    submitted = false;
    ifForm: FormGroup;

    public clasprofesional1: ClasProfesional1Model;
    public errorMessage: string;
	public status: string;
    
    constructor(
        private fb: FormBuilder,
        private clasprofesional1service: ClasProfesional1Service, 
        injector: Injector
    ) {
        this.createForm(); 
        this.getClasProfesional1();


    //
    // This is a hack on angular style loader to prevent ng2-select2 from adding its styles.
    // They are hard-coded into the component, so there are no other way to get rid of them
    //
        this.domSharedStylesHost = injector.get(__platform_browser_private__.DomSharedStylesHost);
        this.domSharedStylesHost.__onStylesAdded__ = this.domSharedStylesHost.onStylesAdded;
        this.domSharedStylesHost.onStylesAdded = (additions) => {
            const style = additions[0];
            if (!style || !style.trim().startsWith('.select2-container')) {
                    this.domSharedStylesHost.__onStylesAdded__(additions);
            }
        };
  
    }

    getClasProfesional1(){
        this.clasprofesional1service.getClasProfesional1()
			.subscribe(
				response => {
                        this.ifForm = this.fb.group(response.data); 
                        this.setTablaDpto(response.preg_3_tabla_3); 						                      
						this.status = response.status;
						if(this.status !== "success"){
							if(this.status == "tokenerror"){
                                 Messenger().post({
                                    message: 'Ha ocurrido un error de token.' + this.errorMessage,
                                    type: 'error',
                                    showCloseButton: true
                                });
                            }
                            else{
                                Messenger().post({
                                    message: 'Ha ocurrido un error cargando los datos.' + this.errorMessage,
                                    type: 'error',
                                    showCloseButton: true
                                });
                            }
						}
                        else{
                            Messenger().post({
                                message: 'Los datos han sido cargados correctamente',
                                type: 'success',
                                showCloseButton: true
                            });
                        }
				},
				error => {
					this.errorMessage = <any>error;
					if(this.errorMessage !== null){
                                          
                        Messenger().post({
                            message: 'Ha ocurrido un error en la petición.' + this.errorMessage,
                            type: 'error',
                            showCloseButton: true
                        });
					
					}
				});		
    }

    getTotalMujeres(elemento : FormArray){
        return elemento.value.map(c=>c.mujeres).reduce((sum,current) => (sum*1)+(current*1));
    }
    getTotalHombres(elemento : FormArray){
        return elemento.value.map(c=>c.hombres).reduce((sum,current) => (sum*1)+(current*1));
    }
    getTotalTotal(elemento : FormArray){
        let hombres = elemento.value.map(c=>c.hombres).reduce((sum,current) => (sum*1)+(current*1));
        let mujeres = elemento.value.map(c=>c.mujeres).reduce((sum,current) => (sum*1)+(current*1));
        return (hombres*1 + mujeres*1);
    }

    /*
    getTotalMujeres(){
        return this.preg_3_tabla_3.value.map(c=>c.mujeres).reduce((sum,current) => (sum*1)+(current*1));
    }*/

    createForm() {
        this.ifForm = this.fb.group({
            preg_5: '0',
            preg_6: '0',
            preg_3_tabla_3: this.fb.array([])
            });
    }
    ngOnInit(): void {
      Messenger.options = { theme: 'air' };
    }

    get preg_3_tabla_3(): FormArray {
        return this.ifForm.get('preg_3_tabla_3') as FormArray;
    };
   

    addFila(elemento:FormArray){
        elemento.push(this.fb.group(new Tabla3Model()));
    }
    removeFila(elemento:FormArray, i : number){
        elemento.removeAt(i);
    }

    setTablaDpto(preg_3_tabla_3: Tabla3Model[]){
     const addressFGs = preg_3_tabla_3.map(dptos => this.fb.group(dptos));
     const addressFormArray = this.fb.array(addressFGs);
     this.ifForm.setControl('preg_3_tabla_3', addressFormArray);
 }
}