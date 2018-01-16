import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';

import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
import { RetribucionesPrAdmService } from './retribucionespradm.service';
import { FuncionesT5Service } from '../serviciofunciones/funcionest5.service';
import { RetribucionesPrModel, Tabla5Model } from '../../dashboard/retribucionespr/retribucionespr.model';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'retribucionespradm',
  templateUrl: './retribucionespradm.template.html',
  styleUrls: ['retribucionespradm.style.css',
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [RetribucionesPrAdmService, FuncionesT5Service, FuncionesHighChartsT3Service],
  encapsulation: ViewEncapsulation.None,
})
export class RetribucionesPrAdmComponent implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  config: any;
  public modelo: RetribucionesPrModel;
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

  public chart15options: Object;
  public chart16options: Object;
  public chart17options: Object;
  public chart18options: Object;
  public chart19options: Object;
  public chart20options: Object;
  public chart21options: Object;
  public chart22options: Object;
  public chart23options: Object;
  public chart24options: Object;

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

  public chart29pieoptions: Object;
  public chart30pieoptions: Object;
  public chart31pieoptions: Object;
  public chart32pieoptions: Object;
  public chart33pieoptions: Object;
  public chart34pieoptions: Object;
  public chart35pieoptions: Object;
  public chart36pieoptions: Object;
  public chart37pieoptions: Object;
  public chart38pieoptions: Object;
  public chart39pieoptions: Object;
  public chart40pieoptions: Object;
  public chart41pieoptions: Object;
  public chart42pieoptions: Object;
  public chart43pieoptions: Object;
  public chart44pieoptions: Object;
  public chart45pieoptions: Object;
  public chart46pieoptions: Object;
  public chart47pieoptions: Object;
  public chart48pieoptions: Object;


  constructor(
    private servicio: RetribucionesPrAdmService,
    public funciones: FuncionesT5Service,
    public funccioneshct3: FuncionesHighChartsT3Service,
    config: AppConfig,
    private AuthService: AuthService,
    public router: Router,
    injector: Injector
  ) {
    this.config = config.getConfig();
    if (this.AuthService.usucuest == 0) {
      let redirect = this.config.urladmin;
      this.router.navigate([redirect]);
    }
    
      this.modelo = new RetribucionesPrModel();
    
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
    this.chart1options = this.funccioneshct3.GraficaCompuestat5('Retribuciones sin compensaciones extrasalariales', 'Comparativa por sexo', this.modelo.preg_415_tabla_5, 1);
    this.chart2options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones con compensaciones extrasalariales', 'Comparativa por sexo', this.modelo.preg_415_tabla_5, 1);
    this.chart1pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales", "Mujeres", this.modelo.preg_415_tabla_5);
    this.chart2pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales", "Hombres", this.modelo.preg_415_tabla_5);
    this.chart3pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales", "Mujeres", this.modelo.preg_415_tabla_5);
    this.chart4pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales", "Hombres", this.modelo.preg_415_tabla_5);

    /**
     * A1
     */
    this.chart3options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Ingenierías y Licenciaturas (Grados). Personal de alta dirección no incluido en el artículo 1.3.c) del Estatuto de los Trabajadores - Sin compensaciones', this.modelo.preg_416_tabla_5, 1);
    this.chart4options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Ingenierías y Licenciaturas (Grados). Personal de alta dirección no incluido en el artículo 1.3.c) del Estatuto de los Trabajadores - Con compensaciones', this.modelo.preg_416_tabla_5, 1);
    this.chart5pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales", "Mujeres", this.modelo.preg_416_tabla_5);
    this.chart6pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales", "Hombres", this.modelo.preg_416_tabla_5);
    this.chart7pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales", "Mujeres", this.modelo.preg_416_tabla_5);
    this.chart8pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales", "Hombres", this.modelo.preg_416_tabla_5);

    /**
     * A2
     */
    this.chart5options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Ingenierías Técnicas, Puestos de peritación y Ayudantes con Titulación - Sin compensaciones', this.modelo.preg_417_tabla_5, 1);
    this.chart6options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Ingenierías Técnicas, Puestos de peritación y Ayudantes con Titulación - Con compensaciones', this.modelo.preg_417_tabla_5, 1);
    this.chart9pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales", "Mujeres", this.modelo.preg_417_tabla_5);
    this.chart10pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales", "Hombres", this.modelo.preg_417_tabla_5);
    this.chart11pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales", "Mujeres", this.modelo.preg_417_tabla_5);
    this.chart12pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales", "Hombres", this.modelo.preg_417_tabla_5);

    /**
     * B
     */
    this.chart7options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Jefaturas Administrativas y de Taller - Sin compensaciones', this.modelo.preg_418_tabla_5, 1);
    this.chart8options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Jefaturas Administrativas y de Taller - Con compensaciones', this.modelo.preg_418_tabla_5, 1);
    this.chart13pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales", "Mujeres", this.modelo.preg_418_tabla_5);
    this.chart14pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales", "Hombres", this.modelo.preg_418_tabla_5);
    this.chart15pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales", "Mujeres", this.modelo.preg_418_tabla_5);
    this.chart16pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales", "Hombres", this.modelo.preg_418_tabla_5);

    /**
     * C1
     */
    this.chart9options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Ayudantes sin Titulación - Sin compensaciones', this.modelo.preg_419_tabla_5, 1);
    this.chart10options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Ayudantes sin Titulación - Con compensaciones', this.modelo.preg_419_tabla_5, 1);
    this.chart17pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales", "Mujeres", this.modelo.preg_419_tabla_5);
    this.chart18pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales", "Hombres", this.modelo.preg_419_tabla_5);
    this.chart19pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales", "Mujeres", this.modelo.preg_419_tabla_5);
    this.chart20pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales", "Hombres", this.modelo.preg_419_tabla_5);

    /**
     * C2
     */
    this.chart11options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Oficialías Administrativas - Sin compensaciones', this.modelo.preg_420_tabla_5, 1);
    this.chart12options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Oficialías Administrativas - Con compensaciones', this.modelo.preg_420_tabla_5, 1);
    this.chart21pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales", "Mujeres", this.modelo.preg_420_tabla_5);
    this.chart22pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales", "Hombres", this.modelo.preg_420_tabla_5);
    this.chart23pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales", "Mujeres", this.modelo.preg_420_tabla_5);
    this.chart24pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales", "Hombres", this.modelo.preg_420_tabla_5);

    /**
     * E
     */
    this.chart13options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Personal Subalterno - Sin compensaciones', this.modelo.preg_421_tabla_5, 1);
    this.chart14options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Personal Subalterno - Con compensaciones', this.modelo.preg_421_tabla_5, 1);
    this.chart25pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales", "Mujeres", this.modelo.preg_421_tabla_5);
    this.chart26pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales", "Hombres", this.modelo.preg_421_tabla_5);
    this.chart27pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales", "Mujeres", this.modelo.preg_421_tabla_5);
    this.chart28pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales", "Hombres", this.modelo.preg_421_tabla_5);



    /**
     * 694
     */
    this.chart15options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Personal Auxiliar Administrativo - Sin compensaciones', this.modelo.preg_421_tabla_5, 1);
    this.chart16options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Personal Auxiliar Administrativo - Con compensaciones', this.modelo.preg_421_tabla_5, 1);
    this.chart29pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales", "Mujeres", this.modelo.preg_421_tabla_5);
    this.chart30pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales", "Hombres", this.modelo.preg_421_tabla_5);
    this.chart31pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales", "Mujeres", this.modelo.preg_421_tabla_5);
    this.chart32pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales", "Hombres", this.modelo.preg_421_tabla_5);

    /**
     * E
     */
    this.chart17options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Oficiales y Oficialas de primera y segunda  - Sin compensaciones', this.modelo.preg_421_tabla_5, 1);
    this.chart18options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Oficiales y Oficialas de primera y segunda  - Con compensaciones', this.modelo.preg_421_tabla_5, 1);
    this.chart33pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales", "Mujeres", this.modelo.preg_421_tabla_5);
    this.chart34pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales", "Hombres", this.modelo.preg_421_tabla_5);
    this.chart35pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales", "Mujeres", this.modelo.preg_421_tabla_5);
    this.chart36pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales", "Hombres", this.modelo.preg_421_tabla_5);

    /**
     * E
     */
    this.chart19options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Oficiales y Oficialas de tercera y Especialistas  - Sin compensaciones', this.modelo.preg_421_tabla_5, 1);
    this.chart20options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Oficiales y Oficialas de tercera y Especialistas  - Con compensaciones', this.modelo.preg_421_tabla_5, 1);
    this.chart37pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales", "Mujeres", this.modelo.preg_421_tabla_5);
    this.chart38pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales", "Hombres", this.modelo.preg_421_tabla_5);
    this.chart39pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales", "Mujeres", this.modelo.preg_421_tabla_5);
    this.chart40pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales", "Hombres", this.modelo.preg_421_tabla_5);

    /**
     * E
     */
    this.chart21options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Peón / Peona - Sin compensaciones', this.modelo.preg_421_tabla_5, 1);
    this.chart22options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Peón / Peona - Con compensaciones', this.modelo.preg_421_tabla_5, 1);
    this.chart41pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales", "Mujeres", this.modelo.preg_421_tabla_5);
    this.chart42pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales", "Hombres", this.modelo.preg_421_tabla_5);
    this.chart43pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales", "Mujeres", this.modelo.preg_421_tabla_5);
    this.chart44pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales", "Hombres", this.modelo.preg_421_tabla_5);

    /**
     * E
     */
    this.chart23options = this.funccioneshct3.GraficaCompuestat5('Retribuciones salariales Comparativa por sexo ', 'Menores de dieciocho años, cualquiera que sea su categoría profesional - Sin compensaciones', this.modelo.preg_421_tabla_5, 1);
    this.chart24options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones salariales Comparativa por sexo ', 'Menores de dieciocho años, cualquiera que sea su categoría profesional - Con compensaciones', this.modelo.preg_421_tabla_5, 1);
    this.chart45pieoptions = this.funccioneshct3.GraficaPie_t5_1Mujeres("Retribuciones sin compensaciones extrasalariales", "Mujeres", this.modelo.preg_421_tabla_5);
    this.chart46pieoptions = this.funccioneshct3.GraficaPie_t5_1Hombres("Retribuciones sin compensaciones extrasalariales", "Hombres", this.modelo.preg_421_tabla_5);
    this.chart47pieoptions = this.funccioneshct3.GraficaPie_t5_2Mujeres("Retribuciones con compensaciones extrasalariales", "Mujeres", this.modelo.preg_421_tabla_5);
    this.chart48pieoptions = this.funccioneshct3.GraficaPie_t5_2Hombres("Retribuciones con compensaciones extrasalariales", "Hombres", this.modelo.preg_421_tabla_5);
  }






  /** Funciones de cálculo */


}
