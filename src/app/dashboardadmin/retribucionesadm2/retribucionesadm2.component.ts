import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
/*import { __platform_browser_private__ } from '@angular/platform-browser';*/

import { RetribucionesAdm2Service } from './retribucionesadm2.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { FuncionesT5Service } from '../serviciofunciones/funcionest5.service';
import { RetribucionesModel, Tabla5Model } from '../../dashboard/retribuciones/retribuciones.model';
import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'retribucionesadm2',
  templateUrl: './retribucionesadm2.template.html',
  styleUrls: ['retribucionesadm2.style.css',
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [RetribucionesAdm2Service, FuncionesT5Service, FuncionesService,FuncionesHighChartsT3Service],
  encapsulation: ViewEncapsulation.None,
})
export class RetribucionesAdm2Component implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  config:any;
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
  public chart15options: Object;
  public chart16options: Object;
  public chart17options: Object;

  public chart18options: Object;
  public chart19options: Object;

  public chart1pieoptions: Object;
  public chart2pieoptions: Object;

  constructor(
    private servicio: RetribucionesAdm2Service,
    public funciones: FuncionesT5Service,
    public funcionest3: FuncionesService,
    public funccioneshct3: FuncionesHighChartsT3Service,
    private AuthService: AuthService,
     public router: Router,
    config: AppConfig, 
    injector: Injector
  ) {
    this.config = config.getConfig();
    if (this.AuthService.usucuest == 0) {
      let redirect = this.config.urladmin;
      this.router.navigate([redirect]);
    }
    this.modelo = new RetribucionesModel();
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
    this.chart1options = this.funccioneshct3.GraficaCompuestat5('Distribución BANDA SALARIAL Entre 7.201 y 12.000 € Sin complementos', 'Comparativa por sexo', this.modelo.preg_77_tabla_5,1);
    this.chart2options = this.funccioneshct3.GraficaCompuestat5_2('Distribución BANDA SALARIAL Entre 7.201 y 12.000 € Con complementos', 'Comparativa por sexo', this.modelo.preg_77_tabla_5,1);

    this.chart3options = this.funccioneshct3.GraficaCompuestat5('Distribución BANDA SALARIAL Entre 12.001 y 14.000 € Sin complementos', 'Comparativa por sexo', this.modelo.preg_78_tabla_5,1);
    this.chart4options = this.funccioneshct3.GraficaCompuestat5_2('Distribución BANDA SALARIAL Entre 12.001 y 14.000 € Con complementos', 'Comparativa por sexo', this.modelo.preg_78_tabla_5,1);

    this.chart5options = this.funccioneshct3.GraficaCompuestat5('Distribución BANDA SALARIAL Entre 14.001 y 18.000 € Sin complementos', 'Comparativa por sexo', this.modelo.preg_79_tabla_5,1);
    this.chart6options = this.funccioneshct3.GraficaCompuestat5_2('Distribución BANDA SALARIAL Entre 14.001 y 18.000 € Con complementos', 'Comparativa por sexo', this.modelo.preg_79_tabla_5,1);

    this.chart7options = this.funccioneshct3.GraficaCompuestat5('Distribución BANDA SALARIAL Entre 18.001 y 24.000 € Sin complementos', 'Comparativa por sexo', this.modelo.preg_80_tabla_5,1);
    this.chart8options = this.funccioneshct3.GraficaCompuestat5_2('Distribución BANDA SALARIAL Entre 18.001 y 24.000 € Con complementos', 'Comparativa por sexo', this.modelo.preg_80_tabla_5,1);

    this.chart9options = this.funccioneshct3.GraficaCompuestat5('Distribución BANDA SALARIAL Entre 24.001 y 30.000 € Sin complementos', 'Comparativa por sexo', this.modelo.preg_81_tabla_5,1);
    this.chart10options = this.funccioneshct3.GraficaCompuestat5_2('Distribución BANDA SALARIAL Entre 24.001 y 30.000 € Con complementos', 'Comparativa por sexo', this.modelo.preg_81_tabla_5,1);

    this.chart11options = this.funccioneshct3.GraficaCompuestat5('Distribución BANDA SALARIAL Entre 30.001 y 36.000 € Sin complementos', 'Comparativa por sexo', this.modelo.preg_83_tabla_5,1);
    this.chart12options = this.funccioneshct3.GraficaCompuestat5_2('Distribución BANDA SALARIAL Entre 30.001 y 36.000 € Con complementos', 'Comparativa por sexo', this.modelo.preg_83_tabla_5,1);

    this.chart13options = this.funccioneshct3.GraficaCompuestat5('Distribución BANDA SALARIAL Más de 36.000 € Sin complementos', 'Comparativa por sexo', this.modelo.preg_84_tabla_5,1);
    this.chart14options = this.funccioneshct3.GraficaCompuestat5_2('Distribución BANDA SALARIAL Más de 36.000 € Con complementos', 'Comparativa por sexo', this.modelo.preg_84_tabla_5,1);
    
    this.chart15options = this.funccioneshct3.GraficaCompuesta1("Complementos","",this.modelo.preg_86_tabla_3,"fila",1);
    this.chart1pieoptions = this.funccioneshct3.GraficaPieCompuesta1("Complementos","Mujeres",this.modelo.preg_86_tabla_3);
    this.chart2pieoptions = this.funccioneshct3.GraficaPieCompuesta2("Complementos","Hombres",this.modelo.preg_86_tabla_3);
    
    this.chart16options = this.funccioneshct3.GraficaCompuestat5('Distribución BANDA SALARIAL Menos de 7.200 € Sin complementos', 'Comparativa por sexo', this.modelo.preg_85_tabla_5,1);
    this.chart17options = this.funccioneshct3.GraficaCompuestat5_2('Distribución BANDA SALARIAL Menos de 7.200 € Con complementos', 'Comparativa por sexo', this.modelo.preg_85_tabla_5,1);

    this.chart18options = this.funccioneshct3.GraficaCompuestat5('Retribuciones Sin complementos', 'Comparativa por sexo', this.modelo.preg_700_tabla_5, 1);
    this.chart19options = this.funccioneshct3.GraficaCompuestat5_2('Retribuciones Con complementos', 'Comparativa por sexo', this.modelo.preg_700_tabla_5, 1);
    
  }



}
