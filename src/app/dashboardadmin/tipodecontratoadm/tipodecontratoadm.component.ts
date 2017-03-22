import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';

import { TipoDeContratoAdmService } from './tipodecontratoadm.service';
import { ClasProfesional2Model, Tabla3Model } from '../../dashboard/clasprofesional2/ClasProfesional2.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'tipodecontratoadm',
  templateUrl: './tipodecontratoadm.template.html',
  styleUrls: ['tipodecontratoadm.style.css', '../../forms/elements/elements.style.scss', '../../ui-elements/notifications/notifications.style.scss'],
  providers: [TipoDeContratoAdmService],
  encapsulation: ViewEncapsulation.None,
})
export class TipoDeContratoAdmComponent implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;

  public modelo: ClasProfesional2Model;
  public errorMessage: string;
  public status: string;

  public barChartType: string = 'bar';
  public lineChartOptions: any = { responsive: true };
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
  public doughnutChartType: string = 'doughnut';


  /** Gráficas Tipo relación contractual */
  public barChartOptions1: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels1: string[] = [];
  public barChartLegend1: boolean = true;
  public barChartData1: any[] = [];

  /** Gráficas Personas contratadas a término definido / eventuales */
  public barChartOptions2: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels2: string[] = [];
  public barChartLegend2: boolean = true;
  public barChartData2: any[] = [];

  /** Gráficas Organización del tiempo de trabajo */
  public barChartOptions3: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels3: string[] = [];
  public barChartLegend3: boolean = true;
  public barChartData3: any[] = [];
  public barChartOptions4: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels4: string[] = [];
  public barChartLegend4: boolean = true;
  public barChartData4: any[] = [];
  public lineChartLabels1: Array<any> = [];
  public lineChartData1: Array<any> = [];
  public lineChartLabels2: Array<any> = [];
  public lineChartData2: Array<any> = [];

  /** Gráficas ANALISIS DE LA ANTIGÜEDAD */
  public barChartOptions5: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels5: string[] = [];
  public barChartLegend5: boolean = true;
  public barChartData5: any[] = [];
  public barChartOptions6: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels6: string[] = [];
  public barChartLegend6: boolean = true;
  public barChartData6: any[] = [];
  public lineChartLabels3: Array<any> = [];
  public lineChartData3: Array<any> = [];
  public lineChartLabels4: Array<any> = [];
  public lineChartData4: Array<any> = [];

  /** Gráficas Horas Dedicadas al trabajo */
  public barChartOptions7: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels7: string[] = [];
  public barChartLegend7: boolean = true;
  public barChartData7: any[] = [];
  public doughnutChartLabels1: string[] = [];
  public doughnutChartData1: number[] = [];
  public doughnutChartLabels2: string[] = [];
  public doughnutChartData2: number[] = [];


  /** Gráficas Turnos */
  public barChartOptions9: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels9: string[] = [];
  public barChartLegend9: boolean = true;
  public barChartData9: any[] = [];
  public barChartOptions10: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels10: string[] = [];
  public barChartLegend10: boolean = true;
  public barChartData10: any[] = [];

  constructor(
    private servicio: TipoDeContratoAdmService,
    injector: Injector
  ) {
    this.modelo = new ClasProfesional2Model();
    this.getDatosModelo();
  }

  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
  }


  getDatosModelo() {
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
    this.asignaPorcentajes(this.modelo.preg_14_tabla_3, this.barChartData1, null, this.barChartLabels1, null);
    this.asignaPorcentajes(this.modelo.preg_15_tabla_3, this.barChartData2, null, this.barChartLabels2, null);
    this.asignaPorcentajesPorTipo(this.modelo.preg_16_tabla_3, this.barChartData3, this.barChartLabels3, this.barChartData4, this.barChartLabels4);
    this.asignaPorcentajesGrafLineal(this.modelo.preg_16_tabla_3, this.lineChartData1, this.lineChartLabels1, this.lineChartData2, this.lineChartLabels2);
    this.asignaPorcentajesPorTipo(this.modelo.preg_17_tabla_3, this.barChartData5, this.barChartLabels5, this.barChartData6, this.barChartLabels6);
    this.asignaPorcentajesGrafLineal(this.modelo.preg_17_tabla_3, this.lineChartData3, this.lineChartLabels3, this.lineChartData4, this.lineChartLabels4);
    this.asignaPorcentajes(this.modelo.preg_18_tabla_3, this.barChartData7, null, this.barChartLabels7, null);
    this.asignaPorcentajeDonutHMPlantilla(this.modelo.preg_18_tabla_3, this.doughnutChartData1, this.doughnutChartData2, this.doughnutChartLabels1, this.doughnutChartLabels2);
    this.asignaPorcentajes(this.modelo.preg_19_tabla_3, this.barChartData9, this.barChartData10, this.barChartLabels9, this.barChartLabels10);
  }


  asignaPorcentajeDonutHMPlantilla(elemento: Tabla3Model[], grafica1: any, grafica2: any, label1: any, label2: any) {
    elemento.forEach(element => {
      let porcentajem = Math.round(this.getMujeresDeFila(element, elemento) * 100);
      let porcentajeh = Math.round(this.getHombresDeFila(element, elemento) * 100);
      grafica1.push(porcentajem);
      grafica2.push(porcentajeh);
      label1.push('% ' + element.denominacion);
      label2.push('% ' + element.denominacion);
    });
  }

  asignaPorcentajes(elemento: Tabla3Model[], grafica1: any, grafica2: any, label1: any, label2: any) {
    let datam = [];
    let datah = [];
    let data2m = [];
    let data2h = [];
    elemento.forEach(element => {
      let porcentajem = Math.round((element.mujeres * 1) / this.getTotalHombresMujeres(elemento) * 100);
      let porcentajeh = Math.round((element.hombres * 1) / this.getTotalHombresMujeres(elemento) * 100);

      let mujabs = ((element.mujeres * 1) * this.getTotalHombresMujeres(elemento)) / this.getTotalMujeres(elemento);
      let homabs = ((element.hombres * 1) * this.getTotalHombresMujeres(elemento)) / this.getTotalHombres(elemento);
      let porcentaje2m = Math.round(mujabs / (mujabs + homabs) * 100);
      let porcentaje2h = Math.round(homabs / (mujabs + homabs) * 100);

      datam.push(porcentajem);
      datah.push(porcentajeh);
      data2m.push(porcentaje2m);
      data2h.push(porcentaje2h);
      label1.push(element.denominacion);
      if (label2 != null)
        label2.push(element.denominacion);
    });
    grafica1.push({ data: datam, label: "Mujeres %" });
    grafica1.push({ data: datah, label: "Hombres %" });
    if (grafica2 != null) {
      grafica2.push({ data: data2m, label: "Mujeres %" });
      grafica2.push({ data: data2h, label: "Hombres %" });
    }
  }

  asignaPorcentajesPorTipo(tabla: Tabla3Model[], grafica1: any, label1: any, grafica2: any, label2: any) {
    let datam = [];
    let datah = [];
    let data2m = [];
    let data2h = [];
    tabla.forEach(elemento => {
      let mujeres = this.getMujeresDeFila(elemento, tabla);
      let hombres = this.getHombresDeFila(elemento, tabla);
      let mujeres2 = this.getPorcMujeresAbs(elemento, tabla);
      let hombres2 = this.getPorcHombresAbs(elemento, tabla);
      datam.push(Math.round(mujeres * 100));
      datah.push(Math.round(hombres * 100));
      data2m.push(Math.round(mujeres2 * 100));
      data2h.push(Math.round(hombres2 * 100));
      label1.push(elemento.denominacion);
      label2.push(elemento.denominacion);
    });
    grafica1.push({ data: datam, label: "Mujeres %" });
    grafica1.push({ data: datah, label: "Hombres %" });
    grafica2.push({ data: data2m, label: "Mujeres %" });
    grafica2.push({ data: data2h, label: "Hombres %" });
  }

  asignaPorcentajesGrafLineal(tabla: Tabla3Model[], grafica1: any, label1: any, grafica2: any, label2: any) {
    let datam = [];
    let datah = [];
    tabla.forEach(elemento => {
      let mujeres = this.getMujeresDeFila(elemento, tabla);
      let hombres = this.getHombresDeFila(elemento, tabla);
      datam.push(Math.round(mujeres * 100));
      datah.push(Math.round(hombres * 100));
      label1.push(elemento.denominacion);
      label2.push(elemento.denominacion);
    });
    grafica1.push({ data: datam, label: "%" }, { data: [], label: '' });
    grafica2.push({ data: [], label: '' }, { data: datah, label: "%" });
  }


  getTotalHombresMujeres(elemento: Tabla3Model[]) {
    let totalm = elemento.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
    let totalh = elemento.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
    return (totalh * 1 + totalm * 1);
  }
  getTotalMujeres(elemento: Tabla3Model[]) {
    return elemento.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
  }

  getTotalHombres(elemento: Tabla3Model[]) {
    return elemento.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
  }

  getMujeresDelTotal(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = (elemento.mujeres * 1) / (this.getTotalHombresMujeres(tabla));
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getHombresDelTotal(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = (elemento.hombres * 1) / (this.getTotalHombresMujeres(tabla));
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getMujeresDeFila(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = (elemento.mujeres * 1) / ((elemento.mujeres * 1) + (elemento.hombres * 1));
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getHombresDeFila(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = (elemento.hombres * 1) / ((elemento.mujeres * 1) + (elemento.hombres * 1));
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }


  getSumaFila(elemento: Tabla3Model) {
    let salida = (elemento.hombres * 1) + (elemento.mujeres * 1);
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getSumaMujeresDelTotal(tabla: Tabla3Model[]) {
    /**suma de elementos de getMujeresDelTotal */
    let salida = 0;
    tabla.forEach(elemento => {
      salida = salida + this.getMujeresDelTotal(elemento, tabla);
    });
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getSumaHombresDelTotal(tabla: Tabla3Model[]) {
    /**suma de elementos de getMujeresDelTotal */
    let salida = 0;
    tabla.forEach(elemento => {
      salida = salida + this.getHombresDelTotal(elemento, tabla);
    });
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getMujeresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = ((elemento.mujeres * 1) * this.getTotalHombresMujeres(tabla)) / this.getTotalMujeres(tabla);
    if (!isNaN(salida))
      return Math.round(salida);
    else
      return 0;
  }
  getHombresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = ((elemento.hombres * 1) * this.getTotalHombresMujeres(tabla)) / this.getTotalHombres(tabla);
    if (!isNaN(salida))
      return Math.round(salida);
    else
      return 0;
  }

  getTotalAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let item1 = ((elemento.mujeres * 1) * this.getTotalHombresMujeres(tabla)) / this.getTotalMujeres(tabla);
    let item2 = ((elemento.hombres * 1) * this.getTotalHombresMujeres(tabla)) / this.getTotalHombres(tabla);
    let salida = item1 + item2;
    if (!isNaN(salida))
      return Math.round(salida);
    else
      return 0;
  }


  getPorcMujeresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = this.getMujeresAbs(elemento, tabla) / (this.getMujeresAbs(elemento, tabla) + this.getHombresAbs(elemento, tabla));
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }
  getPorcHombresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = this.getHombresAbs(elemento, tabla) / (this.getMujeresAbs(elemento, tabla) + this.getHombresAbs(elemento, tabla));
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }


}