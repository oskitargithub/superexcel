import { Component, ViewEncapsulation, Injector, OnInit} from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


import {InformacionBasicaModel, CentroActividad, datosUserModel} from './informacionbasica.model';
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
        //this.informacionbasica = this.preparaParaGuardar();
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
         datosuser: datosUserModel,
         preg_1: '',         
         preg_3: '',
         preg_5: 0,
         preg_6: 0,
         preg_19: false,
         preg_20: false,
         preg_21: false,
         preg_22: false,
         preg_23: false,
         preg_2_tabla_2: this.fb.array([])
        });
    }

    

  ngOnInit(): void {
      Messenger.options = { theme: 'air' };
     
    //jQuery('#markdown-editor').markdown();
    //jQuery('.js-slider').slider();
    //jQuery('#colorpicker').colorpicker(this.colorOptions);
    //jQuery('.selectpicker').selectpicker();
  }


setDatosUser(datosuser : datosUserModel[]){
    const miarrayFGs = datosuser.map(misdatos => this.fb.group(misdatos));
    const misdatosFormArray = this.fb.array(miarrayFGs);
    this.ifForm.setControl('datosuser', misdatosFormArray);
}

get datosuser():FormArray {
    return this.ifForm.get('datosuser') as FormArray;
  };



 setCentroActividad(preg_2_tabla_2: CentroActividad[]){
     const addressFGs = preg_2_tabla_2.map(centroact => this.fb.group(centroact));
     const addressFormArray = this.fb.array(addressFGs);
     this.ifForm.setControl('preg_2_tabla_2', addressFormArray);
 }

 get preg_2_tabla_2(): FormArray {
    return this.ifForm.get('preg_2_tabla_2') as FormArray;
  };

  addCentroActividad() {
    this.preg_2_tabla_2.push(this.fb.group(new CentroActividad()));
  }

  removeCentroActividad(i:number){
      this.preg_2_tabla_2.removeAt(i);
  }


    getInformacionBasica(){
        this.informacionbasicaservice.getInformacionBasica()
			.subscribe(
				response => {
                        this.ifForm = this.fb.group(response.data); 
                        this.ifForm.controls.user = response.user;
                        console.log("cargando datos");
                        console.log(this.ifForm);
                        //this.setDatosUser(response.user);                        
						this.setCentroActividad(response.preg_2_tabla_2);                        
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
        const secretLairsDeepCopy: CentroActividad[] = formModel.preg_2_tabla_2.map(
        (centroact: CentroActividad) => Object.assign({}, centroact)
        );
    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveInformacionBasica: InformacionBasicaModel = {
        id: formModel.id,
        id_usuario: formModel.id_usuario,
        empresa:formModel.empresa,
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
        preg_1: formModel.preg_1,    
        preg_3: formModel.preg_3,
        preg_5: formModel.preg_5,
        preg_6: formModel.preg_6,
        preg_19: formModel.preg_19,
        preg_20: formModel.preg_20,
        preg_21: formModel.preg_21,
        preg_22: formModel.preg_22,
        preg_23: formModel.preg_23, 
        preg_2_tabla_2: secretLairsDeepCopy
    };
    return saveInformacionBasica;
  }

}