import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { InfoEncuestaPRService } from './infoencuestapr.service';
import { InfoEncuestaPRModel } from './infoencuestapr.model';
declare var Messenger: any;

@Component({
    selector: 'infoencuestapr',
    templateUrl: './infoencuestapr.template.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./infoencuestapr.style.scss'],
    providers: [InfoEncuestaPRService],
})
export class InfoEncuestaPRComponent implements OnInit {
    config: any;
    configFn: any;
    public errorMessage: string;
    public status: string;
    public modelo: InfoEncuestaPRModel;
    constructor(config: AppConfig,
        private servicio: InfoEncuestaPRService,
        private AuthService: AuthService,
        public router: Router,
        injector: Injector
    ) {
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
