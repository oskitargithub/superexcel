import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { FormacionAdmService } from './formacionadm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { FormacionModel, Tabla3Model } from '../../dashboard/formacion/formacion.model';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'formacionadm',
    templateUrl: './Formacionadm.template.html',
    styleUrls: ['Formacionadm.style.css',
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [FormacionAdmService, FuncionesService],
    encapsulation: ViewEncapsulation.None,
})
export class FormacionAdmComponent implements OnInit {
    injector: Injector;
    submitted = false;
    config: any;
    public modelo: FormacionModel;
    public errorMessage: string;
    public status: string;

//{ Datos gráficas
    public barChartType: string = 'bar';
    public barChartOptions: any = { scaleShowVerticalLines: false, responsive: true };
    public doughnutChartLabels: string[] = ['% Mujeres', '% Hombres'];
    public doughnutChartData: number[] = [0];// = [350, 450, 100];
    public doughnutChartType: string = 'doughnut';

    public barChartLabels1: string[] = [''];
    public barChartData1: any[] = [{ data: [], label: '' }];
    public barChartLabels2: string[] = [''];
    public barChartData2: any[] = [{ data: [], label: '' }];
    public barChartLabels3: string[] = [''];
    public barChartData3: any[] = [{ data: [], label: '' }];
    public barChartLabels4: string[] = [''];
    public barChartData4: any[] = [{ data: [], label: '' }];
    public barChartLabels5: string[] = [''];
    public barChartData5: any[] = [{ data: [], label: '' }];
    public barChartLabels6: string[] = [''];
    public barChartData6: any[] = [{ data: [], label: '' }];
    public barChartLabels7: string[] = [''];
    public barChartData7: any[] = [{ data: [], label: '' }];
    public barChartLabels8: string[] = [''];
    public barChartData8: any[] = [{ data: [], label: '' }];
    public barChartLabels9: string[] = [''];
    public barChartData9: any[] = [{ data: [], label: '' }];
    public barChartLabels10: string[] = [''];
    public barChartData10: any[] = [{ data: [], label: '' }];

    public datosGrafica1 = [];
    public datosGrafica2 = [];
    public labelGrafica1 = [];
    public labelGrafica2 = [];

//}

    constructor(
        private servicio: FormacionAdmService,
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
        this.modelo = new FormacionModel();

    }
    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        this.getDatosModelo();
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
        this.doughnutChartData = [Math.round(this.getMujeresPlantillaPorcentaje()), Math.round(this.getHombresPlantillaPorcentaje())];
        this.asignaPorcentajesPorTipo(this.modelo.preg_199_tabla_3);
        this.barChartLabels1 = this.labelGrafica1;
        this.barChartData1 = this.datosGrafica1;
        this.barChartData2 = this.datosGrafica2;
        this.barChartLabels2 = this.labelGrafica2;
        this.asignaPorcentajesPorTipo(this.modelo.preg_200_tabla_3);
        this.barChartLabels3 = this.labelGrafica1;
        this.barChartData3 = this.datosGrafica1;
        this.barChartData4 = this.datosGrafica2;
        this.barChartLabels4 = this.labelGrafica2;

        this.asignaPorcentajesPorTipo(this.modelo.preg_174_tabla_3);
        this.barChartLabels5 = this.labelGrafica1;
        this.barChartData5 = this.datosGrafica1;
        this.barChartData6 = this.datosGrafica2;
        this.barChartLabels6 = this.labelGrafica2;
        this.asignaPorcentajesGrafica(this.modelo.preg_174_tabla_3);
        this.barChartLabels7 = this.labelGrafica1;
        this.barChartData7 = this.datosGrafica1;
        this.barChartData8 = this.datosGrafica2;
        this.barChartLabels8 = this.labelGrafica2;

        this.asignaPorcentajesPorTipo(this.modelo.preg_195_tabla_3);
        this.barChartLabels9 = this.labelGrafica1;
        this.barChartData9 = this.datosGrafica1;
        this.barChartData10 = this.datosGrafica2;
        this.barChartLabels10 = this.labelGrafica2;
    }


    reinicializaDatosGrafica() {
    this.labelGrafica1 = [];
    this.labelGrafica2 = [];
    this.datosGrafica1 = [];
    this.datosGrafica2 = [];
  }

  asignaPorcentajesGrafica(elemento: any) {
    this.reinicializaDatosGrafica();

    let datam = [];
    let datah = [];
    let data2m = [];
    let data2h = [];

    if (elemento != null) {
      elemento.forEach(element => {
        let porcentajem = Math.round((element.mujeres * 1) / this.funciones.getTotalHombresMujeres(elemento) * 100);
        let porcentajeh = Math.round((element.hombres * 1) / this.funciones.getTotalHombresMujeres(elemento) * 100);

        let mujabs = ((element.mujeres * 1) * this.funciones.getTotalHombresMujeres(elemento)) / this.funciones.getTotalMujeres(elemento);
        let homabs = ((element.hombres * 1) * this.funciones.getTotalHombresMujeres(elemento)) / this.funciones.getTotalHombres(elemento);
        let porcentaje2m = Math.round(mujabs / (mujabs + homabs) * 100);
        let porcentaje2h = Math.round(homabs / (mujabs + homabs) * 100);

        datam.push(porcentajem);
        datah.push(porcentajeh);
        data2m.push(porcentaje2m);
        data2h.push(porcentaje2h);
        this.labelGrafica1.push(element.texto);
        this.labelGrafica2.push(element.texto);
      });
      this.datosGrafica1.push({ data: datam, label: "Mujeres %" });
      this.datosGrafica1.push({ data: datah, label: "Hombres %" });
      this.datosGrafica2.push({ data: data2m, label: "Mujeres %" });
      this.datosGrafica2.push({ data: data2h, label: "Hombres %" });
    }
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

    getTotalCompoPlantilla() {
        let salida = this.modelo.preg_174_tabla_3.mujeres * 1 + this.modelo.preg_174_tabla_3.hombres * 1;
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getMujeresPlantilla() {
        let salida = this.modelo.preg_174_tabla_3.mujeres * 1;
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getMujeresPlantillaPorcentaje() {
        let salida = (this.modelo.preg_174_tabla_3.mujeres * 1) * 100 / ((this.modelo.preg_174_tabla_3.mujeres * 1 + this.modelo.preg_174_tabla_3.hombres * 1));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }

    getHombresPlantilla() {
        let salida = this.modelo.preg_174_tabla_3.hombres * 1;
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }

    getHombresPlantillaPorcentaje() {
        let salida = (this.modelo.preg_174_tabla_3.hombres * 1) * 100 / ((this.modelo.preg_174_tabla_3.mujeres * 1) + (this.modelo.preg_174_tabla_3.hombres * 1));
        if (!isNaN(salida))
            return salida;
        else
            return 0;

    }
}