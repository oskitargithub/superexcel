import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
/*import { __platform_browser_private__ } from '@angular/platform-browser';*/

import { RetribucionesAdm2Service } from './retribucionesadm2.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { FuncionesT5Service } from '../serviciofunciones/funcionest5.service';
import { RetribucionesModel, Tabla5Model } from '../../dashboard/retribuciones/retribuciones.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'retribucionesadm2',
  templateUrl: './retribucionesadm2.template.html',
  styleUrls: ['retribucionesadm2.style.css',
  '../../scss/elements.style.scss', 
  '../../scss/notifications.style.scss'],
  providers: [RetribucionesAdm2Service, FuncionesT5Service,FuncionesService],
  encapsulation: ViewEncapsulation.None,
})
export class RetribucionesAdm2Component implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  public modelo: RetribucionesModel;
  public errorMessage: string;
  public status: string;


  public barChartType: string = 'bar';
  public barChartOptions: any = { scaleShowVerticalLines: false, responsive: true };

  /** Variables para gráficas banda 1 y 2 */
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

 


  /** Variables para gráficas banda 3 y 4 */
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

  /** Variables para gráficas banda 5 y 6 */
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

 
  /** Variables para gráficas banda 7 y 8 */
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

 

  /** Variables para gráficas banda 9 */
  public barChartLabels17: string[] = [];
  public barChartLegend17: boolean = true;
  public barChartData17: any[] = [];
  public barChartLabels18: string[] = [];
  public barChartLegend18: boolean = true;
  public barChartData18: any[] = [];


  /** Variables para gráficas banda 10 */
  public barChartLabels19: string[] = [];
  public barChartLegend19: boolean = true;
  public barChartData19: any[] = [];
  public barChartLabels20: string[] = [];
  public barChartLegend20: boolean = true;
  public barChartData20: any[] = [];

  


  /** Variables para gráficas Banda 11 */
  public barChartLabels21: string[] = [];
  public barChartLegend21: boolean = true;
  public barChartData21: any[] = [];
  public barChartLabels22: string[] = [];
  public barChartLegend22: boolean = true;
  public barChartData22: any[] = [];

  /** Variables para gráficas Banda 11 */
  public barChartLabels23: string[] = [];
  public barChartLegend23: boolean = true;
  public barChartData23: any[] = [];
  public barChartLabels24: string[] = [];
  public barChartLegend24: boolean = true;
  public barChartData24: any[] = [];

  /** Variables para gráficas Banda 11 */
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

  public barChartLabels29: string[] = [];
  public barChartLegend29: boolean = true;
  public barChartData29: any[] = [];

  public barChartLabels30: string[] = [];
  public barChartLegend30: boolean = true;
  public barChartData30: any[] = [];
  public barChartLabels31: string[] = [];
  public barChartLegend31: boolean = true;
  public barChartData31: any[] = [];
  public barChartLabels32: string[] = [];
  public barChartLegend32: boolean = true;
  public barChartData32: any[] = [];
  public barChartLabels33: string[] = [];
  public barChartLegend33: boolean = true;
  public barChartData33: any[] = [];


  constructor(
    private servicio: RetribucionesAdm2Service,
    public funciones: FuncionesT5Service,
    public funcionest3: FuncionesService,
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
    /**Gráficas -7200 */
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_85_tabla_5, this.barChartData30, this.barChartLabels30, this.barChartData31, this.barChartLabels31);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_85_tabla_5, this.barChartData32, this.barChartLabels32, this.barChartData33, this.barChartLabels33);

    /**Gráficas 7001 y 12000 */
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_77_tabla_5, this.barChartData1, this.barChartLabels1, this.barChartData2, this.barChartLabels2);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_77_tabla_5, this.barChartData3, this.barChartLabels3, this.barChartData4, this.barChartLabels4);

    /**Gráficas 12001 y 14000 */
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_78_tabla_5, this.barChartData5, this.barChartLabels5, this.barChartData6, this.barChartLabels6);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_78_tabla_5, this.barChartData7, this.barChartLabels7, this.barChartData8, this.barChartLabels8);

    /**Gráficas 14001 y 18000 */
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_79_tabla_5, this.barChartData9, this.barChartLabels9, this.barChartData10, this.barChartLabels10);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_79_tabla_5, this.barChartData11, this.barChartLabels11, this.barChartData12, this.barChartLabels12);

    /**Gráficas 18001 y 24000 */
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_80_tabla_5, this.barChartData13, this.barChartLabels13, this.barChartData14, this.barChartLabels14);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_80_tabla_5, this.barChartData15, this.barChartLabels15, this.barChartData16, this.barChartLabels16);

    /**Gráficas 24001 y 30000 */
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_81_tabla_5, this.barChartData17, this.barChartLabels17, this.barChartData18, this.barChartLabels18);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_81_tabla_5, this.barChartData19, this.barChartLabels19, this.barChartData20, this.barChartLabels20);

    /**Gráficas 30001 y 36000 */
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_83_tabla_5, this.barChartData21, this.barChartLabels21, this.barChartData22, this.barChartLabels22);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_83_tabla_5, this.barChartData23, this.barChartLabels23, this.barChartData24, this.barChartLabels24);

    /**Gráficas Más de 36000 */
    this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_84_tabla_5, this.barChartData25, this.barChartLabels25, this.barChartData26, this.barChartLabels26);
    this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_84_tabla_5, this.barChartData27, this.barChartLabels27, this.barChartData28, this.barChartLabels28);

    /**Gráficas Compensaciones extrasalariales */
    this.funcionest3.asignaPorcentajesPorTipo(this.modelo.preg_86_tabla_3, this.barChartData29, this.barChartLabels29, null, null);
  }


}
