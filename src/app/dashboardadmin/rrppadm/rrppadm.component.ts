import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { RRPPAdmService } from './rrppadm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { RRPPModel, Tabla3Model } from '../../dashboard/rrpp/rrpp.model';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'rrpp',
    templateUrl: './rrppadm.template.html',
    styleUrls: ['rrppadm.style.css',
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [RRPPAdmService, FuncionesService],
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
    public datosGrafica1 = [];
    public datosGrafica2 = [];
    public labelGrafica1 = [];
    public labelGrafica2 = [];

    public barChartType: string = 'bar';
    public barChartOptions: any = { scaleShowVerticalLines: false, responsive: true };

    public barChartLabels1: string[] = [''];
    public barChartData1: any[] = [{ data: [], label: '' }];
    public barChartLabels2: string[] = [''];
    public barChartData2: any[] = [{ data: [], label: '' }];
    public barChartLabels3: string[] = [''];
    public barChartData3: any[] = [{ data: [], label: '' }];
    public barChartLabels4: string[] = [''];
    public barChartData4: any[] = [{ data: [], label: '' }];

    constructor(
        private servicio: RRPPAdmService,
        public funciones: FuncionesService,
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
        this.asignaPorcentajesPorTipo(this.modelo.preg_1_tabla_3);
        this.barChartLabels1 = this.labelGrafica1;
        this.barChartData1 = this.datosGrafica1;
        this.barChartData2 = this.datosGrafica2;
        this.barChartLabels2 = this.labelGrafica2;
        this.asignaPorcentajesPorTipo(this.modelo.preg_2_tabla_3);
        this.barChartLabels3 = this.labelGrafica1;
        this.barChartData3 = this.datosGrafica1;
        this.barChartData4 = this.datosGrafica2;
        this.barChartLabels4 = this.labelGrafica2;
    }
    reinicializaDatosGrafica() {
        this.labelGrafica1 = [];
        this.labelGrafica2 = [];
        this.datosGrafica1 = [];
        this.datosGrafica2 = [];
    }
    asignaPorcentajesPorTipo(tabla: any) {
        this.reinicializaDatosGrafica();
        let datam = [];
        let datah = [];
        let data2m = [];
        let data2h = [];
        if (tabla != null) {
            tabla.forEach(elemento => {
                let mujeres = this.funciones.getMujeresDeFila(elemento, tabla);
                let hombres = this.funciones.getHombresDeFila(elemento, tabla);
                let mujeres2 = this.funciones.getPorcMujeresAbs(elemento, tabla);
                let hombres2 = this.funciones.getPorcHombresAbs(elemento, tabla);
                datam.push(Math.round(mujeres * 100));
                datah.push(Math.round(hombres * 100));
                data2m.push(Math.round(mujeres2 * 100));
                data2h.push(Math.round(hombres2 * 100));
                this.labelGrafica1.push(elemento.texto);
                this.labelGrafica2.push(elemento.texto);

            });
            this.datosGrafica1.push({ data: datam, label: "Mujeres %" });
            this.datosGrafica1.push({ data: datah, label: "Hombres %" });
            this.datosGrafica2.push({ data: data2m, label: "Mujeres %" });
            this.datosGrafica2.push({ data: data2h, label: "Hombres %" });
        }
    }
}