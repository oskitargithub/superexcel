import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';

import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
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
  providers: [RetribucionesAdmService, FuncionesT5Service, FuncionesHighChartsT3Service],
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

  public chart1options: Object;
  public chart2options: Object;
  public chart3options: Object;
  public chart4options: Object;
  public chart5options: Object;
  public chart6options: Object;
  public chart7options: Object;
  public chart8options: Object;
  public chart9options: Object;
  public chart10options: Object;
  public chart11options: Object;
  public chart12options: Object;
  public chart13options: Object;
  public chart14options: Object;

  public chart1pieoptions: Object;
  public chart2pieoptions: Object;
  public chart3pieoptions: Object;
  public chart4pieoptions: Object;

  public chart5pieoptions: Object;
  public chart6pieoptions: Object;
  public chart7pieoptions: Object;
  public chart8pieoptions: Object;

  public chart9pieoptions: Object;
  public chart10pieoptions: Object;
  public chart11pieoptions: Object;
  public chart12pieoptions: Object;
  public chart13pieoptions: Object;
  public chart14pieoptions: Object;
  public chart15pieoptions: Object;
  public chart16pieoptions: Object;
  public chart17pieoptions: Object;
  public chart18pieoptions: Object;
  public chart19pieoptions: Object;
  public chart20pieoptions: Object;
  public chart21pieoptions: Object;
  public chart22pieoptions: Object;
  public chart23pieoptions: Object;
  public chart24pieoptions: Object;
  public chart25pieoptions: Object;
  public chart26pieoptions: Object;
  public chart27pieoptions: Object;
  public chart28pieoptions: Object;


  constructor(
    private servicio: RetribucionesAdmService,
    public funciones: FuncionesT5Service,
    public funccioneshct3: FuncionesHighChartsT3Service,
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
    
    /**
     * GENERAL
     */
    this.chart1options = this.funccioneshct3.GraficaCompuestat5('Retribuciones sin compensaciones extrasalariales', 'Comparativa por sexo', this.modelo.preg_70_tabla_5);
    this.chart2options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones con compensaciones extrasalariales', 'Comparativa por sexo', this.modelo.preg_70_tabla_5);
    this.chart1pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales","Mujeres",this.modelo.preg_70_tabla_5);
    this.chart2pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales","Hombres",this.modelo.preg_70_tabla_5);
    this.chart3pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales","Mujeres",this.modelo.preg_70_tabla_5);
    this.chart4pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales","Hombres",this.modelo.preg_70_tabla_5);

    /**
     * A1
     */
    this.chart3options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Grupo A1 - Sin compensaciones', this.modelo.preg_71_tabla_5);
    this.chart4options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Grupo A1 - Con compensaciones', this.modelo.preg_71_tabla_5);
    this.chart5pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales","Grupo A1 - Mujeres",this.modelo.preg_71_tabla_5);
    this.chart6pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales","Grupo A1 - Hombres",this.modelo.preg_71_tabla_5);
    this.chart7pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales","Grupo A1 - Mujeres",this.modelo.preg_71_tabla_5);
    this.chart8pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales","Grupo A1 - Hombres",this.modelo.preg_71_tabla_5);

    /**
     * A2
     */
    this.chart5options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Grupo A2 - Sin compensaciones', this.modelo.preg_72_tabla_5);
    this.chart6options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Grupo A2 - Con compensaciones', this.modelo.preg_72_tabla_5);
    this.chart9pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales","Grupo A2 - Mujeres",this.modelo.preg_72_tabla_5);
    this.chart10pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales","Grupo A2 - Hombres",this.modelo.preg_72_tabla_5);
    this.chart11pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales","Grupo A2 - Mujeres",this.modelo.preg_72_tabla_5);
    this.chart12pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales","Grupo A2 - Hombres",this.modelo.preg_72_tabla_5);

    /**
     * B
     */
    this.chart7options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Grupo B - Sin compensaciones', this.modelo.preg_73_tabla_5);
    this.chart8options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Grupo B - Con compensaciones', this.modelo.preg_73_tabla_5);
    this.chart13pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales","Grupo B - Mujeres",this.modelo.preg_73_tabla_5);
    this.chart14pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales","Grupo B - Hombres",this.modelo.preg_73_tabla_5);
    this.chart15pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales","Grupo B - Mujeres",this.modelo.preg_73_tabla_5);
    this.chart16pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales","Grupo B - Hombres",this.modelo.preg_73_tabla_5);

    /**
     * C1
     */
    this.chart9options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Grupo C1 - Sin compensaciones', this.modelo.preg_74_tabla_5);
    this.chart10options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Grupo C1 - Con compensaciones', this.modelo.preg_74_tabla_5);
    this.chart17pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales","Grupo C1 - Mujeres",this.modelo.preg_74_tabla_5);
    this.chart18pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales","Grupo C1 - Hombres",this.modelo.preg_74_tabla_5);
    this.chart19pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales","Grupo C1 - Mujeres",this.modelo.preg_74_tabla_5);
    this.chart20pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales","Grupo C1 - Hombres",this.modelo.preg_74_tabla_5);

    /**
     * C2
     */
    this.chart11options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Grupo C2 - Sin compensaciones', this.modelo.preg_75_tabla_5);
    this.chart12options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Grupo C2 - Con compensaciones', this.modelo.preg_75_tabla_5);
    this.chart21pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales","Grupo C2 - Mujeres",this.modelo.preg_75_tabla_5);
    this.chart22pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales","Grupo C2 - Hombres",this.modelo.preg_75_tabla_5);
    this.chart23pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales","Grupo C2 - Mujeres",this.modelo.preg_75_tabla_5);
    this.chart24pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales","Grupo C2 - Hombres",this.modelo.preg_75_tabla_5);

    /**
     * E
     */
    console.log("tabla preg_76_tabla_5");
    console.log(this.modelo.preg_76_tabla_5)
    this.chart13options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Grupo E - Sin compensaciones', this.modelo.preg_76_tabla_5);
    this.chart14options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Grupo E - Con compensaciones', this.modelo.preg_76_tabla_5);
    this.chart25pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales","Grupo E - Mujeres",this.modelo.preg_76_tabla_5);
    this.chart26pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales","Grupo E - Hombres",this.modelo.preg_76_tabla_5);
    this.chart27pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales","Grupo E - Mujeres",this.modelo.preg_76_tabla_5);
    this.chart28pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales","Grupo E - Hombres",this.modelo.preg_76_tabla_5);
  }






  /** Funciones de cálculo */


}
