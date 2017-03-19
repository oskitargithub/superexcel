import { Component, ViewEncapsulation, Injector, OnInit} from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClasProfesional2Service } from './ClasProfesional2.service';
import { ClasProfesional2Model,Tabla3Model } from './ClasProfesional2.model';

declare var jQuery: any;
declare var Messenger: any;

@Component({    
    selector: 'clasprofesional2',
    templateUrl: './clasprofesional2.template.html',
    styleUrls: [ '../../forms/elements/elements.style.scss','../../ui-elements/notifications/notifications.style.scss' ],
    providers: [ClasProfesional2Service],
    encapsulation: ViewEncapsulation.None,
})
export class ClasProfesional2Component implements OnInit {   
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = {color: '#f0b518'};    
    submitted = false;
    ifForm: FormGroup;

    public clasprofesional2: ClasProfesional2Model;
    public errorMessage: string;
	public status: string;
    
    constructor(
        private fb: FormBuilder,
        private clasprofesional2service: ClasProfesional2Service, 
        injector: Injector
    ) {
        this.createForm(); 
        this.getClasProfesional2();


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
    getClasProfesional2(){
        this.clasprofesional2service.getClasProfesional2()
			.subscribe(
				response => {
                    console.log("datos formu");
                        this.ifForm.setControl('data',this.fb.group(response.data)); 
                        console.log("datos preg3");
                        this.setPreg14(response.preg_14_tabla_3); 
                        this.setPreg15(response.preg_15_tabla_3);
                        this.setPreg16(response.preg_16_tabla_3);
                        this.setPreg17(response.preg_17_tabla_3);
                        this.setPreg18(response.preg_18_tabla_3);
                        this.setPreg19(response.preg_19_tabla_3);


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

    createForm() {
        console.log("creando formulario");
        this.ifForm = this.fb.group({
            preg_14_tabla_3: this.fb.array([])
        });
        console.log("fin creando formulario");
    }
    ngOnInit(): void {
      Messenger.options = { theme: 'air' };
    }

    get data():FormArray {
        return this.ifForm.get('data') as FormArray;
    };

    get preg_14_tabla_3(): FormArray {
        return this.ifForm.get('preg_14_tabla_3') as FormArray;
    };
   
    get preg_15_tabla_3(): FormArray {
        return this.ifForm.get('preg_15_tabla_3') as FormArray;
    };
    get preg_16_tabla_3(): FormArray {
        return this.ifForm.get('preg_16_tabla_3') as FormArray;
    };
    get preg_17_tabla_3(): FormArray {
        return this.ifForm.get('preg_17_tabla_3') as FormArray;
    };
    get preg_18_tabla_3(): FormArray {
        return this.ifForm.get('preg_18_tabla_3') as FormArray;
    };
    get preg_19_tabla_3(): FormArray {
        return this.ifForm.get('preg_19_tabla_3') as FormArray;
    };
   
   

    addFila(elemento:FormArray){
        elemento.push(this.fb.group(new Tabla3Model()));
    }
    removeFila(elemento:FormArray, i : number){
        elemento.removeAt(i);
    }

   
    setPreg14(preg_14_tabla_3: Tabla3Model[]){
     const addressFGs = preg_14_tabla_3.map(datos => this.fb.group(datos));
     const addressFormArray = this.fb.array(addressFGs);
     this.ifForm.setControl('preg_14_tabla_3', addressFormArray);
    }
    setPreg15(preg_15_tabla_3: Tabla3Model[]){
     const addressFGs = preg_15_tabla_3.map(datos => this.fb.group(datos));
     const addressFormArray = this.fb.array(addressFGs);
     this.ifForm.setControl('preg_15_tabla_3', addressFormArray);
    }
    setPreg16(preg_16_tabla_3: Tabla3Model[]){
     const addressFGs = preg_16_tabla_3.map(datos => this.fb.group(datos));
     const addressFormArray = this.fb.array(addressFGs);
     this.ifForm.setControl('preg_16_tabla_3', addressFormArray);
    }
    setPreg17(preg_17_tabla_3: Tabla3Model[]){
     const addressFGs = preg_17_tabla_3.map(datos => this.fb.group(datos));
     const addressFormArray = this.fb.array(addressFGs);
     this.ifForm.setControl('preg_17_tabla_3', addressFormArray);
    }
    setPreg18(preg_18_tabla_3: Tabla3Model[]){
     const addressFGs = preg_18_tabla_3.map(datos => this.fb.group(datos));
     const addressFormArray = this.fb.array(addressFGs);
     this.ifForm.setControl('preg_18_tabla_3', addressFormArray);
    }
    setPreg19(preg_19_tabla_3: Tabla3Model[]){
     const addressFGs = preg_19_tabla_3.map(datos => this.fb.group(datos));
     const addressFormArray = this.fb.array(addressFGs);
     this.ifForm.setControl('preg_19_tabla_3', addressFormArray);
    }


    onSubmit(){
        this.clasprofesional2 = this.preparaParaGuardar();
        console.log(this.clasprofesional2);

    }
    preparaParaGuardar(): ClasProfesional2Model {
        const formModel = this.ifForm.value;
        const preg14Copy: Tabla3Model[] = formModel.preg_14_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg15Copy: Tabla3Model[] = formModel.preg_15_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg16Copy: Tabla3Model[] = formModel.preg_16_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg17Copy: Tabla3Model[] = formModel.preg_17_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg18Copy: Tabla3Model[] = formModel.preg_18_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg19Copy: Tabla3Model[] = formModel.preg_19_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        
        
        const saveClasProfesional2: ClasProfesional2Model = {
            user_id: 0,
            id: 1,
            preg_14_tabla_3: preg14Copy,
            preg_15_tabla_3: preg15Copy,
            preg_16_tabla_3: preg16Copy,
            preg_17_tabla_3: preg17Copy,
            preg_18_tabla_3: preg18Copy,
            preg_19_tabla_3: preg19Copy
        };
        return saveClasProfesional2;
    }
}