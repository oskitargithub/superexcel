import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { RRPPPrAdmService } from './rrpppradm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { RRPPPrModel, Tabla3Model } from '../../dashboard/rrpppr/rrpppr.model';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'rrpppradm',
    templateUrl: './rrpppradm.template.html',
    styleUrls: ['rrpppradm.style.css',
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [RRPPPrAdmService, FuncionesService, FuncionesHighChartsT3Service],
    encapsulation: ViewEncapsulation.None,
})
export class RRPPPrAdmComponent implements OnInit {
    injector: Injector;
    submitted = false;
    config: any;
    public modelo: RRPPPrModel;
    public errorMessage: string;
    public status: string;

    //{ Datos gráficas
    public chart1options: Object;
    public chart2options: Object;
    public chart3options: Object;
    public chart4options: Object;
    public chart5options: Object;
    public chart6options: Object;
    constructor(
        private servicio: RRPPPrAdmService,
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
        this.modelo = new RRPPPrModel();

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
        this.chart1options = this.funccioneshct3.GraficaCompuesta1('Delegados sindicales segun central sindical', '', this.modelo.preg_676_tabla_3, "fila");
        this.chart2options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Delegados sindicales segun central sindical', 'Proporcionado', this.modelo.preg_676_tabla_3);
        this.chart3options = this.funccioneshct3.GraficaCompuesta1('Integrantes de las comisiones ejecutivas de las secciones sindicales, por centrales sindicales', '', this.modelo.preg_677_tabla_3, "fila");
        this.chart4options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Integrantes de las comisiones ejecutivas de las secciones sindicales, por centrales sindicales', 'Proporcionado', this.modelo.preg_677_tabla_3);
        this.chart5options = this.funccioneshct3.GraficaCompuesta1('Categorías', '', this.modelo.preg_675_tabla_3, "fila");
        this.chart6options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Categorías', 'Proporcionado', this.modelo.preg_675_tabla_3);
        
    }
    
}