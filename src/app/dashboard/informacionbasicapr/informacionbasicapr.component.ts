import { Component, ViewEncapsulation, Injector, OnInit} from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


import {InformacionBasicaPrModel, CentroActividad, TipodeMovimiento,datosUserModel,dataModel} from './informacionbasicapr.model';
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
        this.informacionbasicapr = this.preparaParaGuardar();
        console.log(this.informacionbasicapr);
        
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
        user: this.fb.group(new datosUserModel()),
        data: this.fb.group(new dataModel()),
        preg_25_tabla_2: this.fb.array([]),
        preg_40_tabla_4: this.fb.array([]),
        _token: ''
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


 get user():FormArray {
    return this.ifForm.get('user') as FormArray;
  };

get data():FormArray {
    return this.ifForm.get('data') as FormArray;
  };

getTotal(){
    return (this.ifForm.get('data.preg_28').value*1 + this.ifForm.get('data.preg_29').value*1);
}








 get preg_25_tabla_2(): FormArray {
    return this.ifForm.get('preg_25_tabla_2') as FormArray;
  };


  addCentroActividad() {
    this.preg_25_tabla_2.push(this.fb.group(new CentroActividad()));
  }
   removeCentroActividad(i:number){
      this.preg_25_tabla_2.removeAt(i);
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
                    console.log("trayendo datos");
                        //this.ifForm = this.fb.group(response); 
                        console.log("trayendo datos1");
                        this.ifForm.setControl('user',this.fb.group(response.user));
                        console.log("trayendo datos2");
                        this.ifForm.setControl('data',this.fb.group(response.data));    
                        console.log("trayendo datos3");                                   
						this.setCentroActividad(response.preg_25_tabla_2); 
                        console.log("trayendo datos4");
                        this.setTipodeMovimiento(response.preg_40_tabla_4);  
                        console.log("trayendo datos5");
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

     datepickerOpts = {
        autoclose: true,
        todayBtn: 'linked',
        todayHighlight: true,
        assumeNearbyYear: true,
        format: 'dd/mm/yyyy',
        placeholder: 'Fecha',
        language: 'es',
        locale: 'es'
    }

    preparaParaGuardar(): InformacionBasicaPrModel {
        const formModel = this.ifForm.value;
        const misdatosusuario : datosUserModel = formModel.user;
        const datacuestionario : dataModel = formModel.data;
    // deep copy of form model lairs
        const secretLairsDeepCopy: CentroActividad[] = formModel.preg_25_tabla_2.map(
        (centroact: CentroActividad) => Object.assign({}, centroact)
        );
        const cstTipodeMovimiento: TipodeMovimiento[] = formModel.preg_40_tabla_4.map(
            (tipomov: TipodeMovimiento) => Object.assign({}, tipomov)
        );
    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveInformacionBasica: InformacionBasicaPrModel = {        
        user : misdatosusuario,  
        data:   datacuestionario,
         _token: formModel._token,
         totalCuest : formModel.totalCuest,
        respondidasCuest : formModel.respondidasCuest,
        totalSeccion : formModel.totalSeccion,
        respondidasSeccion : formModel.respondidasSeccion,
        preg_25_tabla_2: secretLairsDeepCopy,
        preg_40_tabla_4: cstTipodeMovimiento
    };
    return saveInformacionBasica;
  }

}