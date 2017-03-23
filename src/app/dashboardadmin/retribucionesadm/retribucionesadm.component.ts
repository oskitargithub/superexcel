import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';

import { RetribucionesAdmService } from './retribucionesadm.service';
import { FuncionesT6Service } from '../serviciofunciones/funcionest6.service';
import { RetribucionesModel, Tabla5Model, Tabla6Model } from '../../dashboard/retribuciones/retribuciones.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'retribucionesadm',
  templateUrl: './retribucionesadm.template.html',
  styleUrls: ['retribucionesadm.style.css', '../../forms/elements/elements.style.scss', '../../ui-elements/notifications/notifications.style.scss'],
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
  this.funciones.asignaPorcentajeDonutHMPlantilla1(this.modelo.preg_50_tabla_6, this.doughnutChartData1, this.doughnutChartData2, this.doughnutChartLabels1, this.doughnutChartLabels2);
  this.funciones.asignaPorcentajeDonutHMPlantilla2(this.modelo.preg_50_tabla_6, this.doughnutChartData3, this.doughnutChartData4, this.doughnutChartLabels3, this.doughnutChartLabels4);
  
  this.funciones.asignaPorcentajesPorTipo1(this.modelo.preg_50_tabla_6, this.barChartData1, this.barChartLabels1, this.barChartData2, this.barChartLabels2);
  this.funciones.asignaPorcentajesPorTipo2(this.modelo.preg_50_tabla_6, this.barChartData3, this.barChartLabels3, this.barChartData4, this.barChartLabels4);
}






  /** Funciones de cálculo */
















}
