import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { BajasEIncorpAdmService } from './bajaseincorpadm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { FuncionesT5Service } from '../serviciofunciones/funcionest5.service';
import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
import { BajasEIncorpModel, Tabla5Model, Tabla3Model } from '../../dashboard/bajaseincorp/bajaseincorp.model';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'bajaseincorpadm',
  templateUrl: './bajaseincorpadm.template.html',
  styleUrls: ['bajaseincorpadm.style.css',
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [BajasEIncorpAdmService, FuncionesT5Service, FuncionesService,FuncionesHighChartsT3Service],
  encapsulation: ViewEncapsulation.None
})
export class BajasEIncorpAdmComponent implements OnInit {
  config: any;
  injector: Injector;    
  submitted = false;
  public modelo: BajasEIncorpModel;
  public errorMessage: string;
  public status: string;

 
//{ Declaracion de variables de gráficas
  public chart1options: Object;
  public chart2options: Object;
  public chart3options: Object;
  public chart4options: Object;
  public chart5options: Object;
  public chart6options: Object;
  public chart7options: Object;
  public chart7pieoptions: Object;
  public chart8pieoptions: Object;
  public chart8options: Object;
  public chart9options: Object;
  public chart10options: Object;
  public chart11options: Object;
  public chart12options: Object;
//}
 


 
  constructor(config: AppConfig,
   private AuthService: AuthService,
    private servicio: BajasEIncorpAdmService,
    public router: Router,
    public funciones: FuncionesService,
    public funcionest5: FuncionesT5Service,
    public funccioneshct3:FuncionesHighChartsT3Service,
    injector: Injector
  ) {
    this.config = config.getConfig();
        if (this.AuthService.usucuest == 0) {
            let redirect = this.config.urladmin;
            this.router.navigate([redirect]);
        }
    this.modelo = new BajasEIncorpModel();
    
  }
  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
    this.getDatosModelo();
  }

  getDatosModelo() {
    this.servicio.getDatosModelo()
      .subscribe(
      response => {
        

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
          this.modelo = response;
        this.asignaDatosGraficas();
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
    this.chart1options = this.funccioneshct3.GraficaCompuesta1('Baja en la organización en los dos últimos años', '',this.modelo.preg_120_tabla_3);
    this.chart2options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Baja en la organización en los dos últimos años', 'Proporcionada',this.modelo.preg_120_tabla_3);
    this.chart3options = this.funccioneshct3.GraficaCompuestat5('Incorporaciones', '',this.modelo.preg_121_tabla_5);
    this.chart4options = this.funccioneshct3.GraficaCompuestat5Proporcionada('Incorporaciones', 'Proporcionada',this.modelo.preg_121_tabla_5);
    this.chart5options = this.funccioneshct3.GraficaCompuesta1('Incorporaciones último año por tipo de contrato', '',this.modelo.preg_122_tabla_3);
    this.chart6options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Incorporaciones último año por tipo de contrato', 'Proporcionada',this.modelo.preg_122_tabla_3);
    this.chart7options = this.funccioneshct3.GraficaCompuesta1('Incorporaciones último año por categoría', '',this.modelo.preg_123_tabla_3);
    this.chart8options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Incorporaciones último año por categoría', 'Proporcionada',this.modelo.preg_123_tabla_3);
    this.chart7pieoptions = this.funccioneshct3.GraficaPieCompuesta1('Incorporaciones último año por categoría Mujeres', '',this.modelo.preg_123_tabla_3);
    this.chart8pieoptions = this.funccioneshct3.GraficaPieCompuesta2('Incorporaciones último año por categoría Hombres', '',this.modelo.preg_123_tabla_3);
    this.chart9options = this.funccioneshct3.GraficaCompuesta1('BAJAS DEFINITIVAS ÚLTIMO AÑO POR GRUPO DE EDAD', '',this.modelo.preg_124_tabla_3);
    this.chart10options = this.funccioneshct3.GraficaCompuesta1Proporcionada('BAJAS DEFINITIVAS ÚLTIMO AÑO POR GRUPO DE EDAD', 'Proporcionada',this.modelo.preg_124_tabla_3);
    this.chart11options = this.funccioneshct3.GraficaCompuesta1('BAJAS TEMPORALES ÚLTIMO AÑO', '',this.modelo.preg_125_tabla_3);
    this.chart12options = this.funccioneshct3.GraficaCompuesta1Proporcionada('BAJAS TEMPORALES ÚLTIMO AÑO', 'Proporcionada',this.modelo.preg_125_tabla_3);
  }

  ordenaanyo(index,item){
      //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
     console.log(item);
     console.log(index);
      return item.mujeres;
     }
}
