import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { PromoCarreraPrAdmService } from './promocarrerapradm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { PromoCarreraPrModel, Tabla3Model } from '../../dashboard/promocarrerapr/promocarrerapr.model';
import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'promocarrerapradm',
    templateUrl: './promocarrerapradm.template.html',
    styleUrls: ['promocarrerapradm.style.css',
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [PromoCarreraPrAdmService, FuncionesService,FuncionesHighChartsT3Service],
    encapsulation: ViewEncapsulation.None,
})
export class PromoCarreraPrAdmComponent implements OnInit {
    injector: Injector;
    submitted = false;
    config: any;
    public modelo: PromoCarreraPrModel;
    public errorMessage: string;
    public status: string;

//{ Datos gráficas
    public chart1options: Object;
    public chart2options: Object;
    public chart3options: Object;
    public chart4options: Object;
    public chart5options: Object;
    public chart6options: Object;
    public chart7options: Object;
    public chart8options: Object;
    public chart9options: Object;
    public chart10options: Object;
    public chart11options: Object;
    public chart12options: Object;
    public chart1pieoptions: Object;
//}


    constructor(
        private servicio: PromoCarreraPrAdmService,
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
        this.modelo = new PromoCarreraPrModel();

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
        this.chart1options = this.funccioneshct3.GraficaCompuesta1('Relación de Ascensos por categorías profesionales por género', '', this.modelo.preg_577_tabla_3, "fila");
        this.chart2options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Relación de Ascensos por categorías profesionales por género', 'Proporcionada', this.modelo.preg_577_tabla_3);
        this.chart3options = this.funccioneshct3.GraficaCompuesta1('Comparativo promociones en el último año', '', this.modelo.preg_586_tabla_3, "fila");
        this.chart4options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Comparativo promociones en el último año', 'Proporcionada', this.modelo.preg_586_tabla_3);
        
        this.chart1pieoptions = this.funccioneshct3.GraficaPieSimple("Comparación promoción por género en el último año","",this.modelo.preg_586_tabla_3);
        
        this.chart5options = this.funccioneshct3.GraficaCompuesta1('Solicitudes de promoción presentadas', '', this.modelo.preg_575_tabla_3, "fila");
        this.chart6options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Solicitudes de promoción presentadas', 'Proporcionada', this.modelo.preg_575_tabla_3);
        this.chart7options = this.funccioneshct3.GraficaCompuesta1('Comparativo Ascensos Por Género', '', this.modelo.preg_576_tabla_3, "fila");
        this.chart8options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Comparativo Ascensos Por Género', 'Proporcionada', this.modelo.preg_576_tabla_3);
        this.chart9options = this.funccioneshct3.GraficaCompuesta1('Transformación de contratos a tiempo parcial en tiempo completo', '', this.modelo.preg_585_tabla_3, "fila");
        this.chart10options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Transformación de contratos a tiempo parcial en tiempo completo', 'Proporcionada', this.modelo.preg_585_tabla_3);

        this.chart11options = this.funccioneshct3.GraficaCompuesta1('Promoción por categoría profesional', '', this.modelo.preg_587_tabla_3, "fila");
        this.chart12options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Promoción por categoría profesional', 'Proporcionada', this.modelo.preg_587_tabla_3);
    }
}