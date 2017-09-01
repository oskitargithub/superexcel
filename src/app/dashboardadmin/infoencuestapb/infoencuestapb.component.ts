import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { WindowRef } from './windowref';
import { Router } from '@angular/router';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { InfoEncuestaPBService } from './infoencuestapb.service';
import { InfoEncuestaPBModel } from './infoencuestapb.model';
declare var Messenger: any;

@Component({
    selector: 'infoencuestapb',
    templateUrl: './infoencuestapb.template.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./infoencuestapb.style.scss'],
    providers: [InfoEncuestaPBService],
})
export class InfoEncuestaPBComponent implements OnInit {
    config: any;
    configFn: any;
    nativeWindow: any
    public errorMessage: string;
    public status: string;
    public modelo: InfoEncuestaPBModel;

    constructor(config: AppConfig,
        private servicio: InfoEncuestaPBService,
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
}
