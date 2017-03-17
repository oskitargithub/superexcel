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
         preg_24: '',         
         preg_26: '',
         preg_28: 0,
         preg_29: 0,
         preg_31: 0,
         preg_32: 0,
         preg_33: 0,
         preg_34: 0,
         preg_35: 0, 
         preg_36: 0,
         preg_37: 0,
         preg_38: 0,
         preg_39: 0,
         preg_41: 0,
         preg_42: 0,
         preg_43: 0,
         preg_44: 0,        
         preg_2_tabla_2: this.fb.array([]),
         preg_40_tabla_4: this.fb.array([])
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

 setTipodeMovimiento(preg_40_tabla_4: TipodeMovimiento[]){
     console.log("estableciendo tipo mov");
     const addressFGs1 = preg_40_tabla_4.map(tipomov => this.fb.group(tipomov));
     const addressFormArray1 = this.fb.array(addressFGs1);
     this.ifForm.setControl('preg_40_tabla_4', addressFormArray1);
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

  
 
 get preg_40_tabla_4(): FormArray {
    return this.ifForm.get('preg_40_tabla_4') as FormArray;
  };
  
 addTipoMov() {
    this.preg_40_tabla_4.push(this.fb.group(new TipodeMovimiento()));
  }

removeTipoMov(i:number){
      this.preg_40_tabla_4.removeAt(i);
  }
  
  


    getInformacionBasica(){
        this.informacionbasicaservice.getInformacionBasica()
			.subscribe(
				response => {
                        this.ifForm = this.fb.group(response.data.concat(response.user));
                        console.log("asignando datos"); 
                        console.log(this.ifForm);                        
						this.setCentroActividad(response.preg_25_tabla_2);     
                        this.setTipodeMovimiento(response.preg_40_tabla_4);                   
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
        const cstTipodeMovimiento: TipodeMovimiento[] = formModel.preg_40_tabla_4.map(
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
        preg_24: formModel.preg_24,    
        preg_26: formModel.preg_3,
        preg_28: formModel.preg_28,
        preg_29: formModel.preg_29,
        preg_31: formModel.preg_31,
        preg_32: formModel.preg_32,
        preg_33: formModel.preg_33,
        preg_34: formModel.preg_34,
        preg_35: formModel.preg_35,
        preg_36: formModel.preg_36,
        preg_37: formModel.preg_37,
        preg_38: formModel.preg_38,
        preg_39: formModel.preg_39,
        preg_41: formModel.preg_41,
        preg_42: formModel.preg_42,
        preg_43: formModel.preg_43,
        preg_44: formModel.preg_44,
        preg_2_tabla_2: secretLairsDeepCopy,
        preg_40_tabla_4: cstTipodeMovimiento
    };
    return saveInformacionBasica;
  }

}