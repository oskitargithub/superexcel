import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { RRPPAdmService } from './rrppadm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { RRPPModel, Tabla3Model } from '../../dashboard/rrpp/rrpp.model';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'rrpp',
    templateUrl: './rrppadm.template.html',
    styleUrls: ['rrppadm.style.css',
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [RRPPAdmService, FuncionesService, FuncionesHighChartsT3Service],
    encapsulation: ViewEncapsulation.None,
})
export class RRPPAdmComponent implements OnInit {
    injector: Injector;
    submitted = false;
    config: any;
    public modelo: RRPPModel;
    public errorMessage: string;
    public status: string;

    //{ Datos gráficas
    public chart1options: Object;
    public chart2options: Object;
    public chart3options: Object;
    public chart4options: Object;

    constructor(
        private servicio: RRPPAdmService,
        public funciones: FuncionesService,
        public funccioneshct3: FuncionesHighChartsT3Service,
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
        this.modelo = new RRPPModel();

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
        this.chart1options = this.funccioneshct3.GraficaCompuesta1('Junta de Personal por Sindicato', '', this.modelo.preg_351_tabla_3, "fila");
        this.chart2options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Junta de Personal por Sindicato', 'Proporcionado', this.modelo.preg_351_tabla_3);
        this.chart3options = this.funccioneshct3.GraficaCompuesta1('Integrantes del Comité de Empresa por Sindicato', '', this.modelo.preg_352_tabla_3, "fila");
        this.chart4options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Integrantes del Comité de Empresa por Sindicato', 'Proporcionado', this.modelo.preg_352_tabla_3);
        
    }
    
}