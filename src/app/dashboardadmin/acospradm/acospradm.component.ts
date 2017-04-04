import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { AcosPRAdmService } from './acospradm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { AcosPRModel, Tabla3Model } from '../../dashboard/acospr/acospr.model';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'acospradm',
    templateUrl: './acospradm.template.html',
    styleUrls: ['../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [AcosPRAdmService, FuncionesService],
    encapsulation: ViewEncapsulation.None,
})
export class AcosPRAdmComponent implements OnInit {
    injector: Injector;
    submitted = false;
    config: any;    
    public modelo: AcosPRModel;
    public errorMessage: string;
    public status: string;

//{ Datos gráficas
    public datosGrafica1 = [];
    public datosGrafica2 = [];
    public labelGrafica1 = [];
    public labelGrafica2 = [];
    public doughnutChartLabels: string[] = ['% Mujeres', '% Hombres'];
    public doughnutChartData: number[] = [0];// = [350, 450, 100];
    public doughnutChartType: string = 'doughnut';

    constructor(
        private servicio: AcosPRAdmService,
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
        this.modelo = new AcosPRModel();
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
        let totalmuj = Math.round(this.funciones.getSumaMujeresDelTotal(this.modelo.preg_1_tabla_3)*100);
        let totalhom = Math.round(this.funciones.getSumaHombresDelTotal(this.modelo.preg_1_tabla_3)*100);
        this.doughnutChartData = [totalmuj, totalhom];
    }
}