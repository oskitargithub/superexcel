import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';

import { ClasProfesionalAdmService } from './clasprofesionaladm.service';
import { ClasProfesional1Model, dataModel, Tabla3Model } from '../../dashboard/clasprofesional1/ClasProfesional1.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'clasprofesionaladm',
  templateUrl: './clasprofesionaladm.template.html',
  styleUrls: ['clasprofesionaladm.style.css', '../../forms/elements/elements.style.scss', '../../ui-elements/notifications/notifications.style.scss'],
  providers: [ClasProfesionalAdmService],
  encapsulation: ViewEncapsulation.None,
})
export class ClasProfesionalAdmComponent implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;

  public clasprofesional1: ClasProfesional1Model;
  public errorMessage: string;
  public status: string;



  public doughnutChartLabels: string[] = ['% Mujeres', '% Hombres'];
  public doughnutChartData: number[];// = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';


  public doughnutChartLabels2: string[] = [];
  public doughnutChartData2: number[] = [];

  public doughnutChartLabels3: string[] = [];
  public doughnutChartData3: number[] = [];





  public barChartType: string = 'bar';

  /** Gráficas Distribución de la plantilla */
  public barChartOptions: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels: string[] = [];
  public barChartLegend: boolean = true;
  public barChartData: any[] = [];
  public barChartOptions2: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels2: string[] = [];
  public barChartLegend2: boolean = true;
  public barChartData2: any[] = [];

  /** Gráficas Puestos de Jefatura */
  public barChartOptions3: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels3: string[] = [];
  public barChartLegend3: boolean = true;
  public barChartData3: any[] = [];
  public barChartOptions4: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels4: string[] = [];
  public barChartLegend4: boolean = true;
  public barChartData4: any[] = [];

  /** Gráficas Puestos de Coordinación */
  public barChartOptions5: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels5: string[] = [];
  public barChartLegend5: boolean = true;
  public barChartData5: any[] = [];
  public barChartOptions6: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels6: string[] = [];
  public barChartLegend6: boolean = true;
  public barChartData6: any[] = [];

  /** Gráficas Órgano Rector */
  public barChartOptions7: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels7: string[] = [];
  public barChartLegend7: boolean = true;
  public barChartData7: any[] = [];
  public barChartOptions8: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels8: string[] = [];
  public barChartLegend8: boolean = true;
  public barChartData8: any[] = [];

  /** Gráficas Órgano asesor */
  public barChartOptions9: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels9: string[] = [];
  public barChartLegend9: boolean = true;
  public barChartData9: any[] = [];
  public barChartOptions10: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels10: string[] = [];
  public barChartLegend10: boolean = true;
  public barChartData10: any[] = [];

  /** Gráficas Grupos Profesionales Técnico */
  public barChartOptions11: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels11: string[] = [];
  public barChartLegend11: boolean = true;
  public barChartData11: any[] = [];
  public barChartOptions12: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels12: string[] = [];
  public barChartLegend12: boolean = true;
  public barChartData12: any[] = [];


  /** Gráficas Grupos profesionales Administrativos */
  public barChartOptions13: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels13: string[] = [];
  public barChartLegend13: boolean = true;
  public barChartData13: any[] = [];
  public barChartOptions14: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels14: string[] = [];
  public barChartLegend14: boolean = true;
  public barChartData14: any[] = [];

  /** Gráficas Grupo profesionales no cualificados */
  public barChartOptions15: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels15: string[] = [];
  public barChartLegend15: boolean = true;
  public barChartData15: any[] = [];
  public barChartOptions16: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels16: string[] = [];
  public barChartLegend16: boolean = true;
  public barChartData16: any[] = [];

  /** Gráficas Cuerpos y fuerzas de seguridad */
  public barChartOptions17: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels17: string[] = [];
  public barChartLegend17: boolean = true;
  public barChartData17: any[] = [];
  public barChartOptions18: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels18: string[] = [];
  public barChartLegend18: boolean = true;
  public barChartData18: any[] = [];

  /** Gráficas Distribución Categoría Agente de Policía */
  public barChartOptions19: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels19: string[] = [];
  public barChartLegend19: boolean = true;
  public barChartData19: any[] = [];
  public barChartOptions20: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels20: string[] = [];
  public barChartLegend20: boolean = true;
  public barChartData20: any[] = [];

  /** Comparativo de plantilla por edad */
  public barChartOptions21: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels21: string[] = [];
  public barChartLegend21: boolean = true;
  public barChartData21: any[] = [];






  constructor(
    private clasprofesionalservice: ClasProfesionalAdmService,
    injector: Injector
  ) {
    this.clasprofesional1 = new ClasProfesional1Model();
    this.getClasProfesional();


    //
    // This is a hack on angular style loader to prevent ng2-select2 from adding its styles.
    // They are hard-coded into the component, so there are no other way to get rid of them
    //
    this.domSharedStylesHost = injector.get(__platform_browser_private__.DomSharedStylesHost);
    this.domSharedStylesHost.__onStylesAdded__ = this.domSharedStylesHost.onStylesAdded;
    this.domSharedStylesHost.onStylesAdded = (additions) => {
      const style = additions[0];
      if (!style || !style.trim().startsWith('.select2-container')) {
        this.domSharedStylesHost.__onStylesAdded__(additions);
      }
    };

  }





  getClasProfesional() {
    this.clasprofesionalservice.getClasProfesional()
      .subscribe(
      response => {
        console.log("datos formu");
        this.clasprofesional1.id = response.id;
        this.clasprofesional1.data = response.data;
        this.doughnutChartData = [Math.round(this.getMujeresPlantillaPorcentaje()), Math.round(this.getHombresPlantillaPorcentaje())];

        /** Asignamos las tablas */
        this.clasprofesional1 = response;

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
    this.asignaPorcentajes(this.clasprofesional1.preg_3_tabla_3, this.barChartData, this.barChartData2, this.barChartLabels, this.barChartLabels2);
    this.asignaPorcentajes(this.clasprofesional1.preg_5_tabla_3, this.barChartData3, this.barChartData4, this.barChartLabels3, this.barChartLabels4);
    this.asignaPorcentajes(this.clasprofesional1.preg_6_tabla_3, this.barChartData5, this.barChartData6, this.barChartLabels5, this.barChartLabels6);
    this.asignaPorcentajes(this.clasprofesional1.preg_7_tabla_3, this.barChartData7, this.barChartData8, this.barChartLabels7, this.barChartLabels8);
    this.asignaPorcentajes(this.clasprofesional1.preg_8_tabla_3, this.barChartData9, this.barChartData10, this.barChartLabels9, this.barChartLabels10);
    this.asignaPorcentajes(this.clasprofesional1.preg_9_tabla_3, this.barChartData11, this.barChartData12, this.barChartLabels11, this.barChartLabels12);
    this.asignaPorcentajes(this.clasprofesional1.preg_10_tabla_3, this.barChartData13, this.barChartData14, this.barChartLabels13, this.barChartLabels14);
    this.asignaPorcentajes(this.clasprofesional1.preg_11_tabla_3, this.barChartData15, this.barChartData16, this.barChartLabels15, this.barChartLabels16);
    this.asignaPorcentajes(this.clasprofesional1.preg_12_tabla_3, this.barChartData17, this.barChartData18, this.barChartLabels17, this.barChartLabels18);
    this.asignaPorcentajes(this.clasprofesional1.preg_13_tabla_3, this.barChartData19, this.barChartData20, this.barChartLabels19, this.barChartLabels20);

    this.asignaPorcentajes(this.clasprofesional1.preg_4_tabla_3, this.barChartData21, null, this.barChartLabels21, null);

    this.asignaPorcentajeDonutHMPlantilla(this.clasprofesional1.preg_4_tabla_3,this.doughnutChartData2,this.doughnutChartData3,this.doughnutChartLabels2,this.doughnutChartLabels3 );
  }

  asignaPorcentajeDonutHMPlantilla(elemento: Tabla3Model[], grafica1: any,grafica2: any, label1: any, label2: any){
    elemento.forEach(element => {
      let porcentajem = Math.round((element.mujeres * 1) / this.getTotalHombresMujeres(elemento) * 100);
      let porcentajeh = Math.round((element.hombres * 1) / this.getTotalHombresMujeres(elemento) * 100);
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
      if(label2!= null)
        label2.push(element.denominacion);
    });
    grafica1.push({ data: datam, label: "Mujeres %" });
    grafica1.push({ data: datah, label: "Hombres %" });
    if(grafica2 != null){
      grafica2.push({ data: data2m, label: "Mujeres %" });
      grafica2.push({ data: data2h, label: "Hombres %" });
    }
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

  getMujeresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = ((elemento.mujeres * 1) * this.getTotalHombresMujeres(tabla)) / this.getTotalMujeres(tabla);
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }
  getHombresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = ((elemento.hombres * 1) * this.getTotalHombresMujeres(tabla)) / this.getTotalHombres(tabla);
    if (!isNaN(salida))
      return salida;
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


  getTotalCompoPlantilla() {
    return (this.clasprofesional1.data.preg_5 * 1 + this.clasprofesional1.data.preg_6 * 1);
  }
  getMujeresPlantilla() {
    return (this.clasprofesional1.data.preg_5 * 1);
  }
  getMujeresPlantillaPorcentaje() {
    return ((this.clasprofesional1.data.preg_5 * 1) * 100 / (this.clasprofesional1.data.preg_5 * 1 + this.clasprofesional1.data.preg_6 * 1));
  }
  getHombresPlantilla() {
    return (this.clasprofesional1.data.preg_6 * 1);
  }
  getHombresPlantillaPorcentaje() {
    return (this.clasprofesional1.data.preg_6 * 1) * 100 / (this.clasprofesional1.data.preg_5 * 1 + this.clasprofesional1.data.preg_6 * 1);
  }


  /*
  getTotalMujeres(){
      return this.preg_3_tabla_3.value.map(c=>c.mujeres).reduce((sum,current) => (sum*1)+(current*1));
  }*/


  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
  }



}