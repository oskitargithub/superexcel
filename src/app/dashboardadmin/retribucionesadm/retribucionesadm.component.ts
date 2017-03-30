import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';


import { RetribucionesAdmService } from './retribucionesadm.service';
import { FuncionesT5Service } from '../serviciofunciones/funcionest5.service';
import { RetribucionesModel, Tabla5Model } from '../../dashboard/retribuciones/retribuciones.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'retribucionesadm',
  templateUrl: './retribucionesadm.template.html',
  styleUrls: ['retribucionesadm.style.css',
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [RetribucionesAdmService, FuncionesT5Service],
  encapsulation: ViewEncapsulation.None,
})
export class RetribucionesAdmComponent implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  public modelo: RetribucionesModel;
  public errorMessage: string;
  public status: string;


  public barChartType: string = 'bar';
  public doughnutChartType: string = 'doughnut';
  public barChartOptions: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLegend: boolean = true;

  /** Variables para gráficas punto 1 */
  public barChartLabels1: string[] = [''];
  public barChartData1: any[] = [{ data: [], label: '' }];
  public barChartLabels2: string[] = [''];
  public barChartData2: any[] = [{ data: [], label: '' }];
  public barChartLabels3: string[] = [''];
  public barChartData3: any[] = [{ data: [], label: '' }];
  public barChartLabels4: string[] = [''];
  public barChartData4: any[] = [{ data: [], label: '' }];

  public doughnutChartLabels1: string[] = [];
  public doughnutChartData1: number[] = [];
  public doughnutChartLabels2: string[] = [];
  public doughnutChartData2: number[] = [];
  public doughnutChartLabels3: string[] = [];
  public doughnutChartData3: number[] = [];
  public doughnutChartLabels4: string[] = [];
  public doughnutChartData4: number[] = [];


  /** Variables para gráficas punto 2-- A1 */
  public barChartLabels5: string[] = [''];
  public barChartData5: any[] = [{ data: [], label: '' }];
  public barChartLabels6: string[] = [''];
  public barChartData6: any[] = [{ data: [], label: '' }];
  public barChartLabels7: string[] = [''];
  public barChartData7: any[] = [{ data: [], label: '' }];
  public barChartLabels8: string[] = [''];
  public barChartData8: any[] = [{ data: [], label: '' }];

  public doughnutChartLabels5: string[] = [];
  public doughnutChartData5: number[] = [];
  public doughnutChartLabels6: string[] = [];
  public doughnutChartData6: number[] = [];
  public doughnutChartLabels7: string[] = [];
  public doughnutChartData7: number[] = [];
  public doughnutChartLabels8: string[] = [];
  public doughnutChartData8: number[] = [];


  /** Variables para gráficas punto 2-- A2 */
  public barChartLabels9: string[] = [''];
  public barChartData9: any[] = [{ data: [], label: '' }];
  public barChartLabels10: string[] = [''];
  public barChartData10: any[] = [{ data: [], label: '' }];
  public barChartLabels11: string[] = [''];
  public barChartData11: any[] = [{ data: [], label: '' }];
  public barChartLabels12: string[] = [''];
  public barChartData12: any[] = [{ data: [], label: '' }];

  public doughnutChartLabels9: string[] = [];
  public doughnutChartData9: number[] = [];
  public doughnutChartLabels10: string[] = [];
  public doughnutChartData10: number[] = [];
  public doughnutChartLabels11: string[] = [];
  public doughnutChartData11: number[] = [];
  public doughnutChartLabels12: string[] = [];
  public doughnutChartData12: number[] = [];

  /** Variables para gráficas punto 2-- B */
  public barChartLabels13: string[] = [''];
  public barChartData13: any[] = [{ data: [], label: '' }];
  public barChartLabels14: string[] = [''];
  public barChartData14: any[] = [{ data: [], label: '' }];
  public barChartLabels15: string[] = [''];
  public barChartData15: any[] = [{ data: [], label: '' }];
  public barChartLabels16: string[] = [''];
  public barChartData16: any[] = [{ data: [], label: '' }];

  public doughnutChartLabels13: string[] = [];
  public doughnutChartData13: number[] = [];
  public doughnutChartLabels14: string[] = [];
  public doughnutChartData14: number[] = [];
  public doughnutChartLabels15: string[] = [];
  public doughnutChartData15: number[] = [];
  public doughnutChartLabels16: string[] = [];
  public doughnutChartData16: number[] = [];

  /** Variables para gráficas punto 2-- C1 */
  public barChartLabels17: string[] = [''];
  public barChartData17: any[] = [{ data: [], label: '' }];
  public barChartLabels18: string[] = [''];
  public barChartData18: any[] = [{ data: [], label: '' }];
  public barChartLabels19: string[] = [''];
  public barChartData19: any[] = [{ data: [], label: '' }];
  public barChartLabels20: string[] = [''];
  public barChartData20: any[] = [{ data: [], label: '' }];

  public doughnutChartLabels17: string[] = [];
  public doughnutChartData17: number[] = [];
  public doughnutChartLabels18: string[] = [];
  public doughnutChartData18: number[] = [];
  public doughnutChartLabels19: string[] = [];
  public doughnutChartData19: number[] = [];
  public doughnutChartLabels20: string[] = [];
  public doughnutChartData20: number[] = [];



  /** Variables para gráficas punto 2-- C2 */
  public barChartLabels21: string[] = [''];
  public barChartData21: any[] = [{ data: [], label: '' }];
  public barChartLabels22: string[] = [''];
  public barChartData22: any[] = [{ data: [], label: '' }];
  public barChartLabels23: string[] = [''];
  public barChartData23: any[] = [{ data: [], label: '' }];
  public barChartLabels24: string[] = [''];
  public barChartData24: any[] = [{ data: [], label: '' }];

  public doughnutChartLabels21: string[] = [];
  public doughnutChartData21: number[] = [];
  public doughnutChartLabels22: string[] = [];
  public doughnutChartData22: number[] = [];
  public doughnutChartLabels23: string[] = [];
  public doughnutChartData23: number[] = [];
  public doughnutChartLabels24: string[] = [];
  public doughnutChartData24: number[] = [];


  /** Variables para gráficas punto 2-- C2 */
  public barChartLabels25: string[] = [''];
  public barChartData25: any[] = [{ data: [], label: '' }];
  public barChartLabels26: string[] = [''];
  public barChartData26: any[] = [{ data: [], label: '' }];
  public barChartLabels27: string[] = [''];
  public barChartData27: any[] = [{ data: [], label: '' }];
  public barChartLabels28: string[] = [''];
  public barChartData28: any[] = [{ data: [], label: '' }];

  public doughnutChartLabels25: string[] = [];
  public doughnutChartData25: number[] = [];
  public doughnutChartLabels26: string[] = [];
  public doughnutChartData26: number[] = [];
  public doughnutChartLabels27: string[] = [];
  public doughnutChartData27: number[] = [];
  public doughnutChartLabels28: string[] = [];
  public doughnutChartData28: number[] = [];


  public datosGrafica1 = [];
  public datosGrafica2 = [];
  public labelGrafica1 = [];
  public labelGrafica2 = [];


  constructor(
    private servicio: RetribucionesAdmService,
    public funciones: FuncionesT5Service,
    injector: Injector
  ) {
    this.modelo = new RetribucionesModel();
  }

  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
    this.getDatosModelo();
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

    /**Gráficas retribuciones total */
    this.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_70_tabla_5);
    this.doughnutChartData1 = this.datosGrafica1;
    this.doughnutChartLabels1 = this.labelGrafica1;
    this.doughnutChartData2 = this.datosGrafica2;
    this.doughnutChartLabels2 = this.labelGrafica2;

    this.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_70_tabla_5);
    this.doughnutChartData3 = this.datosGrafica1;
    this.doughnutChartLabels3 = this.labelGrafica1;
    this.doughnutChartData4 = this.datosGrafica2;
    this.doughnutChartLabels4 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo1(this.modelo.preg_70_tabla_5);
    this.barChartLabels1 = this.labelGrafica1;
    this.barChartData1 = this.datosGrafica1;
    this.barChartLabels2 = this.labelGrafica1;
    this.barChartData2 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_70_tabla_5);
    this.barChartLabels3 = this.labelGrafica1;
    this.barChartData3 = this.datosGrafica1;
    this.barChartLabels4 = this.labelGrafica1;
    this.barChartData4 = this.datosGrafica1;

    
    /**Gráficas retribuciones A1 */
    this.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_71_tabla_5);
    this.doughnutChartData5 = this.datosGrafica1;
    this.doughnutChartLabels5 = this.labelGrafica1;
    this.doughnutChartData6 = this.datosGrafica2;
    this.doughnutChartLabels6 = this.labelGrafica2;

    this.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_71_tabla_5);
    this.doughnutChartData7 = this.datosGrafica1;
    this.doughnutChartLabels7 = this.labelGrafica1;
    this.doughnutChartData8 = this.datosGrafica2;
    this.doughnutChartLabels8 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo1(this.modelo.preg_71_tabla_5);
    this.barChartLabels5 = this.labelGrafica1;
    this.barChartData5 = this.datosGrafica1;
    this.barChartLabels6 = this.labelGrafica1;
    this.barChartData6 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_71_tabla_5);
    this.barChartLabels7 = this.labelGrafica1;
    this.barChartData7 = this.datosGrafica1;
    this.barChartLabels8 = this.labelGrafica1;
    this.barChartData8 = this.datosGrafica1;
    

    /**Gráficas retribuciones A2 */
    this.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_72_tabla_5);
    this.doughnutChartData9 = this.datosGrafica1;
    this.doughnutChartLabels9 = this.labelGrafica1;
    this.doughnutChartData10 = this.datosGrafica2;
    this.doughnutChartLabels10 = this.labelGrafica2;

    this.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_72_tabla_5);
    this.doughnutChartData11 = this.datosGrafica1;
    this.doughnutChartLabels11 = this.labelGrafica1;
    this.doughnutChartData12 = this.datosGrafica2;
    this.doughnutChartLabels12 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo1(this.modelo.preg_72_tabla_5);
    this.barChartLabels9 = this.labelGrafica1;
    this.barChartData9 = this.datosGrafica1;
    this.barChartLabels10 = this.labelGrafica1;
    this.barChartData10 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_72_tabla_5);
    this.barChartLabels11 = this.labelGrafica1;
    this.barChartData11 = this.datosGrafica1;
    this.barChartLabels12 = this.labelGrafica1;
    this.barChartData12 = this.datosGrafica1;
    
    /**Gráficas retribuciones B */
    this.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_73_tabla_5);
    this.doughnutChartData13 = this.datosGrafica1;
    this.doughnutChartLabels13 = this.labelGrafica1;
    this.doughnutChartData14 = this.datosGrafica2;
    this.doughnutChartLabels14 = this.labelGrafica2;

    this.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_73_tabla_5);
    this.doughnutChartData15 = this.datosGrafica1;
    this.doughnutChartLabels15 = this.labelGrafica1;
    this.doughnutChartData16 = this.datosGrafica2;
    this.doughnutChartLabels16 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo1(this.modelo.preg_73_tabla_5);
    this.barChartLabels13 = this.labelGrafica1;
    this.barChartData13 = this.datosGrafica1;
    this.barChartLabels14 = this.labelGrafica1;
    this.barChartData14 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_73_tabla_5);
    this.barChartLabels15 = this.labelGrafica1;
    this.barChartData15 = this.datosGrafica1;
    this.barChartLabels16 = this.labelGrafica1;
    this.barChartData16 = this.datosGrafica1;
    
    /**Gráficas retribuciones C1 */
    this.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_74_tabla_5);
    this.doughnutChartData17 = this.datosGrafica1;
    this.doughnutChartLabels17 = this.labelGrafica1;
    this.doughnutChartData18 = this.datosGrafica2;
    this.doughnutChartLabels18 = this.labelGrafica2;

    this.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_74_tabla_5);
    this.doughnutChartData19 = this.datosGrafica1;
    this.doughnutChartLabels19 = this.labelGrafica1;
    this.doughnutChartData20 = this.datosGrafica2;
    this.doughnutChartLabels20 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo1(this.modelo.preg_74_tabla_5);
    this.barChartLabels17 = this.labelGrafica1;
    this.barChartData17 = this.datosGrafica1;
    this.barChartLabels18 = this.labelGrafica1;
    this.barChartData18 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_74_tabla_5);
    this.barChartLabels19 = this.labelGrafica1;
    this.barChartData19 = this.datosGrafica1;
    this.barChartLabels20 = this.labelGrafica1;
    this.barChartData20 = this.datosGrafica1;
    
    /**Gráficas retribuciones C2 */
    this.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_75_tabla_5);
    this.doughnutChartData21 = this.datosGrafica1;
    this.doughnutChartLabels21 = this.labelGrafica1;
    this.doughnutChartData22 = this.datosGrafica2;
    this.doughnutChartLabels22 = this.labelGrafica2;

    this.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_75_tabla_5);
    this.doughnutChartData23 = this.datosGrafica1;
    this.doughnutChartLabels23 = this.labelGrafica1;
    this.doughnutChartData24 = this.datosGrafica2;
    this.doughnutChartLabels24 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo1(this.modelo.preg_75_tabla_5);
    this.barChartLabels21 = this.labelGrafica1;
    this.barChartData21 = this.datosGrafica1;
    this.barChartLabels22 = this.labelGrafica1;
    this.barChartData22 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_75_tabla_5);
    this.barChartLabels23 = this.labelGrafica1;
    this.barChartData23 = this.datosGrafica1;
    this.barChartLabels24 = this.labelGrafica1;
    this.barChartData24 = this.datosGrafica1;
    
    /**Gráficas retribuciones E */
    this.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_76_tabla_5);
    this.doughnutChartData25 = this.datosGrafica1;
    this.doughnutChartLabels25 = this.labelGrafica1;
    this.doughnutChartData26 = this.datosGrafica2;
    this.doughnutChartLabels26 = this.labelGrafica2;

    this.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_76_tabla_5);
    this.doughnutChartData27 = this.datosGrafica1;
    this.doughnutChartLabels27 = this.labelGrafica1;
    this.doughnutChartData28 = this.datosGrafica2;
    this.doughnutChartLabels28 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo1(this.modelo.preg_76_tabla_5);
    this.barChartLabels25 = this.labelGrafica1;
    this.barChartData25 = this.datosGrafica1;
    this.barChartLabels26 = this.labelGrafica1;
    this.barChartData26 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_76_tabla_5);
    this.barChartLabels27 = this.labelGrafica1;
    this.barChartData27 = this.datosGrafica1;
    this.barChartLabels28 = this.labelGrafica1;
    this.barChartData28 = this.datosGrafica1;    
  }






  /** Funciones de cálculo */
  reinicializaDatosGrafica() {
    this.labelGrafica1 = [];
    this.labelGrafica2 = [];
    this.datosGrafica1 = [];
    this.datosGrafica2 = [];
  }


  asignaPorcentajesPorTipo1(tabla: any[]) {
    this.reinicializaDatosGrafica();
    let datam = [];
    let datah = [];
    let data2m = [];
    let data2h = [];
    if (tabla != null) {
      tabla.forEach(elemento => {
        let mujeres = this.funciones.getMujeresDeFila1(elemento, tabla);
        let hombres = this.funciones.getHombresDeFila1(elemento, tabla);
        let mujeres2 = this.funciones.getPorcMujeresAbs1(elemento, tabla);
        let hombres2 = this.funciones.getPorcHombresAbs1(elemento, tabla);
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


  asignaPorcentajesPorTipo2(tabla: any[]) {
    this.reinicializaDatosGrafica();
    let datam = [];
    let datah = [];
    let data2m = [];
    let data2h = [];
    if (tabla != null) {
      tabla.forEach(elemento => {
        let mujeres = this.funciones.getMujeresDeFila2(elemento, tabla);
        let hombres = this.funciones.getHombresDeFila2(elemento, tabla);
        let mujeres2 = this.funciones.getPorcMujeresAbs2(elemento, tabla);
        let hombres2 = this.funciones.getPorcHombresAbs2(elemento, tabla);
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

  asignaPorcentajeDonutHMPlantilla1(elemento: any[]) {
    this.reinicializaDatosGrafica();
    if (elemento != null) {
      elemento.forEach(element => {
        let porcentajem = Math.round(this.funciones.getMujeresDeFila1(element, elemento) * 100);
        let porcentajeh = Math.round(this.funciones.getHombresDeFila1(element, elemento) * 100);
        this.datosGrafica1.push(porcentajem);
        this.datosGrafica2.push(porcentajeh);
        this.labelGrafica1.push('% ' + element.texto);
        this.labelGrafica2.push('% ' + element.texto);
      });
    }
  }
  asignaPorcentajeDonutHMPlantilla2(elemento: any[]) {
    this.reinicializaDatosGrafica();
    if (elemento != null) {
      elemento.forEach(element => {
        let porcentajem = Math.round(this.funciones.getMujeresDeFila2(element, elemento) * 100);
        let porcentajeh = Math.round(this.funciones.getHombresDeFila2(element, elemento) * 100);
        this.datosGrafica1.push(porcentajem);
        this.datosGrafica2.push(porcentajeh);
        this.labelGrafica1.push('% ' + element.texto);
        this.labelGrafica2.push('% ' + element.texto);
      });
    }
  }















}
