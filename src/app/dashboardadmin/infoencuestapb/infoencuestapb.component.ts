import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { WindowRef } from './windowref';
import { Router } from '@angular/router';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { InfoEncuestaPBService } from './infoencuestapb.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { FuncionesT5Service } from '../serviciofunciones/funcionest5.service';
import { InfoEncuestaPBModel } from './infoencuestapb.model';
declare var Messenger: any;

@Component({
    selector: 'infoencuestapb',
    templateUrl: './infoencuestapb.template.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./infoencuestapb.style.scss'],
    providers: [InfoEncuestaPBService, FuncionesService,FuncionesT5Service],
})
export class InfoEncuestaPBComponent implements OnInit {
    config: any;
    configFn: any;
    nativeWindow: any;
    public errorMessage: string;
    public status: string;
    public modelo: InfoEncuestaPBModel;
    public modelo2: any = "";
    public modelo3: any = "";
    public modelo4: any = "";
    constructor(config: AppConfig,
        private servicio: InfoEncuestaPBService,
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
        this.modelo = new InfoEncuestaPBModel();
        this.getDatosModelo();
        this.getDatosPlantillaModelo();
        this.getDatosRetribucionesModelo();
    }

    generaInforme(){
        console.log("generando informe de "+this.modelo.user_id);
        var newWindow = this.nativeWindow.open(this.config.apilaravel+"gestion/informe/"+this.modelo.user_id);
        
    }

    getNombre() {
        return this.modelo.nombre + " " + this.modelo.apellidos;
    }

    getDatosModelo() {
        if (this.AuthService.usucuest != 0){
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

      getTotalCompoPlantilla() {
        let salida = this.modelo2.preg_46 * 1 + this.modelo2.preg_47 * 1;
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getMujeresPlantilla() {
        let salida = this.modelo2.preg_46 * 1;
        if (!isNaN(salida))
          return salida;
        else
          return 0;
      }
      getMujeresPlantillaPorcentaje() {
        let salida = (this.modelo2.preg_46 * 1) * 100 / ((this.modelo2.preg_46 * 1 + this.modelo2.preg_47 * 1));
        if (!isNaN(salida))
          return salida;
        else
          return 0;
      }
    
      getHombresPlantilla() {
        let salida = this.modelo2.preg_47 * 1;
        if (!isNaN(salida))
          return salida;
        else
          return 0;
      }
    
      getHombresPlantillaPorcentaje() {
        let salida = (this.modelo2.preg_47 * 1) * 100 / ((this.modelo2.preg_46 * 1) + (this.modelo2.preg_47 * 1));
        if (!isNaN(salida))
          return salida;
        else
          return 0;
    
      }
}
