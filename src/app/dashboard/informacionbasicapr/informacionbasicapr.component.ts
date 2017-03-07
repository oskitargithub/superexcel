import { Component, ViewEncapsulation, Injector, OnInit} from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


import {InformacionBasicaPrModel, CentroActividad, DenominacionMujeresHombres} from './informacionbasicapr.model';
import {InformacionBasicaPrService} from "./informacionbasicapr.service";

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'informacionbasica',
    templateUrl: './informacionbasica.template.html',
    styleUrls: [ '../../forms/elements/elements.style.scss','../../ui-elements/notifications/notifications.style.scss' ],
    providers: [InformacionBasicaPrService],
    encapsulation: ViewEncapsulation.None,
})
export class InformacionBasicaPrComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = {color: '#f0b518'};    
    submitted = false;
    ifForm: FormGroup;

    public informacionbasicapr: InformacionBasicaPrModel;
    public errorMessage: string;
	public status: string;
    
    constructor(
        private fb: FormBuilder,
        private informacionbasicaservice: InformacionBasicaPrService, 
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
        this.informacionbasicapr = this.preparaParaGuardar();
        console.log(this.informacionbasicapr);
    }
    onSubmit(model:InformacionBasicaPrModel) {    
        
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
         preg_1: '',         
         preg_3: '',
         preg_5: 0,
         preg_6: 0,
         preg_19: false,
         preg_20: false,
         preg_21: false,
         preg_22: false,
         preg_23: false,
         preg_2_tabla_2: this.fb.array([]),
         preg_3_tabla_3: this.fb.array([])
        });
    }

    

  ngOnInit(): void {
      Messenger.options = { theme: 'air' };
     
    //jQuery('#markdown-editor').markdown();
    //jQuery('.js-slider').slider();
    //jQuery('#colorpicker').colorpicker(this.colorOptions);
    //jQuery('.selectpicker').selectpicker();
  }

 setCentroActividad(preg_2_tabla_2: CentroActividad[]){
     const addressFGs = preg_2_tabla_2.map(centroact => this.fb.group(centroact));
     const addressFormArray = this.fb.array(addressFGs);
     this.ifForm.setControl('preg_2_tabla_2', addressFormArray);
 }

 setDenominacionMujeresHombres(preg_3_tabla_3: DenominacionMujeresHombres[]){
     const addressFGs1 = preg_3_tabla_3.map(denommh => this.fb.group(denommh));
     const addressFormArray1 = this.fb.array(addressFGs1);
     this.ifForm.setControl('preg_3_tabla_3', addressFormArray1);
 }

 get preg_2_tabla_2(): FormArray {
    return this.ifForm.get('preg_2_tabla_2') as FormArray;
  };

get preg_3_tabla_3(): FormArray {
    return this.ifForm.get('preg_3_tabla_3') as FormArray;
  };

  addCentroActividad() {
    this.preg_2_tabla_2.push(this.fb.group(new CentroActividad()));
  }

  addOrganoDirTec() {
    this.preg_3_tabla_3.push(this.fb.group(new DenominacionMujeresHombres()));
  }


  removeCentroActividad(i:number){
      this.preg_2_tabla_2.removeAt(i);
  }

  removeOrganoDirTec(i:number){
      this.preg_3_tabla_3.removeAt(i);
  }


    getInformacionBasica(){
        this.informacionbasicaservice.getInformacionBasica()
			.subscribe(
				response => {
                        this.ifForm = this.fb.group(response.data); 
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

    preparaParaGuardar(): InformacionBasicaPrModel {
        const formModel = this.ifForm.value;
    // deep copy of form model lairs
        const secretLairsDeepCopy: CentroActividad[] = formModel.preg_2_tabla_2.map(
        (centroact: CentroActividad) => Object.assign({}, centroact)
        );
        const cstDenominacionMujeresHombres: DenominacionMujeresHombres[] = formModel.DenominacionMujeresHombres.map(
            (denommh: DenominacionMujeresHombres) => Object.assign({}, denommh)
        );
    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveInformacionBasica: InformacionBasicaPrModel = {
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
        preg_1: formModel.desarrollaact,    
        preg_3: formModel.denominacion,
        preg_5: formModel.mujeres,
        preg_6: formModel.hombres,
        preg_19: formModel.bpoliticas1,
        preg_20: formModel.bpoliticas2,
        preg_21: formModel.bpoliticas3,
        preg_22: formModel.bpoliticas4,
        preg_23: formModel.bpoliticas5, 
        preg_2_tabla_2: secretLairsDeepCopy,
        preg_3_tabla_3: cstDenominacionMujeresHombres
    };
    return saveInformacionBasica;
  }

}