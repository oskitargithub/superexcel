import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { ClasProfesionalPrAdmService } from './clasprofesionalpradm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { ClasProfesional1PrModel, dataModel, Tabla3Model } from '../../dashboard/clasprofesional1pr/clasprofesional1pr.model';
import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
import { AuthService } from '../../auth/auth.service';
import { AppConfig } from '../../app.config';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'clasprofesionalpradm',
  templateUrl: './clasprofesionalpradm.template.html',
  styleUrls: ['clasprofesionalpradm.style.css',
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [ClasProfesionalPrAdmService, FuncionesService,FuncionesHighChartsT3Service],
  encapsulation: ViewEncapsulation.None,
})
export class ClasProfesionalPrAdmComponent implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  config: any;
  public modelo: ClasProfesional1PrModel;
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



  constructor(
    private servicio: ClasProfesionalPrAdmService,
    public serviciot3: FuncionesService,
    public funccioneshct3:FuncionesHighChartsT3Service,
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

    this.modelo = new ClasProfesional1PrModel();
    this.modelo.data = new dataModel();
  }

  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
    this.getDatosModelo();
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
    let alto = 800;
    /** Asignamos los datos para las gráficas */    
    this.chart1pieoptions = this.funccioneshct3.GraficaPiePlantillaPr(this.modelo, "Distribución por sexo","");
    
    this.chart7options = this.funccioneshct3.GraficaCompuesta1('Puestos directivos', '',this.modelo.preg_390_tabla_3, "total");
    this.chart8options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Puestos directivos', 'Proporcionada',this.modelo.preg_390_tabla_3);


    this.chart1options = this.funccioneshct3.GraficaCompuesta1('Distribución por Departamentos, Servicios y/o Unidades Funcionales', '',this.modelo.preg_391_tabla_3, "total");
    this.chart2options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución por Departamentos, Servicios y/o Unidades Funcionales', 'Proporcionada',this.modelo.preg_391_tabla_3);
    
    this.chart3options = this.funccioneshct3.GraficaCompuesta1('Distribución Puestos de Jefatura', '',this.modelo.preg_392_tabla_3, "total");
    this.chart4options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución Puestos de Jefatura', 'Proporcionada',this.modelo.preg_392_tabla_3);
    
    this.chart23options = this.funccioneshct3.GraficaCompuesta1Mujeres('Distribución Puestos de Jefatura', 'Mujeres',this.modelo.preg_392_tabla_3, "total");
    this.chart24options = this.funccioneshct3.GraficaCompuesta1Hombres('Distribución Puestos de Jefatura', 'Hombres',this.modelo.preg_392_tabla_3, "total");
    
    
    
    this.chart5options = this.funccioneshct3.GraficaCompuesta1('Distribución Puestos de Coordinación / Supervisión', '',this.modelo.preg_393_tabla_3, "total");
    this.chart6options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución Puestos de Coordinación / Supervisión', 'Proporcionada',this.modelo.preg_393_tabla_3);
    this.chart12options = this.funccioneshct3.GraficaCompuesta1('Distribución Grupos Profesionales Técnico', '',this.modelo.preg_394_tabla_3, "total");
    this.chart13options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución Grupos Profesionales Técnico', 'Proporcionada',this.modelo.preg_394_tabla_3); 
    this.chart14options = this.funccioneshct3.GraficaCompuesta1('Distribución Grupos Profesionales Administrativos', '',this.modelo.preg_395_tabla_3, "total");
    this.chart15options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución Grupos Profesionales Administrativos', 'Proporcionada',this.modelo.preg_395_tabla_3);
    this.chart16options = this.funccioneshct3.GraficaCompuesta1('Distribución Grupos profesionales cualificados', '',this.modelo.preg_396_tabla_3, "total");
    this.chart17options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución Grupos profesionales cualificados', 'Proporcionada',this.modelo.preg_396_tabla_3);
    this.chart18options = this.funccioneshct3.GraficaCompuesta1('Distribución Grupos profesionales no cualificados', '',this.modelo.preg_397_tabla_3, "total");
    this.chart19options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución Grupos profesionales no cualificados', 'Proporcionada',this.modelo.preg_397_tabla_3);
   
    this.chart2pieoptions = this.funccioneshct3.GraficaPieCompuesta1("Edad de las mujeres de la plantilla","",this.modelo.preg_383_tabla_3,"total");
    this.chart3pieoptions = this.funccioneshct3.GraficaPieCompuesta2("Edad de los hombres de la plantilla","",this.modelo.preg_383_tabla_3,"total");
    this.chart22options = this.funccioneshct3.GraficaCompuesta1('Comparativo plantilla por edad', '',this.modelo.preg_383_tabla_3);
  }  

  getTotalCompoPlantilla() {
    let salida = this.modelo.data.preg_381 * 1 + this.modelo.data.preg_382 * 1;
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }
  getMujeresPlantilla() {
    let salida = this.modelo.data.preg_381 * 1;
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }
  getMujeresPlantillaPorcentaje() {
    let salida = (this.modelo.data.preg_381 * 1) * 100 / ((this.modelo.data.preg_381 * 1 + this.modelo.data.preg_382 * 1));
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getHombresPlantilla() {
    let salida = this.modelo.data.preg_382 * 1;
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getHombresPlantillaPorcentaje() {
    let salida = (this.modelo.data.preg_382 * 1) * 100 / ((this.modelo.data.preg_381 * 1) + (this.modelo.data.preg_382 * 1));
    if (!isNaN(salida))
      return salida;
    else
      return 0;

  }


  



}