import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';


import { TipoDeContratoAdmService } from './tipodecontratoadm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { ClasProfesional2Model, Tabla3Model } from '../../dashboard/clasprofesional2/ClasProfesional2.model';

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
    public funciones: FuncionesService,
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
    this.funciones.asignaPorcentajes(this.modelo.preg_64_tabla_3, this.barChartData1, null, this.barChartLabels1, null);
    this.funciones.asignaPorcentajes(this.modelo.preg_65_tabla_3, this.barChartData2, null, this.barChartLabels2, null);
    this.funciones.asignaPorcentajesPorTipo(this.modelo.preg_66_tabla_3, this.barChartData3, this.barChartLabels3, this.barChartData4, this.barChartLabels4);
    this.funciones.asignaPorcentajesGrafLineal(this.modelo.preg_66_tabla_3, this.lineChartData1, this.lineChartLabels1, this.lineChartData2, this.lineChartLabels2);
    this.funciones.asignaPorcentajesPorTipo(this.modelo.preg_67_tabla_3, this.barChartData5, this.barChartLabels5, this.barChartData6, this.barChartLabels6);
    this.funciones.asignaPorcentajesGrafLineal(this.modelo.preg_67_tabla_3, this.lineChartData3, this.lineChartLabels3, this.lineChartData4, this.lineChartLabels4);
    this.funciones.asignaPorcentajes(this.modelo.preg_68_tabla_3, this.barChartData7, null, this.barChartLabels7, null);
    this.funciones.asignaPorcentajeDonutHMPlantilla(this.modelo.preg_68_tabla_3, this.doughnutChartData1, this.doughnutChartData2, this.doughnutChartLabels1, this.doughnutChartLabels2);
    this.funciones.asignaPorcentajes(this.modelo.preg_69_tabla_3, this.barChartData9, this.barChartData10, this.barChartLabels9, this.barChartLabels10);
  }

  


}