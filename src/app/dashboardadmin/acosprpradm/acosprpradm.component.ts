import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { AcosPRPrAdmService } from './acosprpradm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
import { AcosPRPrModel, Tabla3Model } from '../../dashboard/acosprpr/acosprpr.model';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'acosprpradm',
    templateUrl: './acosprpradm.template.html',
    styleUrls: ['../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [AcosPRPrAdmService, FuncionesService,FuncionesHighChartsT3Service],
    encapsulation: ViewEncapsulation.None,
})
export class AcosPRPrAdmComponent implements OnInit {
    injector: Injector;
    submitted = false;
    config: any;    
    public modelo: AcosPRPrModel;
    public errorMessage: string;
    public status: string;

//{ Datos gráficas
    public chart1options: Object;
    public chartpieoptions: Object;

    constructor(
        private servicio: AcosPRPrAdmService,
        public funciones: FuncionesService,
        public funcionesHighChartsT3Service:FuncionesHighChartsT3Service,
        config: AppConfig,
        private AuthService: AuthService,
        public router: Router,
        injector: Injector
    ) {
        this.config = config.getConfig();
        if (this.AuthService.usucuest == 0) {
            let redirect = this.config.urladmin;
            this.router.navigate([redirect]);
        }        
        this.modelo = new AcosPRPrModel();
        console.log("nuevo modelo");
    }
    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        if (this.AuthService.usucuest != 0) {
            this.getDatosModelo();
        }
    }

    getDatosModelo() {
        this.servicio.getDatosModelo()
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
                    console.log("asignando modelo");
                     this.modelo = response;                
                    this.asignaDatosGraficas();
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

    asignaDatosGraficas() {
        this.chart1options = this.funcionesHighChartsT3Service.GraficaSimple('Acoso sexual, reclamaciones presentadas', '',this.modelo.preg_671_tabla_3);
        this.chartpieoptions = this.funcionesHighChartsT3Service.GraficaPieSimple('Acoso sexual, reclamaciones presentadas (Totales)', '',this.modelo.preg_671_tabla_3);
    }




    
    
}