import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';

import { ClasProfesionalAdmService } from './clasprofesionaladm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { ClasProfesional1Model, dataModel, Tabla3Model } from '../../dashboard/clasprofesional1/ClasProfesional1.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'clasprofesionaladm',
  templateUrl: './clasprofesionaladm.template.html',
  styleUrls: ['clasprofesionaladm.style.css',
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [ClasProfesionalAdmService, FuncionesService],
  encapsulation: ViewEncapsulation.None,
})
export class ClasProfesionalAdmComponent implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;

  public modelo: ClasProfesional1Model;
  public errorMessage: string;
  public status: string;

  public datosGrafica1 = [];
  public datosGrafica2 = [];
  public labelGrafica1 = [];
  public labelGrafica2 = [];

  public doughnutChartLabels: string[] = ['% Mujeres', '% Hombres'];
  public doughnutChartData: number[] = [0];// = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';


  public doughnutChartLabels2: string[] = [''];
  public doughnutChartData2: number[] = [0];

  public doughnutChartLabels3: string[] = [''];
  public doughnutChartData3: number[] = [0];





  public barChartType: string = 'bar';

  /** Gráficas Distribución de la plantilla */
  public barChartOptions: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels: string[] = [''];
  public barChartLegend: boolean = true;
  public barChartData: any[] = [{ data: [], label: '' }]; 
  public barChartLabels2: string[] = ['ui1'];
  public barChartLegend2: boolean = true;
  public barChartData2: any[] = [{ data: [], label: '' }];

  /** Gráficas Puestos de Jefatura */
  public barChartLabels3: string[] = [''];
  public barChartLegend3: boolean = true;
  public barChartData3: any[] = [{ data: [], label: '' }];
  public barChartLabels4: string[] = [''];
  public barChartLegend4: boolean = true;
  public barChartData4: any[] = [{ data: [], label: '' }];

  /** Gráficas Puestos de Coordinación */
  public barChartLabels5: string[] = [''];
  public barChartLegend5: boolean = true;
  public barChartData5: any[] = [{ data: [], label: '' }];
  public barChartLabels6: string[] = [''];
  public barChartLegend6: boolean = true;
  public barChartData6: any[] = [{ data: [], label: '' }];

  /** Gráficas Órgano Rector */
  public barChartLabels7: string[] = [''];
  public barChartLegend7: boolean = true;
  public barChartData7: any[] = [{ data: [], label: '' }];
  public barChartLabels8: string[] = [''];
  public barChartLegend8: boolean = true;
  public barChartData8: any[] = [{ data: [], label: '' }];

  /** Gráficas Órgano asesor */
  public barChartLabels9: string[] = [''];
  public barChartLegend9: boolean = true;
  public barChartData9: any[] = [{ data: [], label: '' }];
  public barChartLabels10: string[] = [''];
  public barChartLegend10: boolean = true;
  public barChartData10: any[] = [{ data: [], label: '' }];

  /** Gráficas Grupos Profesionales Técnico */
  public barChartLabels11: string[] = [''];
  public barChartLegend11: boolean = true;
  public barChartData11: any[] = [{ data: [], label: '' }];
  public barChartLabels12: string[] = [''];
  public barChartLegend12: boolean = true;
  public barChartData12: any[] = [{ data: [], label: '' }];


  /** Gráficas Grupos profesionales Administrativos */
  public barChartLabels13: string[] = [''];
  public barChartLegend13: boolean = true;
  public barChartData13: any[] = [{ data: [], label: '' }];
  public barChartLabels14: string[] = [''];
  public barChartLegend14: boolean = true;
  public barChartData14: any[] = [{ data: [], label: '' }];

  /** Gráficas Grupo profesionales no cualificados */
  public barChartLabels15: string[] = [''];
  public barChartLegend15: boolean = true;
  public barChartData15: any[] = [{ data: [], label: '' }];
  public barChartLabels16: string[] = [''];
  public barChartLegend16: boolean = true;
  public barChartData16: any[] = [{ data: [], label: '' }];

  /** Gráficas Cuerpos y fuerzas de seguridad */
  public barChartLabels17: string[] = [''];
  public barChartLegend17: boolean = true;
  public barChartData17: any[] = [{ data: [], label: '' }];
  public barChartLabels18: string[] = [''];
  public barChartLegend18: boolean = true;
  public barChartData18: any[] = [{ data: [], label: '' }];

  /** Gráficas Distribución Categoría Agente de Policía */
  public barChartLabels19: string[] = [''];
  public barChartLegend19: boolean = true;
  public barChartData19: any[] = [{ data: [], label: '' }];
  public barChartLabels20: string[] = [''];
  public barChartLegend20: boolean = true;
  public barChartData20: any[] = [{ data: [], label: '' }];

  /** Comparativo de plantilla por edad */
  public barChartLabels21: string[] = [''];
  public barChartLegend21: boolean = true;
  public barChartData21: any[] = [{ data: [], label: '' }];






  constructor(
    private servicio: ClasProfesionalAdmService,
    public serviciot3: FuncionesService,
    injector: Injector
  ) {
    this.modelo = new ClasProfesional1Model();
    this.modelo.data = new dataModel();
  }



  getDatosModelo() {
    this.servicio.getDatosModelo()
      .subscribe(
      response => {
        //this.clasprofesional1.id = response.id;
        this.modelo.data = response.data;
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
    this.asignaPorcentajesGrafica(this.modelo.preg_48_tabla_3);
    this.barChartLabels = this.labelGrafica1;
    this.barChartLabels2 = this.labelGrafica2;
    this.barChartData = this.datosGrafica1;
    this.barChartData2 = this.datosGrafica2;

    this.asignaPorcentajesGrafica(this.modelo.preg_54_tabla_3);
    this.barChartLabels3 = this.labelGrafica1;
    this.barChartLabels4 = this.labelGrafica2;
    this.barChartData3 = this.datosGrafica1;
    this.barChartData4 = this.datosGrafica2;

    this.asignaPorcentajesGrafica(this.modelo.preg_55_tabla_3);
    this.barChartLabels5 = this.labelGrafica1;
    this.barChartLabels6 = this.labelGrafica2;
    this.barChartData5 = this.datosGrafica1;
    this.barChartData6 = this.datosGrafica2;

    this.asignaPorcentajesGrafica(this.modelo.preg_56_tabla_3);
    this.barChartLabels7 = this.labelGrafica1;
    this.barChartLabels8 = this.labelGrafica2;
    this.barChartData7 = this.datosGrafica1;
    this.barChartData8 = this.datosGrafica2;

    this.asignaPorcentajesGrafica(this.modelo.preg_57_tabla_3);
    this.barChartLabels9 = this.labelGrafica1;
    this.barChartLabels10 = this.labelGrafica2;
    this.barChartData9 = this.datosGrafica1;
    this.barChartData10 = this.datosGrafica2;

    this.asignaPorcentajesGrafica(this.modelo.preg_59_tabla_3);
    this.barChartLabels11 = this.labelGrafica1;
    this.barChartLabels12 = this.labelGrafica2;
    this.barChartData11 = this.datosGrafica1;
    this.barChartData12 = this.datosGrafica2;

    this.asignaPorcentajesGrafica(this.modelo.preg_60_tabla_3);
    this.barChartLabels13 = this.labelGrafica1;
    this.barChartLabels14 = this.labelGrafica2;
    this.barChartData13 = this.datosGrafica1;
    this.barChartData14 = this.datosGrafica2;

    this.asignaPorcentajesGrafica(this.modelo.preg_61_tabla_3);
    this.barChartLabels15 = this.labelGrafica1;
    this.barChartLabels16 = this.labelGrafica2;
    this.barChartData15 = this.datosGrafica1;
    this.barChartData16 = this.datosGrafica2;

    this.asignaPorcentajesGrafica(this.modelo.preg_62_tabla_3);
    this.barChartLabels17 = this.labelGrafica1;
    this.barChartLabels18 = this.labelGrafica2;
    this.barChartData17 = this.datosGrafica1;
    this.barChartData18 = this.datosGrafica2;

    this.asignaPorcentajesGrafica(this.modelo.preg_63_tabla_3);
    this.barChartLabels19 = this.labelGrafica1;
    this.barChartLabels20 = this.labelGrafica2;
    this.barChartData19 = this.datosGrafica1;
    this.barChartData20 = this.datosGrafica2;

    this.asignaPorcentajesGrafica(this.modelo.preg_49_tabla_3);
    this.barChartLabels21 = this.labelGrafica1;
    this.barChartData21 = this.datosGrafica1;

    this.asignaPorcentajeDoughnut(this.modelo.preg_49_tabla_3);
    this.doughnutChartData2 = this.datosGrafica1;
    this.doughnutChartLabels2 = this.labelGrafica1;
    this.doughnutChartData3 = this.datosGrafica2;
    this.doughnutChartLabels3 = this.labelGrafica2;



    this.doughnutChartData = [Math.round(this.getMujeresPlantillaPorcentaje()), Math.round(this.getHombresPlantillaPorcentaje())];
  }

  asignaPorcentajeDoughnut(elemento: any) {
    this.reinicializaDatosGrafica();
    if (elemento != null) {
      elemento.forEach(element => {
        let porcentajem = Math.round((element.mujeres * 1) / this.serviciot3.getTotalHombresMujeres(elemento) * 100);
        this.datosGrafica1.push(porcentajem);
        this.labelGrafica1.push('% ' + element.texto);
        let porcentajeh = Math.round((element.hombres * 1) / this.serviciot3.getTotalHombresMujeres(elemento) * 100);
        this.datosGrafica2.push(porcentajeh);
        this.labelGrafica2.push('% ' + element.texto);

      });
    }
  }  


  reinicializaDatosGrafica() {
    this.labelGrafica1 = [];
    this.labelGrafica2 = [];
    this.datosGrafica1 = [];
    this.datosGrafica2 = [];
  }

  asignaPorcentajesGrafica(elemento: any) {
    this.reinicializaDatosGrafica();

    let datam = [];
    let datah = [];
    let data2m = [];
    let data2h = [];

    if (elemento != null) {
      elemento.forEach(element => {
        let porcentajem = Math.round((element.mujeres * 1) / this.serviciot3.getTotalHombresMujeres(elemento) * 100);
        let porcentajeh = Math.round((element.hombres * 1) / this.serviciot3.getTotalHombresMujeres(elemento) * 100);

        let mujabs = ((element.mujeres * 1) * this.serviciot3.getTotalHombresMujeres(elemento)) / this.serviciot3.getTotalMujeres(elemento);
        let homabs = ((element.hombres * 1) * this.serviciot3.getTotalHombresMujeres(elemento)) / this.serviciot3.getTotalHombres(elemento);
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


  getTotalCompoPlantilla() {
    let salida = this.modelo.data.preg_46 * 1 + this.modelo.data.preg_47 * 1;
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }
  getMujeresPlantilla() {
    let salida = this.modelo.data.preg_46 * 1;
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }
  getMujeresPlantillaPorcentaje() {
    let salida = (this.modelo.data.preg_46 * 1) * 100 / ((this.modelo.data.preg_46 * 1 + this.modelo.data.preg_47 * 1));
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getHombresPlantilla() {
    let salida = this.modelo.data.preg_47 * 1;
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getHombresPlantillaPorcentaje() {
    let salida = (this.modelo.data.preg_47 * 1) * 100 / ((this.modelo.data.preg_46 * 1) + (this.modelo.data.preg_47 * 1));
    if (!isNaN(salida))
      return salida;
    else
      return 0;

  }


  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
    this.getDatosModelo();
  }



}