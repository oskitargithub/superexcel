import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { WindowRef } from '../infoencuestapb/windowref';
import { Router } from '@angular/router';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { InfoEncuestaPRService } from './infoencuestapr.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { FuncionesT5Service } from '../serviciofunciones/funcionest5.service';
import { InfoEncuestaPRModel } from './infoencuestapr.model';
declare var Messenger: any;
@Component({
    selector: 'infoencuestapr',
    templateUrl: './infoencuestapr.template.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./infoencuestapr.style.scss'],
    providers: [InfoEncuestaPRService, FuncionesService,FuncionesT5Service],
})
export class InfoEncuestaPRComponent implements OnInit {
    config: any;
    configFn: any;
    nativeWindow: any;
    public errorMessage: string;
    public status: string;
    public modelo: InfoEncuestaPRModel;
    
    public modelo2: any = "";
    public modelo3: any = "";
    public modelo4: any = "";
    constructor(config: AppConfig,
        private servicio: InfoEncuestaPRService,
        public serviciot3: FuncionesService,
        public serviciot5: FuncionesT5Service,
        private AuthService: AuthService,
        
        public router: Router,
        private winRef: WindowRef,
        injector: Injector
    ) {
        this.nativeWindow = winRef.getNativeWindow();
        this.config = config.getConfig();
        if (this.AuthService.usucuest == 0) {
            let redirect = this.config.urladmin;
            this.router.navigate([redirect]);
        }
    }

    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        this.modelo = new InfoEncuestaPRModel();
        this.getDatosModelo();
        this.getDatosPlantillaModelo();
        this.getDatosRetribucionesModelo();
    }

    

    getNombre() {
        return this.modelo.nombre + " " + this.modelo.apellidos;
    }

    getDatosModelo() {
        if (this.AuthService.usucuest != 0) {
            this.servicio.getDatosModelo(this.AuthService.usucuest)
                .subscribe(
                response => {
                    this.status = response.status;
                    if (this.status !== "success") {
                        if (this.status == "tokenerror") {
                            Messenger().post({
                                message: 'Ha ocurrido un error de token.' + this.errorMessage,
                                type: 'error',
                                showCloseButton: true
                            });
                        }
                        else {
                            Messenger().post({
                                message: 'Ha ocurrido un error cargando los datos.' + this.errorMessage,
                                type: 'error',
                                showCloseButton: true
                            });
                        }
                    }
                    else {
                        this.modelo = response.data;
                        Messenger().post({
                            message: 'Los datos han sido cargados correctamente',
                            type: 'success',
                            showCloseButton: true
                        });
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage !== null) {

                        Messenger().post({
                            message: 'Ha ocurrido un error en la petición.' + this.errorMessage,
                            type: 'error',
                            showCloseButton: true
                        });

                    }
                });
        }
    }

    getDatosPlantillaModelo() {
        this.servicio.getDatosModeloPlantilla()
            .subscribe(
            response => {
                this.modelo2 = response.data;
                this.modelo3 = response;

            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage !== null) {

                    Messenger().post({
                        message: 'Ha ocurrido un error en la petición.' + this.errorMessage,
                        type: 'error',
                        showCloseButton: true
                    });

                }
            });
    }
    getDatosRetribucionesModelo() {
        this.servicio.getDatosModeloRetribuciones()
          .subscribe(
          response => {
    
            /** Asignamos las tablas */
            this.modelo4 = response;
            /** Asignamos los datos para las gráficas */
            
            
          },
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage !== null) {
    
              Messenger().post({
                message: 'Ha ocurrido un error en la petición.' + this.errorMessage,
                type: 'error',
                showCloseButton: true
              });
    
            }
          });
      }
      generaInforme(){
        console.log("generando informe de "+this.modelo.user_id);
        var newWindow = this.nativeWindow.open(this.config.apilaravel+"gestion/informe/"+this.modelo.user_id);
        
    }

    getTotalCompoPlantilla() {
        let salida = this.modelo2.preg_381 * 1 + this.modelo2.preg_382 * 1;
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getMujeresPlantilla() {
        let salida = this.modelo2.preg_381 * 1;
        if (!isNaN(salida))
          return salida;
        else
          return 0;
      }
      getMujeresPlantillaPorcentaje() {
        let salida = (this.modelo2.preg_381 * 1) * 100 / ((this.modelo2.preg_381 * 1 + this.modelo2.preg_382 * 1));
        if (!isNaN(salida))
          return salida;
        else
          return 0;
      }
    
      getHombresPlantilla() {
        let salida = this.modelo2.preg_382 * 1;
        if (!isNaN(salida))
          return salida;
        else
          return 0;
      }
    
      getHombresPlantillaPorcentaje() {
        let salida = (this.modelo2.preg_382 * 1) * 100 / ((this.modelo2.preg_381 * 1) + (this.modelo2.preg_382 * 1));
        if (!isNaN(salida))
          return salida;
        else
          return 0;
    
      }
}