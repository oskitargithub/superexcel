import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';


import { TipoDeContratoAdmService } from './tipodecontratoadm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { ClasProfesional2Model, Tabla3Model } from '../../dashboard/clasprofesional2/ClasProfesional2.model';

import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'tipodecontratoadm',
  templateUrl: './tipodecontratoadm.template.html',
  styleUrls: ['tipodecontratoadm.style.css',
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [TipoDeContratoAdmService, FuncionesService],
  encapsulation: ViewEncapsulation.None,
})
export class TipoDeContratoAdmComponent implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  config: any;

  public modelo: ClasProfesional2Model;
  public errorMessage: string;
  public status: string;

  public barChartType: string = 'bar';
  public lineChartOptions: any = { responsive: true };
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
  public doughnutChartType: string = 'doughnut';
  public barChartOptions: any = { scaleShowVerticalLines: false, responsive: true };


  /** Gráficas Tipo relación contractual */
  public barChartLabels1: string[] = [''];
  public barChartLegend1: boolean = true;
  public barChartData1: any[] = [{ data: [], label: '' }];

  /** Gráficas Personas contratadas a término definido / eventuales */
  public barChartLabels2: string[] = [''];
  public barChartLegend2: boolean = true;
  public barChartData2: any[] = [{ data: [], label: '' }];

  /** Gráficas Organización del tiempo de trabajo */
  public barChartLabels3: string[] = [''];
  public barChartLegend3: boolean = true;
  public barChartData3: any[] = [{ data: [], label: '' }];
  public barChartLabels4: string[] = [''];
  public barChartLegend4: boolean = true;
  public barChartData4: any[] = [{ data: [], label: '' }];
  public lineChartLabels1: Array<any> = [''];
  public lineChartData1: Array<any> = [{ data: [], label: '' }];
  public lineChartLabels2: Array<any> = [''];
  public lineChartData2: Array<any> = [{ data: [], label: '' }];

  /** Gráficas ANALISIS DE LA ANTIGÜEDAD */
  public barChartLabels5: string[] = [''];
  public barChartLegend5: boolean = true;
  public barChartData5: any[] = [{ data: [], label: '' }];
  public barChartLabels6: string[] = [''];
  public barChartLegend6: boolean = true;
  public barChartData6: any[] = [{ data: [], label: '' }];
  public lineChartLabels3: Array<any> = [''];
  public lineChartData3: Array<any> = [{ data: [], label: '' }];
  public lineChartLabels4: Array<any> = [''];
  public lineChartData4: Array<any> = [{ data: [], label: '' }];

  /** Gráficas Horas Dedicadas al trabajo */
  public barChartLabels7: string[] = [''];
  public barChartLegend7: boolean = true;
  public barChartData7: any[] = [{ data: [], label: '' }];
  public doughnutChartLabels1: string[] = [];
  public doughnutChartData1: number[] = [];
  public doughnutChartLabels2: string[] = [];
  public doughnutChartData2: number[] = [];


  /** Gráficas Turnos */
  public barChartLabels9: string[] = [''];
  public barChartLegend9: boolean = true;
  public barChartData9: any[] = [{ data: [], label: '' }];
  public barChartLabels10: string[] = [''];
  public barChartLegend10: boolean = true;
  public barChartData10: any[] = [{ data: [], label: '' }];


  public datosGrafica1 = [];
  public datosGrafica2 = [];
  public labelGrafica1 = [];
  public labelGrafica2 = [];

  constructor(
    private servicio: TipoDeContratoAdmService,
    public funciones: FuncionesService,
    config: AppConfig,
        private AuthService: AuthService,
        public router: Router,
    injector: Injector
  ) {
    console.log("paso1");
    this.config = config.getConfig();
        if (this.AuthService.usucuest == 0) {
          console.log("paso2");
            let redirect = this.config.urladmin;
            this.router.navigate([redirect]);
        }
        console.log("paso3");
    this.modelo = new ClasProfesional2Model();

  }
 
  ngOnInit(): void {
    Messenger.options = { theme: 'air' }; 
    if (this.AuthService.usucuest != 0) {         
      this.getDatosModelo();
    }
  }

  reinicializaDatosGrafica() {
    this.labelGrafica1 = [];
    this.labelGrafica2 = [];
    this.datosGrafica1 = [];
    this.datosGrafica2 = [];
  }

  getDatosModelo() {
    console.log("trayendo datos modelo");
    this.servicio.getDatosModelo()
      .subscribe(
      response => {

        /** Asignamos las tablas */
        this.modelo = response;
        /** Asignamos los datos para las gráficas */
        this.asignaDatosGraficas();

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
    /** Asignamos los datos para las gráficas */
    this.asignaPorcentajesGrafica(this.modelo.preg_64_tabla_3);
    this.barChartLabels1 = this.labelGrafica1;
    this.barChartData1 = this.datosGrafica1;

    this.asignaPorcentajesGrafica(this.modelo.preg_65_tabla_3);
    this.barChartLabels2 = this.labelGrafica1;
    this.barChartData2 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo(this.modelo.preg_66_tabla_3);
    this.barChartLabels3 = this.labelGrafica1;
    this.barChartData3 = this.datosGrafica1;
    this.barChartData4 = this.datosGrafica2;
    this.barChartLabels4 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo(this.modelo.preg_67_tabla_3);
    this.barChartLabels5 = this.labelGrafica1;
    this.barChartData5 = this.datosGrafica1;
    this.barChartData6 = this.datosGrafica2;
    this.barChartLabels6 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo(this.modelo.preg_68_tabla_3);
    this.barChartLabels7 = this.labelGrafica1;
    this.barChartData7 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo(this.modelo.preg_69_tabla_3);
    this.barChartLabels9 = this.labelGrafica1;
    this.barChartData9 = this.datosGrafica1;
    this.barChartData10 = this.datosGrafica2;
    this.barChartLabels10 = this.labelGrafica2;

    this.asignaPorcentajeDonutHMPlantilla(this.modelo.preg_68_tabla_3);
    this.doughnutChartData1 = this.datosGrafica1;
    this.doughnutChartLabels1 = this.labelGrafica1;
    this.doughnutChartData2 = this.datosGrafica2;
    this.doughnutChartLabels2 = this.labelGrafica2;

    this.asignaPorcentajesGrafLineal(this.modelo.preg_66_tabla_3);
    this.lineChartData1 = this.datosGrafica1;
    this.lineChartLabels1 = this.labelGrafica1;
    this.lineChartData2 = this.datosGrafica2;
    this.lineChartLabels2 = this.labelGrafica2;

    this.asignaPorcentajesGrafLineal(this.modelo.preg_67_tabla_3);
    this.lineChartData3 = this.datosGrafica1;
    this.lineChartLabels3 = this.labelGrafica1;
    this.lineChartData4 = this.datosGrafica2;
    this.lineChartLabels4 = this.labelGrafica2;
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

  asignaPorcentajeDonutHMPlantilla(elemento: any[]) {
    this.reinicializaDatosGrafica();
    if (elemento != null) {
      elemento.forEach(element => {
        let porcentajem = Math.round(this.funciones.getMujeresDeFila(element, elemento) * 100);
        let porcentajeh = Math.round(this.funciones.getHombresDeFila(element, elemento) * 100);
        this.datosGrafica1.push(porcentajem);
        this.datosGrafica2.push(porcentajeh);
        this.labelGrafica1.push('% ' + element.texto);
        this.labelGrafica2.push('% ' + element.texto);
      });
    }
  }

  asignaPorcentajesGrafLineal(tabla: any[]) {
    this.reinicializaDatosGrafica();
    let datam = [];
    let datah = [];
    tabla.forEach(elemento => {
      let mujeres = this.funciones.getMujeresDeFila(elemento, tabla);
      let hombres = this.funciones.getHombresDeFila(elemento, tabla);
      datam.push(Math.round(mujeres * 100));
      datah.push(Math.round(hombres * 100));
      this.labelGrafica1.push(elemento.texto);
      this.labelGrafica2.push(elemento.texto);
    });
    this.datosGrafica1.push({ data: datam, label: "%" }, { data: [], label: '' });
    this.datosGrafica2.push({ data: [], label: '' }, { data: datah, label: "%" });
  }

}