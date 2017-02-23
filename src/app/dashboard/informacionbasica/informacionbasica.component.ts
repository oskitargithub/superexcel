import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';

import {InformacionBasicaModel} from './informacionbasica.model';
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

    public informacionbasica: InformacionBasicaModel;
    public errorMessage: string;
	public status: string;
    
    constructor(private informacionbasicaservice: InformacionBasicaService, injector: Injector) {
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

    onSubmit() {         
        this.submitted = true;
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
				});
    }

  ngOnInit(): void {
      Messenger.options = { theme: 'air' };
      this.informacionbasica = new InformacionBasicaModel("");  
      this.getInformacionBasica();
    //jQuery('#markdown-editor').markdown();
    //jQuery('.js-slider').slider();
    //jQuery('#colorpicker').colorpicker(this.colorOptions);
    //jQuery('.selectpicker').selectpicker();
  }

    getInformacionBasica(){
        this.informacionbasicaservice.getInformacionBasica()
			.subscribe(
				response => {
						this.informacionbasica = response.data;
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

}