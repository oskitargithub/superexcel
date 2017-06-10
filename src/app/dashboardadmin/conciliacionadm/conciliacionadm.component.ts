import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { ConciliacionAdmService } from './conciliacionadm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
import { ConciliacionModel,datosModel, Tabla3Model } from '../../dashboard/conciliacion/conciliacion.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'conciliacionadm',
  templateUrl: './conciliacionadm.template.html',
  styleUrls: ['conciliacionadm.style.css',
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [ConciliacionAdmService, FuncionesService,FuncionesHighChartsT3Service],
  encapsulation: ViewEncapsulation.None,
})
export class ConciliacionAdmComponent implements OnInit {
  injector: Injector;    
  submitted = false;
  public modelo: ConciliacionModel;
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
    private servicio: ConciliacionAdmService,
    public funciones: FuncionesService,  
    public funccioneshct3:FuncionesHighChartsT3Service,  
    injector: Injector
  ) {
    this.modelo = new ConciliacionModel();
    this.modelo.data = new datosModel();
    
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
    this.chart1options = this.funccioneshct3.GraficaCompuesta1('Conciliación - Circunstancias familiares', '',this.modelo.preg_140_tabla_3, "fila");
    this.chart2options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Conciliación - Circunstancias familiares', 'Proporcionada',this.modelo.preg_140_tabla_3);
    this.chart3options = this.funccioneshct3.GraficaCompuesta1('Responsabilidades familiares en No. de hijos e hijas', '',this.modelo.preg_142_tabla_3, "fila");
    this.chart4options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Responsabilidades familiares en No. de hijos e hijas', 'Proporcionada',this.modelo.preg_142_tabla_3);
    this.chart5options = this.funccioneshct3.GraficaCompuesta1('Responsabilidades familiares en No. De hijos e hijas con discapacidad', '',this.modelo.preg_143_tabla_3, "fila");
    this.chart6options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Responsabilidades familiares en No. De hijos e hijas con discapacidad', 'Proporcionada',this.modelo.preg_143_tabla_3);
    this.chart7options = this.funccioneshct3.GraficaCompuesta1('Responsabilidades familiares en No. De hijos e hijas por edad', '',this.modelo.preg_146_tabla_3, "fila");
    this.chart8options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Responsabilidades familiares en No. De hijos e hijas por edad', 'Proporcionada',this.modelo.preg_146_tabla_3);
    this.chart9options = this.funccioneshct3.GraficaCompuesta1('Responsabilidades familiares en No. De hijos e hijas por edad con discapacidad', '',this.modelo.preg_147_tabla_3, "fila");
    this.chart10options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Responsabilidades familiares en No. De hijos e hijas por edad con discapacidad', 'Proporcionada',this.modelo.preg_147_tabla_3);
    this.chart11options = this.funccioneshct3.GraficaCompuesta1('Responsabilidades familiares en No. De personas dependientes a cargo (No hijos/as)', '',this.modelo.preg_148_tabla_3, "fila");
    this.chart12options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Responsabilidades familiares en No. De personas dependientes a cargo (No hijos/as)', 'Proporcionada',this.modelo.preg_148_tabla_3);
    
    this.chart13options = this.funccioneshct3.GraficaCompuesta1('Uso mecanismos legales de conciliación', '',this.modelo.preg_150_tabla_3, "fila");
    this.chart14options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Uso mecanismos legales de conciliación', 'Proporcionada',this.modelo.preg_150_tabla_3);
    
    this.chart17options = this.funccioneshct3.GraficaCompuesta1ConOpcion('Uso mecanismos legales de conciliación', 'Flexibilidad horaria',this.modelo.preg_150_tabla_3, "fila" , "Flexibilidad horaria");
    this.chart18options = this.funccioneshct3.GraficaCompuesta1ConOpcion('Uso mecanismos legales de conciliación', 'Permiso para acudir a servicios sanitarios',this.modelo.preg_150_tabla_3, "fila", "Permiso para acudir a servicios sanitarios");
    this.chart19options = this.funccioneshct3.GraficaCompuesta1SinOpciones('Uso mecanismos legales de conciliación', '',this.modelo.preg_150_tabla_3, "fila", 'Flexibilidad horaria', "Permiso para acudir a servicios sanitarios");

    this.chart15options = this.funccioneshct3.GraficaCompuesta1('Recursos para la conciliación establecidos por la organización, número de personas usuarias', '',this.modelo.preg_152_tabla_3, "fila");
    this.chart16options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Recursos para la conciliación establecidos por la organización, número de personas usuarias', 'Proporcionada',this.modelo.preg_152_tabla_3);

    this.chart1pieoptions = this.funccioneshct3.GraficaPieHM("Reincorporaciones tras excedencia por cuidado de hijos/as a puestos de categoría inferior",this.modelo.data.preg_157,this.modelo.data.preg_158);
    this.chart2pieoptions = this.funccioneshct3.GraficaPieHM("¿Cuántos trabajadores/as han sido padres y madres en el último año? Especificar la cantidad por sexo.",this.modelo.data.preg_154,this.modelo.data.preg_155);
  }  
}
