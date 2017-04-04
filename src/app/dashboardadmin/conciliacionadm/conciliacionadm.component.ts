import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { ConciliacionAdmService } from './conciliacionadm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { ConciliacionModel, Tabla3Model } from '../../dashboard/conciliacion/conciliacion.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'conciliacionadm',
  templateUrl: './conciliacionadm.template.html',
  styleUrls: ['conciliacionadm.style.css',
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [ConciliacionAdmService, FuncionesService],
  encapsulation: ViewEncapsulation.None,
})
export class ConciliacionAdmComponent implements OnInit {
  injector: Injector;    
  submitted = false;
  public modelo: ConciliacionModel;
  public errorMessage: string;
  public status: string;

  public barChartType: string = 'bar';
  public barChartOptions: any = { scaleShowVerticalLines: false, responsive: true };

  
  public doughnutChartType: string = 'doughnut';

  public doughnutChartLabels1: string[] = [];
  public doughnutChartData1: number[] = [];
  public doughnutChartLabels2: string[] = [];
  public doughnutChartData2: number[] = [];

  public barChartLabels1: string[] = [''];
  public barChartData1: any[] = [{ data: [], label: '' }];
  
  public barChartLabels2: string[] = [''];
  public barChartData2: any[] = [{ data: [], label: '' }];

  public barChartLabels3: string[] = [''];
  public barChartData3: any[] = [{ data: [], label: '' }];
  public barChartLabels4: string[] = [''];
  public barChartData4: any[] = [{ data: [], label: '' }];

  public barChartLabels5: string[] = [''];
  public barChartData5: any[] = [{ data: [], label: '' }];
  public barChartLabels6: string[] = [''];
  public barChartData6: any[] = [{ data: [], label: '' }];

  public barChartLabels7: string[] = [''];
  public barChartData7: any[] = [{ data: [], label: '' }];
  public barChartLabels8: string[] = [''];
  public barChartData8: any[] = [{ data: [], label: '' }];

  public barChartLabels9: string[] = [''];
  public barChartData9: any[] = [{ data: [], label: '' }];
  public barChartLabels10: string[] = [''];
  public barChartData10: any[] = [{ data: [], label: '' }];

  public barChartLabels11: string[] = [''];
  public barChartData11: any[] = [{ data: [], label: '' }];
  public barChartLabels12: string[] = [''];
  public barChartData12: any[] = [{ data: [], label: '' }];

  public barChartLabels13: string[] = [''];
  public barChartData13: any[] = [{ data: [], label: '' }];
  public barChartLabels14: string[] = [''];
  public barChartData14: any[] = [{ data: [], label: '' }];

  public barChartLabels15: string[] = [''];
  public barChartData15: any[] = [{ data: [], label: '' }];
  public barChartLabels16: string[] = [''];
  public barChartData16: any[] = [{ data: [], label: '' }];

  public datosGrafica1 = [];
  public datosGrafica2 = [];
  public labelGrafica1 = [];
  public labelGrafica2 = [];


  constructor(
    private servicio: ConciliacionAdmService,
    public funciones: FuncionesService,    
    injector: Injector
  ) {
    this.modelo = new ConciliacionModel();
    
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
    this.asignaPorcentajesPorTipo(this.modelo.preg_140_tabla_3);
    this.barChartLabels1 = this.labelGrafica1;
    this.barChartData1 = this.datosGrafica1;    
    this.barChartData2 = this.datosGrafica2;
    this.barChartLabels2 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo(this.modelo.preg_142_tabla_3);
    this.barChartLabels3 = this.labelGrafica1;
    this.barChartData3 = this.datosGrafica1;    
    this.barChartData4 = this.datosGrafica2;
    this.barChartLabels4 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo(this.modelo.preg_143_tabla_3);
    this.barChartLabels5 = this.labelGrafica1;
    this.barChartData5 = this.datosGrafica1;    
    this.barChartData6 = this.datosGrafica2;
    this.barChartLabels6 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo(this.modelo.preg_146_tabla_3);
    this.barChartLabels7 = this.labelGrafica1;
    this.barChartData7 = this.datosGrafica1;    
    this.barChartData8 = this.datosGrafica2;
    this.barChartLabels8 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo(this.modelo.preg_147_tabla_3);
    this.barChartLabels9 = this.labelGrafica1;
    this.barChartData9 = this.datosGrafica1;    
    this.barChartData10 = this.datosGrafica2;
    this.barChartLabels10 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo(this.modelo.preg_148_tabla_3);
    this.barChartLabels11 = this.labelGrafica1;
    this.barChartData11 = this.datosGrafica1;    
    this.barChartData12 = this.datosGrafica2;
    this.barChartLabels12 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo(this.modelo.preg_150_tabla_3);
    this.barChartLabels13 = this.labelGrafica1;
    this.barChartData13 = this.datosGrafica1;    
    this.barChartData14 = this.datosGrafica2;
    this.barChartLabels14 = this.labelGrafica2;

    this.asignaPorcentajesPorTipo(this.modelo.preg_152_tabla_3);
    this.barChartLabels15 = this.labelGrafica1;
    this.barChartData15 = this.datosGrafica1;    
    this.barChartData16 = this.datosGrafica2;
    this.barChartLabels16 = this.labelGrafica2;

    this.asignaPorcentajesDoughnutChart(this.modelo.data.preg_154 ,this.modelo.data.preg_155, "“NORMALIZACIÓN” DE LA VIDA PROFESIONAL TRAS LA ATENCIÓN DE OBLIGACIONES FAMILIARES");
    this.doughnutChartData1 = this.datosGrafica1;
    this.doughnutChartLabels1 = this.labelGrafica1;
    

    this.asignaPorcentajesDoughnutChart(this.modelo.data.preg_157 ,this.modelo.data.preg_158, "¿Cuántos trabajadores/as han sido padres y madres en el último año? Especificar la cantidad por sexo.");
    this.doughnutChartData2 = this.datosGrafica1;
    this.doughnutChartLabels2 = this.labelGrafica1;
    
    
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
    if (tabla != null) {
      tabla.forEach(elemento => {
        let mujeres = this.funciones.getMujeresDeFila(elemento, tabla);
        let hombres = this.funciones.getHombresDeFila(elemento, tabla);
        let mujeres2 = this.funciones.getPorcMujeresAbs(elemento, tabla);
        let hombres2 = this.funciones.getPorcHombresAbs(elemento, tabla);
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

  

  asignaPorcentajesGrafLineal(tabla: any[]) {
    this.reinicializaDatosGrafica();
    let datam = [];
    let datah = [];
    if (tabla != null) {
      tabla.forEach(elemento => {
        let mujeres = this.funciones.getMujeresDeFila(elemento, tabla);
        let hombres = this.funciones.getHombresDeFila(elemento, tabla);
        datam.push(Math.round(mujeres * 100));
        datah.push(Math.round(hombres * 100));
        this.labelGrafica1.push(elemento.texto);
        this.labelGrafica2.push(elemento.texto);
      });
      this.datosGrafica1.push({ data: datam, label: "%" }, { data: [], label: '' });
      this.datosGrafica2.push({ data: [], label: '' }, { data: datah, label: "%" });
    }
  }

  asignaPorcentajesDoughnutChart(mujeres: any, hombres:any, texto:string){
      this.reinicializaDatosGrafica();
      let datam = [];
    let datah = [];
    console.log("grafl m="+mujeres + " /h="+hombres);
    let nmujeres = (mujeres * 1) / ((mujeres * 1) + (hombres * 1));
    if(isNaN(nmujeres)){
        nmujeres = 0;
    }
    let nhombres = (hombres * 1) / ((mujeres * 1) + (hombres * 1));
    if(isNaN(nhombres)){
        nhombres = 0;
    }
    this.datosGrafica1.push(Math.round(nmujeres * 100));
    this.datosGrafica1.push(Math.round(nhombres * 100));
    this.labelGrafica1.push("Madres %");
    this.labelGrafica1.push("Padres %");
  }
}
