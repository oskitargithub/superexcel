import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { TipoDeContratoPrAdmService } from './tipodecontratopradm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { ClasProfesional2PrModel, Tabla3Model } from '../../dashboard/clasprofesional2pr/clasprofesional2pr.model';
import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'tipodecontratopradm',
  templateUrl: './tipodecontratopradm.template.html',
  styleUrls: ['tipodecontratopradm.style.css',
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [TipoDeContratoPrAdmService, FuncionesService, FuncionesHighChartsT3Service],
  encapsulation: ViewEncapsulation.None,
})
export class TipoDeContratoPrAdmComponent implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  config: any;

  public modelo: ClasProfesional2PrModel;
  public errorMessage: string;
  public status: string;

  public chart1options: Object;
  public chart2_1options: Object;
  public chart2_2options: Object;
  public chart2options: Object;
  public chart3options: Object;
  public chart4options: Object;
  public chart5options: Object;
  public chart6options: Object;
  public chart7options: Object;
  public chart8options: Object;
  public chart9options: Object;
  public chart10options: Object;

  public chart1pieoptions: Object;
  public chart2pieoptions: Object;
  public chart3pieoptions: Object;
  public chart4pieoptions: Object;
  public chart5pieoptions: Object;
  public chart6pieoptions: Object;
  public chart7pieoptions: Object;
  public chart8pieoptions: Object;
  

  constructor(
    private servicio: TipoDeContratoPrAdmService,
    public funciones: FuncionesService,
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
    this.modelo = new ClasProfesional2PrModel();    
  }

  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
    if (this.AuthService.usucuest != 0) {
      this.getDatosModelo();
    }
  }

  

  getDatosModelo() {
    console.log("trayendo datos modelo");
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
    this.chart1options = this.funccioneshct3.GraficaCompuesta1('Tipo de relación contractual', '', this.modelo.preg_406_tabla_3, "fila");
    this.chart2_1options = this.funccioneshct3.GraficaCompuesta1('Personas contratados de forma indefinida', '', this.modelo.preg_408_tabla_3, "fila");
    this.chart2_2options = this.funccioneshct3.GraficaCompuesta1('Indefinidas por cambio o conversión de contrato temporal', '', this.modelo.preg_409_tabla_3, "fila");
    this.chart2options = this.funccioneshct3.GraficaCompuesta1('Personas contratadas de manera temporal', '', this.modelo.preg_410_tabla_3, "fila");
    this.chart7options = this.funccioneshct3.GraficaCompuesta1('Comparativo Jornada laboral', '', this.modelo.preg_411_tabla_3, "fila");    
    this.chart3options = this.funccioneshct3.GraficaCompuesta1('Comparativa según el tipo de jornada', '', this.modelo.preg_412_tabla_3, "fila");
    this.chart4options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Comparativa según el tipo de jornada', 'Proporcionado', this.modelo.preg_412_tabla_3);
    this.chart8options = this.funccioneshct3.GraficaCompuesta1('Comparativo por número de turnos', '', this.modelo.preg_413_tabla_3, "fila");
    this.chart9options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Comparativo por número de turnos', 'Proporcionado', this.modelo.preg_413_tabla_3);


    this.chart5options = this.funccioneshct3.GraficaCompuesta1('Distribución de la plantilla por antigüedad Comparativa hombres y mujeres', '', this.modelo.preg_414_tabla_3, "fila");
    this.chart6options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución de la plantilla por antigüedad Comparativa hombres y mujeres', 'Proporcionado', this.modelo.preg_414_tabla_3);

    

    

    this.chart1pieoptions = this.funccioneshct3.GraficaPieCompuesta1("Tipo de contrato según tipo de Jornada","Mujeres",this.modelo.preg_412_tabla_3,"total");
    this.chart2pieoptions = this.funccioneshct3.GraficaPieCompuesta2("Tipo de contrato según tipo de Jornada","Hombres",this.modelo.preg_412_tabla_3, "total");

    this.chart3pieoptions = this.funccioneshct3.GraficaPieCompuesta1("Comparativo de Antigüedad","Mujeres",this.modelo.preg_414_tabla_3,"total");
    this.chart4pieoptions = this.funccioneshct3.GraficaPieCompuesta2("Comparativo de Antigüedad","Hombres",this.modelo.preg_414_tabla_3,"total");

    this.chart5pieoptions = this.funccioneshct3.GraficaPieCompuesta1("Horas dedicadas al Trabajo","Mujeres",this.modelo.preg_411_tabla_3,"fila");
    this.chart6pieoptions = this.funccioneshct3.GraficaPieCompuesta2("Horas dedicadas al Trabajo","Hombres",this.modelo.preg_411_tabla_3,"fila");

    this.chart7pieoptions = this.funccioneshct3.GraficaPieCompuesta1("Comparativo Turnos","Mujeres",this.modelo.preg_413_tabla_3,"total");
    this.chart8pieoptions = this.funccioneshct3.GraficaPieCompuesta2("Comparativo Turnos","Hombres",this.modelo.preg_413_tabla_3,"total");
  }
}