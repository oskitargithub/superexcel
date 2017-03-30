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
  providers: [RetribucionesAdm2Service, FuncionesT5Service, FuncionesService],
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
  public barChartLegend: boolean = true;

  /** Variables para gráficas banda 1 y 2 */
  public barChartLabels1: string[] = [''];  
  public barChartData1: any[] = [{ data: [], label: '' }];
  public barChartLabels2: string[] = [''];
  public barChartData2: any[] = [{ data: [], label: '' }];
  public barChartLabels3: string[] = [''];
  public barChartData3: any[] = [{ data: [], label: '' }];
  public barChartLabels4: string[] = [''];
  public barChartData4: any[] = [{ data: [], label: '' }];




  /** Variables para gráficas banda 3 y 4 */
  public barChartLabels5: string[] = [''];
  public barChartData5: any[] = [{ data: [], label: '' }];
  public barChartLabels6: string[] = [''];
  public barChartData6: any[] = [{ data: [], label: '' }];
  public barChartLabels7: string[] = [''];
  public barChartData7: any[] = [{ data: [], label: '' }];
  public barChartLabels8: string[] = [''];
  public barChartData8: any[] = [{ data: [], label: '' }];

  /** Variables para gráficas banda 5 y 6 */
  public barChartLabels9: string[] = [''];
  public barChartData9: any[] = [{ data: [], label: '' }];
  public barChartLabels10: string[] = [''];
  public barChartData10: any[] = [{ data: [], label: '' }];
  public barChartLabels11: string[] = [''];
  public barChartData11: any[] = [{ data: [], label: '' }];
  public barChartLabels12: string[] = [''];
  public barChartData12: any[] = [{ data: [], label: '' }];


  /** Variables para gráficas banda 7 y 8 */
  public barChartLabels13: string[] = [''];
  public barChartData13: any[] = [{ data: [], label: '' }];
  public barChartLabels14: string[] = [''];
  public barChartData14: any[] = [{ data: [], label: '' }];
  public barChartLabels15: string[] = [''];
  public barChartData15: any[] = [{ data: [], label: '' }];
  public barChartLabels16: string[] = [''];
  public barChartData16: any[] = [{ data: [], label: '' }];



  /** Variables para gráficas banda 9 */
  public barChartLabels17: string[] = [''];
  public barChartData17: any[] = [{ data: [], label: '' }];
  public barChartLabels18: string[] = [''];
  public barChartData18: any[] = [{ data: [], label: '' }];


  /** Variables para gráficas banda 10 */
  public barChartLabels19: string[] = [''];
  public barChartData19: any[] = [{ data: [], label: '' }];
  public barChartLabels20: string[] = [''];
  public barChartData20: any[] = [{ data: [], label: '' }];




  /** Variables para gráficas Banda 11 */
  public barChartLabels21: string[] = [''];
  public barChartData21: any[] = [{ data: [], label: '' }];
  public barChartLabels22: string[] = [''];
  public barChartData22: any[] = [{ data: [], label: '' }];

  /** Variables para gráficas Banda 11 */
  public barChartLabels23: string[] = [''];
  public barChartData23: any[] = [{ data: [], label: '' }];
  public barChartLabels24: string[] = [''];
  public barChartData24: any[] = [{ data: [], label: '' }];

  /** Variables para gráficas Banda 11 */
  public barChartLabels25: string[] = [''];
  public barChartData25: any[] = [{ data: [], label: '' }];
  public barChartLabels26: string[] = [''];
  public barChartData26: any[] = [{ data: [], label: '' }];

  public barChartLabels27: string[] = [''];
  public barChartData27: any[] = [{ data: [], label: '' }];
  public barChartLabels28: string[] = [''];
  public barChartData28: any[] = [{ data: [], label: '' }];

  public barChartLabels29: string[] = [''];
  public barChartData29: any[] = [{ data: [], label: '' }];

  public barChartLabels30: string[] = [''];
  public barChartData30: any[] = [{ data: [], label: '' }];
  public barChartLabels31: string[] = [''];
  public barChartData31: any[] = [{ data: [], label: '' }];
  public barChartLabels32: string[] = [''];
  public barChartData32: any[] = [{ data: [], label: '' }];
  public barChartLabels33: string[] = [''];
  public barChartData33: any[] = [{ data: [], label: '' }];

  public datosGrafica1 = [];
  public datosGrafica2 = [];
  public labelGrafica1 = [];
  public labelGrafica2 = [];


  constructor(
    private servicio: RetribucionesAdm2Service,
    public funciones: FuncionesT5Service,
    public funcionest3: FuncionesService,
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
    /**Gráficas -7200 */
    this.asignaPorcentajesPorTipo1(this.modelo.preg_85_tabla_5);
    this.barChartLabels30 = this.labelGrafica1;
    this.barChartData30 = this.datosGrafica1;
    this.barChartLabels31 = this.labelGrafica1;
    this.barChartData31 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_85_tabla_5);
    this.barChartLabels32 = this.labelGrafica1;
    this.barChartData32 = this.datosGrafica1;
    this.barChartLabels33 = this.labelGrafica1;
    this.barChartData33 = this.datosGrafica1;    
    

    /**Gráficas 7001 y 12000 */
    this.asignaPorcentajesPorTipo1(this.modelo.preg_77_tabla_5);
    this.barChartLabels1 = this.labelGrafica1;
    this.barChartData1 = this.datosGrafica1;
    this.barChartLabels2 = this.labelGrafica1;
    this.barChartData2 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_77_tabla_5);
    this.barChartLabels3 = this.labelGrafica1;
    this.barChartData3 = this.datosGrafica1;
    this.barChartLabels4 = this.labelGrafica1;
    this.barChartData4 = this.datosGrafica1;
    

    /**Gráficas 12001 y 14000 */
    this.asignaPorcentajesPorTipo1(this.modelo.preg_78_tabla_5);
    this.barChartLabels5 = this.labelGrafica1;
    this.barChartData5 = this.datosGrafica1;
    this.barChartLabels6 = this.labelGrafica1;
    this.barChartData6 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_78_tabla_5);
    this.barChartLabels7 = this.labelGrafica1;
    this.barChartData7 = this.datosGrafica1;
    this.barChartLabels8 = this.labelGrafica1;
    this.barChartData8 = this.datosGrafica1;

    /**Gráficas 14001 y 18000 */
    this.asignaPorcentajesPorTipo1(this.modelo.preg_79_tabla_5);
    this.barChartLabels9 = this.labelGrafica1;
    this.barChartData9 = this.datosGrafica1;
    this.barChartLabels10 = this.labelGrafica1;
    this.barChartData10 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_79_tabla_5);
    this.barChartLabels11 = this.labelGrafica1;
    this.barChartData11 = this.datosGrafica1;
    this.barChartLabels12 = this.labelGrafica1;
    this.barChartData12 = this.datosGrafica1;

    /**Gráficas 18001 y 24000 */
    this.asignaPorcentajesPorTipo1(this.modelo.preg_80_tabla_5);
    this.barChartLabels13 = this.labelGrafica1;
    this.barChartData13 = this.datosGrafica1;
    this.barChartLabels14 = this.labelGrafica1;
    this.barChartData14 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_80_tabla_5);
    this.barChartLabels15 = this.labelGrafica1;
    this.barChartData15 = this.datosGrafica1;
    this.barChartLabels16 = this.labelGrafica1;
    this.barChartData16 = this.datosGrafica1;

    /**Gráficas 24001 y 30000 */
    this.asignaPorcentajesPorTipo1(this.modelo.preg_81_tabla_5);
    this.barChartLabels17 = this.labelGrafica1;
    this.barChartData17 = this.datosGrafica1;
    this.barChartLabels18 = this.labelGrafica1;
    this.barChartData18 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_81_tabla_5);
    this.barChartLabels19 = this.labelGrafica1;
    this.barChartData19 = this.datosGrafica1;
    this.barChartLabels20 = this.labelGrafica1;
    this.barChartData20 = this.datosGrafica1;
    
    /**Gráficas 30001 y 36000 */
    this.asignaPorcentajesPorTipo1(this.modelo.preg_83_tabla_5);
    this.barChartLabels21 = this.labelGrafica1;
    this.barChartData21 = this.datosGrafica1;
    this.barChartLabels22 = this.labelGrafica1;
    this.barChartData22 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_83_tabla_5);
    this.barChartLabels23 = this.labelGrafica1;
    this.barChartData23 = this.datosGrafica1;
    this.barChartLabels24 = this.labelGrafica1;
    this.barChartData24 = this.datosGrafica1;

    /**Gráficas Más de 36000 */
    this.asignaPorcentajesPorTipo1(this.modelo.preg_84_tabla_5);
    this.barChartLabels25 = this.labelGrafica1;
    this.barChartData25 = this.datosGrafica1;
    this.barChartLabels26 = this.labelGrafica1;
    this.barChartData26 = this.datosGrafica1;

    this.asignaPorcentajesPorTipo2(this.modelo.preg_84_tabla_5);
    this.barChartLabels27 = this.labelGrafica1;
    this.barChartData27 = this.datosGrafica1;
    this.barChartLabels28 = this.labelGrafica1;
    this.barChartData28 = this.datosGrafica1;    
    

    /**Gráficas Compensaciones extrasalariales */
    this.asignaPorcentajesPorTipo(this.modelo.preg_86_tabla_3);
    this.barChartLabels29 = this.labelGrafica1;
    this.barChartData29 = this.datosGrafica1;
  }








  reinicializaDatosGrafica() {
    this.labelGrafica1 = [];
    this.labelGrafica2 = [];
    this.datosGrafica1 = [];
    this.datosGrafica2 = [];
  }

  asignaPorcentajesPorTipo(tabla: any) {
    this.reinicializaDatosGrafica();
    let datam = [];
    let datah = [];
    let data2m = [];
    let data2h = [];
    tabla.forEach(elemento => {
      let mujeres = this.funcionest3.getMujeresDeFila(elemento, tabla);
      let hombres = this.funcionest3.getHombresDeFila(elemento, tabla);
      let mujeres2 = this.funcionest3.getPorcMujeresAbs(elemento, tabla);
      let hombres2 = this.funcionest3.getPorcHombresAbs(elemento, tabla);
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


}
