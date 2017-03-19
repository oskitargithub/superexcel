import { Component, ViewEncapsulation, Injector, OnInit} from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


import {InformacionBasicaModel, CentroActividad, datosUserModel, dataModel} from './informacionbasica.model';
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
    public token:string;
    public respondidasSeccion:string;
    public totalSeccion: string;
    
    constructor(
        private fb: FormBuilder,
        private informacionbasicaservice: InformacionBasicaService, 
        injector: Injector
    ) {
        this.respondidasSeccion='0';
        this.totalSeccion='0';
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
         this.informacionbasica = this.preparaParaGuardar();
       
       this.submitted = true;
        console.log("formulario enviado"); 
        this.informacionbasicaservice.edit(this.informacionbasica,this.token)
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
				});
    }

    createForm() {
        this.ifForm = this.fb.group({
        user: this.fb.group(new datosUserModel()),
        data: this.fb.group(new dataModel()),
        preg_2_tabla_2: this.fb.array([]),
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

get user():FormArray {
    return this.ifForm.get('user') as FormArray;
  };

get data():FormArray {
    return this.ifForm.get('data') as FormArray;
  };

getTotal(){
    return (this.ifForm.get('data.preg_5').value*1 + this.ifForm.get('data.preg_6').value*1);
}

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
                        
                        //this.ifForm = this.fb.group(response); 
                        this.token = this.ifForm.get("_token").value;
                        this.ifForm.setControl('user',this.fb.group(response.user));
                        this.ifForm.setControl('data',this.fb.group(response.data));                                       
						this.setCentroActividad(response.preg_2_tabla_2);   

                        this.respondidasSeccion = response.respondidasSeccion;
                        this.totalSeccion = response.totalSeccion;

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
        const secretLairsDeepCopy: CentroActividad[] = formModel.preg_2_tabla_2.map(
        (centroact: CentroActividad) => Object.assign({}, centroact)
        );

        const misdatosusuario : datosUserModel = formModel.user;
        const datacuestionario : dataModel = formModel.data;
        const saveInformacionBasica: InformacionBasicaModel = {
            user : misdatosusuario,  
            data:   datacuestionario,
            _token: formModel._token,
            totalCuest : formModel.totalCuest,
            respondidasCuest : formModel.respondidasCuest,
            totalSeccion : formModel.totalSeccion,
            respondidasSeccion : formModel.respondidasSeccion,
            preg_2_tabla_2: secretLairsDeepCopy
        };
    return saveInformacionBasica;
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

}