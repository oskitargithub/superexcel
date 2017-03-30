import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { BajasEIncorpAdmService } from './bajaseincorpadm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { FuncionesT5Service } from '../serviciofunciones/funcionest5.service';
import { FuncionesT4Service } from '../serviciofunciones/funcionest4.service';
import { BajasEIncorpModel, Tabla5Model, Tabla4Model, Tabla3Model } from '../../dashboard/bajaseincorp/bajaseincorp.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'bajaseincorpadm',
  templateUrl: './bajaseincorpadm.template.html',
  styleUrls: ['bajaseincorpadm.style.css',
  '../../scss/elements.style.scss', 
  '../../scss/notifications.style.scss'],
  providers: [BajasEIncorpAdmService, FuncionesT5Service,FuncionesT4Service,FuncionesService],
  encapsulation: ViewEncapsulation.None,
})
export class BajasEIncorpAdmComponent implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  public modelo: BajasEIncorpModel;
  public errorMessage: string;
  public status: string;

  public barChartType: string = 'bar';
  public barChartOptions: any = { scaleShowVerticalLines: false, responsive: true };

  public lineChartOptions: any = { responsive: true };
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';


  public lineChartLabels1: Array<any> = [];
  public lineChartData1: Array<any> = [];
  public lineChartLabels2: Array<any> = [];
  public lineChartData2: Array<any> = [];


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

  
  constructor(
    private servicio: BajasEIncorpAdmService,
    public funciones: FuncionesService,
    public funcionest5: FuncionesT5Service,
    public funcionest4: FuncionesT4Service,
    injector: Injector
  ) {
    this.modelo = new BajasEIncorpModel();
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
        //this.modelo = response;
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
      this.funciones.asignaPorcentajesPorTipo(this.modelo.preg_1_tabla_3, this.barChartData1, this.barChartLabels1, this.barChartData2, this.barChartLabels2);
      this.funcionest5.asignaPorcentajesPorTipo1(this.modelo.preg_2_tabla_5, this.barChartData3, this.barChartLabels3, this.barChartData4, this.barChartLabels4);
      this.funciones.asignaPorcentajesPorTipo(this.modelo.preg_3_tabla_3, this.barChartData5, this.barChartLabels5, this.barChartData6, this.barChartLabels6);
      this.funciones.asignaPorcentajesPorTipo(this.modelo.preg_4_tabla_3, this.barChartData7, this.barChartLabels7, this.barChartData8, this.barChartLabels8);
      this.funciones.asignaPorcentajesGrafLineal(this.modelo.preg_4_tabla_3, this.lineChartData1, this.lineChartLabels1, this.lineChartData2, this.lineChartLabels2);
      this.funcionest4.asignaPorcentajesPorTipo(this.modelo.preg_5_tabla_4, this.barChartData9, this.barChartLabels9, this.barChartData10, this.barChartLabels10);
      this.funciones.asignaPorcentajesPorTipo(this.modelo.preg_6_tabla_3, this.barChartData11, this.barChartLabels11, this.barChartData12, this.barChartLabels12);
  }
}
