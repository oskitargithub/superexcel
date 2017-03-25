import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';


import { RetribucionesAdmService } from './retribucionesadm.service';
import { FuncionesT6Service } from '../serviciofunciones/funcionest6.service';
import { RetribucionesModel, Tabla5Model, Tabla6Model } from '../../dashboard/retribuciones/retribuciones.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'retribucionesadm',
  templateUrl: './retribucionesadm.template.html',
  styleUrls: ['retribucionesadm.style.css',
  '../../scss/elements.style.scss', 
  '../../scss/notifications.style.scss'],
  providers: [RetribucionesAdmService, FuncionesT6Service],
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

  /** Variables para gráficas punto 1 */
  public barChartLabels1: string[] = [];
  public barChartLegend1: boolean = true;
  public barChartData1: any[] = [];
  public barChartLabels2: string[] = [];
  public barChartLegend2: boolean = true;
  public barChartData2: any[] = [];
  public barChartLabels3: string[] = [];
  public barChartLegend3: boolean = true;
  public barChartData3: any[] = [];
  public barChartLabels4: string[] = [];
  public barChartLegend4: boolean = true;
  public barChartData4: any[] = [];

  public doughnutChartLabels1: string[] = [];
  public doughnutChartData1: number[] = [];
  public doughnutChartLabels2: string[] = [];
  public doughnutChartData2: number[] = [];
  public doughnutChartLabels3: string[] = [];
  public doughnutChartData3: number[] = [];
  public doughnutChartLabels4: string[] = [];
  public doughnutChartData4: number[] = [];


  /** Variables para gráficas punto 2-- A1 */
  public barChartLabels5: string[] = [];
  public barChartLegend5: boolean = true;
  public barChartData5: any[] = [];
  public barChartLabels6: string[] = [];
  public barChartLegend6: boolean = true;
  public barChartData6: any[] = [];
  public barChartLabels7: string[] = [];
  public barChartLegend7: boolean = true;
  public barChartData7: any[] = [];
  public barChartLabels8: string[] = [];
  public barChartLegend8: boolean = true;
  public barChartData8: any[] = [];

  public doughnutChartLabels5: string[] = [];
  public doughnutChartData5: number[] = [];
  public doughnutChartLabels6: string[] = [];
  public doughnutChartData6: number[] = [];
  public doughnutChartLabels7: string[] = [];
  public doughnutChartData7: number[] = [];
  public doughnutChartLabels8: string[] = [];
  public doughnutChartData8: number[] = [];


  /** Variables para gráficas punto 2-- A2 */
  public barChartLabels9: string[] = [];
  public barChartLegend9: boolean = true;
  public barChartData9: any[] = [];
  public barChartLabels10: string[] = [];
  public barChartLegend10: boolean = true;
  public barChartData10: any[] = [];
  public barChartLabels11: string[] = [];
  public barChartLegend11: boolean = true;
  public barChartData11: any[] = [];
  public barChartLabels12: string[] = [];
  public barChartLegend12: boolean = true;
  public barChartData12: any[] = [];

  public doughnutChartLabels9: string[] = [];
  public doughnutChartData9: number[] = [];
  public doughnutChartLabels10: string[] = [];
  public doughnutChartData10: number[] = [];
  public doughnutChartLabels11: string[] = [];
  public doughnutChartData11: number[] = [];
  public doughnutChartLabels12: string[] = [];
  public doughnutChartData12: number[] = [];

  /** Variables para gráficas punto 2-- B */
  public barChartLabels13: string[] = [];
  public barChartLegend13: boolean = true;
  public barChartData13: any[] = [];
  public barChartLabels14: string[] = [];
  public barChartLegend14: boolean = true;
  public barChartData14: any[] = [];
  public barChartLabels15: string[] = [];
  public barChartLegend15: boolean = true;
  public barChartData15: any[] = [];
  public barChartLabels16: string[] = [];
  public barChartLegend16: boolean = true;
  public barChartData16: any[] = [];

  public doughnutChartLabels13: string[] = [];
  public doughnutChartData13: number[] = [];
  public doughnutChartLabels14: string[] = [];
  public doughnutChartData14: number[] = [];
  public doughnutChartLabels15: string[] = [];
  public doughnutChartData15: number[] = [];
  public doughnutChartLabels16: string[] = [];
  public doughnutChartData16: number[] = [];

  /** Variables para gráficas punto 2-- C1 */
  public barChartLabels17: string[] = [];
  public barChartLegend17: boolean = true;
  public barChartData17: any[] = [];
  public barChartLabels18: string[] = [];
  public barChartLegend18: boolean = true;
  public barChartData18: any[] = [];
  public barChartLabels19: string[] = [];
  public barChartLegend19: boolean = true;
  public barChartData19: any[] = [];
  public barChartLabels20: string[] = [];
  public barChartLegend20: boolean = true;
  public barChartData20: any[] = [];

  public doughnutChartLabels17: string[] = [];
  public doughnutChartData17: number[] = [];
  public doughnutChartLabels18: string[] = [];
  public doughnutChartData18: number[] = [];
  public doughnutChartLabels19: string[] = [];
  public doughnutChartData19: number[] = [];
  public doughnutChartLabels20: string[] = [];
  public doughnutChartData20: number[] = [];



  /** Variables para gráficas punto 2-- C2 */
  public barChartLabels21: string[] = [];
  public barChartLegend21: boolean = true;
  public barChartData21: any[] = [];
  public barChartLabels22: string[] = [];
  public barChartLegend22: boolean = true;
  public barChartData22: any[] = [];
  public barChartLabels23: string[] = [];
  public barChartLegend23: boolean = true;
  public barChartData23: any[] = [];
  public barChartLabels24: string[] = [];
  public barChartLegend24: boolean = true;
  public barChartData24: any[] = [];

  public doughnutChartLabels21: string[] = [];
  public doughnutChartData21: number[] = [];
  public doughnutChartLabels22: string[] = [];
  public doughnutChartData22: number[] = [];
  public doughnutChartLabels23: string[] = [];
  public doughnutChartData23: number[] = [];
  public doughnutChartLabels24: string[] = [];
  public doughnutChartData24: number[] = [];


  /** Variables para gráficas punto 2-- C2 */
  public barChartLabels25: string[] = [];
  public barChartLegend25: boolean = true;
  public barChartData25: any[] = [];
  public barChartLabels26: string[] = [];
  public barChartLegend26: boolean = true;
  public barChartData26: any[] = [];
  public barChartLabels27: string[] = [];
  public barChartLegend27: boolean = true;
  public barChartData27: any[] = [];
  public barChartLabels28: string[] = [];
  public barChartLegend28: boolean = true;
  public barChartData28: any[] = [];

  public doughnutChartLabels25: string[] = [];
  public doughnutChartData25: number[] = [];
  public doughnutChartLabels26: string[] = [];
  public doughnutChartData26: number[] = [];
  public doughnutChartLabels27: string[] = [];
  public doughnutChartData27: number[] = [];
  public doughnutChartLabels28: string[] = [];
  public doughnutChartData28: number[] = [];


  constructor(
    private servicio: RetribucionesAdmService,
    public funciones: FuncionesT6Service,
    injector: Injector
  ) {
    this.modelo = new RetribucionesModel();
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




  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
  }


  asignaDatosGraficas() {
    /** Asignamos los datos para las gráficas */

    /**Gráficas retribuciones total */
    this.funciones.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_49_tabla_6, this.doughnutChartData1, this.doughnutChartData2, this.doughnutChartLabels1, this.doughnutChartLabels2);
    this.funciones.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_49_tabla_6, this.doughnutChartData3, this.doughnutChartData4, this.doughnutChartLabels3, this.doughnutChartLabels4);
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_49_tabla_6, this.barChartData1, this.barChartLabels1, this.barChartData2, this.barChartLabels2);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_49_tabla_6, this.barChartData3, this.barChartLabels3, this.barChartData4, this.barChartLabels4);

    /**Gráficas retribuciones A1 */
    this.funciones.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_50_tabla_6,this.doughnutChartData5,this.doughnutChartData6,this.doughnutChartLabels5,this.doughnutChartLabels6);
    this.funciones.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_50_tabla_6, this.doughnutChartData7, this.doughnutChartData8, this.doughnutChartLabels7, this.doughnutChartLabels8);
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_50_tabla_6, this.barChartData5, this.barChartLabels5, this.barChartData6, this.barChartLabels6);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_50_tabla_6, this.barChartData7, this.barChartLabels7, this.barChartData8, this.barChartLabels8);

    /**Gráficas retribuciones A2 */
    this.funciones.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_51_tabla_6,this.doughnutChartData9,this.doughnutChartData10,this.doughnutChartLabels9,this.doughnutChartLabels10);
    this.funciones.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_51_tabla_6, this.doughnutChartData11, this.doughnutChartData12, this.doughnutChartLabels11, this.doughnutChartLabels12);
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_51_tabla_6, this.barChartData9, this.barChartLabels9, this.barChartData10, this.barChartLabels10);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_51_tabla_6, this.barChartData11, this.barChartLabels11, this.barChartData12, this.barChartLabels12);

    /**Gráficas retribuciones B */
    this.funciones.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_52_tabla_6,this.doughnutChartData13,this.doughnutChartData14,this.doughnutChartLabels13,this.doughnutChartLabels14);
    this.funciones.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_52_tabla_6, this.doughnutChartData15, this.doughnutChartData16, this.doughnutChartLabels15, this.doughnutChartLabels16);
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_52_tabla_6, this.barChartData13, this.barChartLabels13, this.barChartData14, this.barChartLabels14);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_52_tabla_6, this.barChartData15, this.barChartLabels15, this.barChartData16, this.barChartLabels16);

    /**Gráficas retribuciones C1 */
    this.funciones.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_53_tabla_6,this.doughnutChartData17,this.doughnutChartData18,this.doughnutChartLabels17,this.doughnutChartLabels18);
    this.funciones.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_53_tabla_6, this.doughnutChartData19, this.doughnutChartData20, this.doughnutChartLabels19, this.doughnutChartLabels20);
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_53_tabla_6, this.barChartData17, this.barChartLabels17, this.barChartData18, this.barChartLabels18);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_53_tabla_6, this.barChartData19, this.barChartLabels19, this.barChartData20, this.barChartLabels20);

    /**Gráficas retribuciones C2 */
    this.funciones.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_54_tabla_6,this.doughnutChartData21,this.doughnutChartData22,this.doughnutChartLabels21,this.doughnutChartLabels22);
    this.funciones.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_54_tabla_6, this.doughnutChartData23, this.doughnutChartData24, this.doughnutChartLabels23, this.doughnutChartLabels24);
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_54_tabla_6, this.barChartData21, this.barChartLabels21, this.barChartData22, this.barChartLabels22);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_54_tabla_6, this.barChartData23, this.barChartLabels23, this.barChartData24, this.barChartLabels24);

    /**Gráficas retribuciones E */
    this.funciones.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_55_tabla_6,this.doughnutChartData25,this.doughnutChartData26,this.doughnutChartLabels25,this.doughnutChartLabels26);
    this.funciones.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_55_tabla_6, this.doughnutChartData27, this.doughnutChartData28, this.doughnutChartLabels27, this.doughnutChartLabels28);
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_55_tabla_6, this.barChartData25, this.barChartLabels25, this.barChartData26, this.barChartLabels26);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_55_tabla_6, this.barChartData27, this.barChartLabels27, this.barChartData28, this.barChartLabels28);
  }






  /** Funciones de cálculo */
















}
