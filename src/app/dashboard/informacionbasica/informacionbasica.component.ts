import { Component, ViewEncapsulation, Injector, OnInit} from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


import {InformacionBasicaModel, CentroActividad} from './informacionbasica.model';
import {InformacionBasicaService} from "./informacionbasica.service";

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'informacionbasica',
    templateUrl: './informacionbasica.template.html',
    styleUrls: [ '../../forms/elements/elements.style.scss','../../ui-elements/notifications/notifications.style.scss' ],
    providers: [InformacionBasicaService],
    encapsulation: ViewEncapsulation.None,
})
export class InformacionBasicaComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = {color: '#f0b518'};    
    submitted = false;
    ifForm: FormGroup;

    public informacionbasica: InformacionBasicaModel;
    public errorMessage: string;
	public status: string;
    
    constructor(
        private fb: FormBuilder,
        private informacionbasicaservice: InformacionBasicaService, 
        injector: Injector
    ) {
        this.createForm(); 
        this.getInformacionBasica();


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
    onSubmit2(){
        this.informacionbasica = this.preparaParaGuardar();
        console.log(this.informacionbasica);
    }
    onSubmit(model:InformacionBasicaModel) {    
        
        console.log(model); 
        /*this.submitted = true;
        console.log("formulario enviado"); 
        this.informacionbasicaservice.edit(this.informacionbasica)
        .subscribe(
				response => {
						//this.informacionbasica = response.data;
						this.status = response.status;
						if(this.status !== "success"){
							Messenger().post({
                            message: 'Ha ocurrido un error guardando los datos.' + this.errorMessage,
                            type: 'error',
                            showCloseButton: true
                        });
						}
                        else{
                            Messenger().post({
                            message: 'Los datos han sido guardados correctamente',
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
				});*/
    }

    createForm() {
        this.ifForm = this.fb.group({
        razon_social: '',
        cif: '',
         ambito: '',
         convenio: '',
         domicilio: '',
         web: '',
         personas: '',
         telefono: '',
         horario: '',
         email: '',
         dia: '',
         mes: '',
         anyo: '',
         desarrollaact: '',         
         denominacion: '',
         mujeres: 0,
         hombres: 0,
         bpoliticas1: false,
         bpoliticas2: false,
         bpoliticas3: false,
         bpoliticas4: false,
         bpoliticas5: false,
         centros_actividades: this.fb.array([])
        });
    }

    

  ngOnInit(): void {
      Messenger.options = { theme: 'air' };
     
    //jQuery('#markdown-editor').markdown();
    //jQuery('.js-slider').slider();
    //jQuery('#colorpicker').colorpicker(this.colorOptions);
    //jQuery('.selectpicker').selectpicker();
  }

 setCentroActividad(centros_actividades: CentroActividad[]){
     const addressFGs = centros_actividades.map(centroact => this.fb.group(centroact));
     const addressFormArray = this.fb.array(addressFGs);
     this.ifForm.setControl('centros_actividades', addressFormArray);
 }

 get centros_actividades(): FormArray {
    return this.ifForm.get('centros_actividades') as FormArray;
  };

  addCentroActividad() {
    this.centros_actividades.push(this.fb.group(new CentroActividad()));
  }

  removeCentroActividad(i:number){
      this.centros_actividades.removeAt(i);
  }


    getInformacionBasica(){
        this.informacionbasicaservice.getInformacionBasica()
			.subscribe(
				response => {
                        this.ifForm = this.fb.group(response.data); 
						this.setCentroActividad(response.centros_actividades);
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

    preparaParaGuardar(): InformacionBasicaModel {
        const formModel = this.ifForm.value;
    // deep copy of form model lairs
        const secretLairsDeepCopy: CentroActividad[] = formModel.centros_actividades.map(
        (centroact: CentroActividad) => Object.assign({}, centroact)
        );
    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveInformacionBasica: InformacionBasicaModel = {
        id: formModel.id,
        id_usuario: formModel.id_usuario,
        razon_social:formModel.razon_social,
        cif: formModel.cif,
        ambito: formModel.ambito,
        convenio: formModel.convenio,
        domicilio: formModel.domicilio,
        web: formModel.web,
        personas: formModel.personas,
        telefono: formModel.telefono,
        horario: formModel.horario,
        email: formModel.email,
        dia: formModel.dia,
        mes: formModel.mes,
        anyo: formModel.anyo,
        desarrollaact: formModel.desarrollaact,    
        denominacion: formModel.denominacion,
        mujeres: formModel.mujeres,
        hombres: formModel.hombres,
        bpoliticas1: formModel.bpoliticas1,
        bpoliticas2: formModel.bpoliticas2,
        bpoliticas3: formModel.bpoliticas3,
        bpoliticas4: formModel.bpoliticas4,
        bpoliticas5: formModel.bpoliticas5, 
        centros_actividades: secretLairsDeepCopy
    };
    return saveInformacionBasica;
  }

}