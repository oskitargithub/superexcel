import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { ClasProfesionalAdmService } from './clasprofesionaladm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { ClasProfesional1Model, dataModel, Tabla3Model } from '../../dashboard/clasprofesional1/ClasProfesional1.model';
import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'clasprofesionaladm',
  templateUrl: './clasprofesionaladm.template.html',
  styleUrls: ['clasprofesionaladm.style.css',
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [ClasProfesionalAdmService, FuncionesService,FuncionesHighChartsT3Service],
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

  public chart1pieoptions: Object;
  public chart2pieoptions: Object;
  public chart3pieoptions: Object;



  constructor(
    private servicio: ClasProfesionalAdmService,
    public serviciot3: FuncionesService,
    public funccioneshct3:FuncionesHighChartsT3Service,
    injector: Injector
  ) {
    this.modelo = new ClasProfesional1Model();
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
    /** Asignamos los datos para las gráficas */    
    this.chart1pieoptions = this.funccioneshct3.GraficaPiePlantilla(this.modelo, "Distribución de la plantilla por sexo","");
    this.chart1options = this.funccioneshct3.GraficaCompuesta1('Distribución de la plantilla por Departamentos, Servicios y/o Unidades Funcionales', '',this.modelo.preg_48_tabla_3, "total");
    this.chart2options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución de la plantilla por Departamentos, Servicios y/o Unidades Funcionales', 'Proporcionada',this.modelo.preg_48_tabla_3);
    this.chart3options = this.funccioneshct3.GraficaCompuesta1('Distribución de la plantilla Puestos de Jefatura', '',this.modelo.preg_54_tabla_3, "total");
    this.chart4options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución de la plantilla Puestos de Jefatura', 'Proporcionada',this.modelo.preg_54_tabla_3);
    console.log("tabla55");
    console.log(this.modelo.preg_55_tabla_3);
    this.chart5options = this.funccioneshct3.GraficaCompuesta1('Distribución de la plantilla Puestos de Coordinación / Supervisión', '',this.modelo.preg_55_tabla_3, "total");
    this.chart6options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución de la plantilla Puestos de Coordinación / Supervisión', 'Proporcionada',this.modelo.preg_55_tabla_3);
    this.chart7options = this.funccioneshct3.GraficaCompuesta1('Distribución de la plantilla Organos Rectores', '',this.modelo.preg_56_tabla_3, "total");
    this.chart8options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución de la plantilla Organos Rectores', 'Proporcionada',this.modelo.preg_56_tabla_3);
    this.chart10options = this.funccioneshct3.GraficaCompuesta1('Distribución de la plantilla Organos Asesores', '',this.modelo.preg_57_tabla_3, "total");
    this.chart11options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución de la plantilla Organos Asesores', 'Proporcionada',this.modelo.preg_57_tabla_3);
    this.chart12options = this.funccioneshct3.GraficaCompuesta1('Distribución de la plantilla Grupos Profesionales Técnico', '',this.modelo.preg_59_tabla_3, "total");
    this.chart13options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución de la plantilla Grupos Profesionales Técnico', 'Proporcionada',this.modelo.preg_59_tabla_3);    
    this.chart14options = this.funccioneshct3.GraficaCompuesta1('Distribución de la plantilla Grupos Profesionales Administrativos', '',this.modelo.preg_60_tabla_3, "total");
    this.chart15options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución de la plantilla Grupos Profesionales Administrativos', 'Proporcionada',this.modelo.preg_60_tabla_3);
    this.chart16options = this.funccioneshct3.GraficaCompuesta1('Distribución de la plantilla Grupos profesionales no cualificados', '',this.modelo.preg_61_tabla_3, "total");
    this.chart17options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución de la plantilla Grupos profesionales no cualificados', 'Proporcionada',this.modelo.preg_61_tabla_3);
    this.chart18options = this.funccioneshct3.GraficaCompuesta1('Distribución de la plantilla Cuerpos y fuerzas de seguridad', '',this.modelo.preg_62_tabla_3, "total");
    this.chart19options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución de la plantilla Cuerpos y fuerzas de seguridad', 'Proporcionada',this.modelo.preg_62_tabla_3);
    this.chart20options = this.funccioneshct3.GraficaCompuesta1('Distribución de la plantilla Distribución Categoría Agente de Policía', '',this.modelo.preg_63_tabla_3, "total");
    this.chart21options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Distribución de la plantilla Distribución Categoría Agente de Policía', 'Proporcionada',this.modelo.preg_63_tabla_3);


    this.chart2pieoptions = this.funccioneshct3.GraficaPieCompuesta1("Edad de las mujeres de la plantilla","",this.modelo.preg_49_tabla_3,"total");
    this.chart3pieoptions = this.funccioneshct3.GraficaPieCompuesta2("Edad de los hombres de la plantilla","",this.modelo.preg_49_tabla_3,"total");
    this.chart22options = this.funccioneshct3.GraficaCompuesta1('Comparativo plantilla por edad', '',this.modelo.preg_49_tabla_3);
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


  



}