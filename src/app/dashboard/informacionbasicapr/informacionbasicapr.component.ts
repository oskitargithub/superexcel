import { Component, ViewEncapsulation, Injector, OnInit} from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


import {InformacionBasicaPrModel, CentroActividad, TipodeMovimiento} from './informacionbasicapr.model';
import {InformacionBasicaPrService} from "./informacionbasicapr.service";

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'informacionbasica',
    templateUrl: './informacionbasicapr.template.html',
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
        empresa: '',
            cif: '',
            num_centros:'',
            num_comunidades:'',
         ambito: '',
         sector: '',
         convenio: '',
         domicilio: '',
         web: '',
         personas: '',
         telefonos: '',
         horarios: '',
         email: '',
         dia: '',
         mes: '',
         anyo: '',
         preg_1: '',         
         preg_3: '',
         preg_5: 0,
         preg_6: 0,
         preg_8: 0,
         preg_9: 0,
         preg_10: 0,
         preg_11: 0,
         preg_12: 0, 
         preg_13: 0,
         preg_14: 0,
         preg_15: 0,
         preg_16: 0,
         preg_17: 0,
         preg_18: 0,
         preg_19: 0,
         preg_20: 0,
         preg_21: 0,
         preg_22: 0,
         preg_23: 0,        
         preg_2_tabla_2: this.fb.array([]),
         preg_17_tabla_4: this.fb.array([])
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
     console.log("estableciendo CentroActividad");
     const addressFGs = preg_2_tabla_2.map(centroact => this.fb.group(centroact));
     const addressFormArray = this.fb.array(addressFGs);
     this.ifForm.setControl('preg_2_tabla_2', addressFormArray);
     console.log("fin CentroActividad");
 }

 setTipodeMovimiento(preg_17_tabla_4: TipodeMovimiento[]){
     console.log("estableciendo tipo mov");
     const addressFGs1 = preg_17_tabla_4.map(tipomov => this.fb.group(tipomov));
     const addressFormArray1 = this.fb.array(addressFGs1);
     this.ifForm.setControl('preg_17_tabla_4', addressFormArray1);
 }



 get preg_2_tabla_2(): FormArray {
    return this.ifForm.get('preg_2_tabla_2') as FormArray;
  };

get preg_17_tabla_4(): FormArray {
    return this.ifForm.get('preg_17_tabla_4') as FormArray;
  };

  addCentroActividad() {
    this.preg_2_tabla_2.push(this.fb.group(new CentroActividad()));
  }

  addTipoMov() {
    this.preg_17_tabla_4.push(this.fb.group(new TipodeMovimiento()));
  }


  removeCentroActividad(i:number){
      this.preg_2_tabla_2.removeAt(i);
  }

  removeTipoMov(i:number){
      this.preg_17_tabla_4.removeAt(i);
  }


    getInformacionBasica(){
        this.informacionbasicaservice.getInformacionBasica()
			.subscribe(
				response => {
                        this.ifForm = this.fb.group(response.data); 
						this.setCentroActividad(response.preg_2_tabla_2);     
                        this.setTipodeMovimiento(response.preg_17_tabla_4);                   
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
        const cstTipodeMovimiento: TipodeMovimiento[] = formModel.TipodeMovimiento.map(
            (tipomov: TipodeMovimiento) => Object.assign({}, tipomov)
        );
    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveInformacionBasica: InformacionBasicaPrModel = {
        id: formModel.id,
        user_id: formModel.user_id,
        empresa:formModel.empresa,
        sector: formModel.sector,
        num_centros: formModel.num_centros,
        num_comunidades: formModel.num_comunidades,
        cif: formModel.cif,
        ambito: formModel.ambito,
        convenio: formModel.convenio,
        domicilio: formModel.domicilio,
        web: formModel.web,
        personas: formModel.personas,
        telefonos: formModel.telefonos,
        horarios: formModel.horarios,
        email: formModel.email,
        dia: formModel.dia,
        mes: formModel.mes,
        anyo: formModel.anyo,
        preg_1: formModel.preg_1,    
        preg_3: formModel.preg_3,
        preg_5: formModel.preg_5,
        preg_6: formModel.preg_6,
        preg_8: formModel.preg_8,
        preg_9: formModel.preg_9,
        preg_10: formModel.preg_10,
        preg_11: formModel.preg_11,
        preg_12: formModel.preg_12,
        preg_13: formModel.preg_13,
        preg_14: formModel.preg_14,
        preg_15: formModel.preg_15,
        preg_16: formModel.preg_16,
        preg_17: formModel.preg_17,
        preg_18: formModel.preg_18,
        preg_19: formModel.preg_19,
        preg_20: formModel.preg_20,
        preg_21: formModel.preg_21,
        preg_22: formModel.preg_22,
        preg_23: formModel.preg_23,
        preg_2_tabla_2: secretLairsDeepCopy,
        preg_17_tabla_4: cstTipodeMovimiento
    };
    return saveInformacionBasica;
  }

}