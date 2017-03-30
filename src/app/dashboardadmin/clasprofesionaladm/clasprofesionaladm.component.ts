import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';

import { ClasProfesionalAdmService } from './clasprofesionaladm.service';
import { ClasProfesional1Model, dataModel, Tabla3Model } from '../../dashboard/clasprofesional1/ClasProfesional1.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'clasprofesionaladm',
  templateUrl: './clasprofesionaladm.template.html',
  styleUrls: ['clasprofesionaladm.style.css',
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [ClasProfesionalAdmService],
  encapsulation: ViewEncapsulation.None,
})
export class ClasProfesionalAdmComponent implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;

  public clasprofesional1: ClasProfesional1Model;
  public errorMessage: string;
  public status: string;



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
  public barChartLabels: string[] = ['ui'];
  public barChartLegend: boolean = true;
  public barChartData: any[] = [{data: [], label: ''}];
  public barChartOptions2: any = { scaleShowVerticalLines: false, responsive: true };
  public barChartLabels2: string[] = ['ui1'];
  public barChartLegend2: boolean = true;
  public barChartData2: any[] = [{data: [], label: ''}];

  /** Gráficas Puestos de Jefatura */
  public barChartOptions3: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels3: string[] = [''];
  public barChartLegend3: boolean = true;
  public barChartData3: any[] = ['100'];
  public barChartOptions4: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels4: string[] = [''];
  public barChartLegend4: boolean = true;
  public barChartData4: any[] = ['100'];

  /** Gráficas Puestos de Coordinación */
  public barChartOptions5: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels5: string[] = [''];
  public barChartLegend5: boolean = true;
  public barChartData5: any[] = ['100'];
  public barChartOptions6: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels6: string[] = [''];
  public barChartLegend6: boolean = true;
  public barChartData6: any[] = ['100'];

  /** Gráficas Órgano Rector */
  public barChartOptions7: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels7: string[] = [''];
  public barChartLegend7: boolean = true;
  public barChartData7: any[] = ['100'];
  public barChartOptions8: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels8: string[] = [''];
  public barChartLegend8: boolean = true;
  public barChartData8: any[] = ['100'];

  /** Gráficas Órgano asesor */
  public barChartOptions9: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels9: string[] = [''];
  public barChartLegend9: boolean = true;
  public barChartData9: any[] = ['100'];
  public barChartOptions10: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels10: string[] = [''];
  public barChartLegend10: boolean = true;
  public barChartData10: any[] = ['100'];

  /** Gráficas Grupos Profesionales Técnico */
  public barChartOptions11: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels11: string[] = [''];
  public barChartLegend11: boolean = true;
  public barChartData11: any[] = ['100'];
  public barChartOptions12: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels12: string[] = [''];
  public barChartLegend12: boolean = true;
  public barChartData12: any[] = ['100'];


  /** Gráficas Grupos profesionales Administrativos */
  public barChartOptions13: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels13: string[] = [''];
  public barChartLegend13: boolean = true;
  public barChartData13: any[] = ['100'];
  public barChartOptions14: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels14: string[] = [''];
  public barChartLegend14: boolean = true;
  public barChartData14: any[] = ['100'];

  /** Gráficas Grupo profesionales no cualificados */
  public barChartOptions15: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels15: string[] = [''];
  public barChartLegend15: boolean = true;
  public barChartData15: any[] = ['100'];
  public barChartOptions16: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels16: string[] = [''];
  public barChartLegend16: boolean = true;
  public barChartData16: any[] = ['100'];

  /** Gráficas Cuerpos y fuerzas de seguridad */
  public barChartOptions17: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels17: string[] = [''];
  public barChartLegend17: boolean = true;
  public barChartData17: any[] = ['100'];
  public barChartOptions18: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels18: string[] = [''];
  public barChartLegend18: boolean = true;
  public barChartData18: any[] = ['100'];

  /** Gráficas Distribución Categoría Agente de Policía */
  public barChartOptions19: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels19: string[] = [''];
  public barChartLegend19: boolean = true;
  public barChartData19: any[] = ['100'];
  public barChartOptions20: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels20: string[] = [''];
  public barChartLegend20: boolean = true;
  public barChartData20: any[] = ['100'];

  /** Comparativo de plantilla por edad */
  public barChartOptions21: any = { scaleShowVerticalLines: true, responsive: true };
  public barChartLabels21: string[] = [''];
  public barChartLegend21: boolean = true;
  public barChartData21: any[] = [''];






  constructor(
    private clasprofesionalservice: ClasProfesionalAdmService,
    injector: Injector
  ) {
    this.clasprofesional1 = new ClasProfesional1Model();
    this.clasprofesional1.data = new dataModel();
   // this.InicializaDatos();
    //this.asignaDatosGraficas();

  }


  InicializaDatos() {
    this.clasprofesional1.preg_48_tabla_3 = [{"respuesta": "","texto": "","mujeres": "","hombres": ""}];
    this.clasprofesional1.preg_49_tabla_3 = [{"respuesta": "","texto": "","mujeres": "","hombres": ""}];
    this.clasprofesional1.preg_54_tabla_3 = [{"respuesta": "","texto": "","mujeres": "","hombres": ""}];
    this.clasprofesional1.preg_55_tabla_3 = [{"respuesta": "","texto": "","mujeres": "","hombres": ""}];
    this.clasprofesional1.preg_56_tabla_3 = [{"respuesta": "","texto": "","mujeres": "","hombres": ""}];
    this.clasprofesional1.preg_57_tabla_3 = [{"respuesta": "","texto": "","mujeres": "","hombres": ""}];
    this.clasprofesional1.preg_59_tabla_3 = [{"respuesta": "","texto": "","mujeres": "","hombres": ""}];
    this.clasprofesional1.preg_60_tabla_3 = [{"respuesta": "","texto": "","mujeres": "","hombres": ""}];
    this.clasprofesional1.preg_61_tabla_3 = [{"respuesta": "","texto": "","mujeres": "","hombres": ""}];
    this.clasprofesional1.preg_62_tabla_3 = [{"respuesta": "","texto": "","mujeres": "","hombres": ""}];
    this.clasprofesional1.preg_63_tabla_3 = [{"respuesta": "","texto": "","mujeres": "","hombres": ""}];
  }



  getClasProfesional() {
    this.clasprofesionalservice.getDatosModelo()
      .subscribe(
      response => {
        console.log("datos formu");
        
        //this.clasprofesional1.id = response.id;
        this.clasprofesional1.data = response.data;
        

        /** Asignamos las tablas */
        this.clasprofesional1 = response;

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
   


    let datos1 = [];
    let datos2 = [];
    let label1 = [];
    let label2 = [];
    this.asignaPorcentajes(this.clasprofesional1.preg_48_tabla_3, datos1, datos2, label1, label2);
    
    this.barChartLabels = label1;
    this.barChartLabels2 = label2;
    this.barChartData=datos1;
    this.barChartData2 = datos2;
    console.log("labels");
    console.log(label1);
     console.log(this.barChartLabels);
    
    
   
    /*
    this.doughnutChartData = [Math.round(this.getMujeresPlantillaPorcentaje()), Math.round(this.getHombresPlantillaPorcentaje())];
    
    this.asignaPorcentajes(this.clasprofesional1.preg_54_tabla_3, this.barChartData3, this.barChartData4, this.barChartLabels3, this.barChartLabels4);
    this.asignaPorcentajes(this.clasprofesional1.preg_55_tabla_3, this.barChartData5, this.barChartData6, this.barChartLabels5, this.barChartLabels6);
    this.asignaPorcentajes(this.clasprofesional1.preg_56_tabla_3, this.barChartData7, this.barChartData8, this.barChartLabels7, this.barChartLabels8);
    this.asignaPorcentajes(this.clasprofesional1.preg_57_tabla_3, this.barChartData9, this.barChartData10, this.barChartLabels9, this.barChartLabels10);
    this.asignaPorcentajes(this.clasprofesional1.preg_59_tabla_3, this.barChartData11, this.barChartData12, this.barChartLabels11, this.barChartLabels12);
    this.asignaPorcentajes(this.clasprofesional1.preg_60_tabla_3, this.barChartData13, this.barChartData14, this.barChartLabels13, this.barChartLabels14);
    this.asignaPorcentajes(this.clasprofesional1.preg_61_tabla_3, this.barChartData15, this.barChartData16, this.barChartLabels15, this.barChartLabels16);
    this.asignaPorcentajes(this.clasprofesional1.preg_62_tabla_3, this.barChartData17, this.barChartData18, this.barChartLabels17, this.barChartLabels18);
    this.asignaPorcentajes(this.clasprofesional1.preg_63_tabla_3, this.barChartData19, this.barChartData20, this.barChartLabels19, this.barChartLabels20);

    this.asignaPorcentajes(this.clasprofesional1.preg_49_tabla_3, this.barChartData21, null, this.barChartLabels21, null);

    this.asignaPorcentajeDonutHMPlantilla(this.clasprofesional1.preg_49_tabla_3, this.doughnutChartData2, this.doughnutChartData3, this.doughnutChartLabels2, this.doughnutChartLabels3);
    */
  }

  asignaPorcentajeDonutHMPlantilla(elemento: Tabla3Model[], grafica1: any, grafica2: any, label1: any, label2: any) {
    if(elemento != null)
    {
      elemento.forEach(element => {
        let porcentajem = Math.round((element.mujeres * 1) / this.getTotalHombresMujeres(elemento) * 100);
        let porcentajeh = Math.round((element.hombres * 1) / this.getTotalHombresMujeres(elemento) * 100);
        grafica1.push(porcentajem);
        grafica2.push(porcentajeh);
        label1.push('% ' + element.texto);
        label2.push('% ' + element.texto);
      });
    }
  }

  asignaPorcentajes(elemento: any, grafica1: any[], grafica2: any[], label1: any, label2: any) {
    let datam = [];
    let datah = [];
    let data2m = [];
    let data2h = [];

    if(elemento != null){
      console.log("grafica");
      console.log(this.barChartData);
      console.log(grafica1);
      console.log(elemento);
      elemento.forEach(element => {
        let porcentajem = Math.round((element.mujeres * 1) / this.getTotalHombresMujeres(elemento) * 100);
        let porcentajeh = Math.round((element.hombres * 1) / this.getTotalHombresMujeres(elemento) * 100);

        let mujabs = ((element.mujeres * 1) * this.getTotalHombresMujeres(elemento)) / this.getTotalMujeres(elemento);
        let homabs = ((element.hombres * 1) * this.getTotalHombresMujeres(elemento)) / this.getTotalHombres(elemento);
        let porcentaje2m = Math.round(mujabs / (mujabs + homabs) * 100);
        let porcentaje2h = Math.round(homabs / (mujabs + homabs) * 100);

        datam.push(porcentajem);
        datah.push(porcentajeh);
        data2m.push(porcentaje2m);
        data2h.push(porcentaje2h);
        label1.push(element.texto);
        if (label2 != null)
          label2.push(element.texto);
      });
      grafica1.push({ data: datam, label: "Mujeres %" });
      grafica1.push({ data: datah, label: "Hombres %" });
      
        grafica2.push({ data: data2m, label: "Mujeres %" });
        grafica2.push({ data: data2h, label: "Hombres %" });
      console.log(data2h);
    }
  }

  getMujeresDelTotal(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = (elemento.mujeres * 1) / (this.getTotalHombresMujeres(tabla));
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getHombresDelTotal(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = (elemento.hombres * 1) / (this.getTotalHombresMujeres(tabla));
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getMujeresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = ((elemento.mujeres * 1) * this.getTotalHombresMujeres(tabla)) / this.getTotalMujeres(tabla);
    if (!isNaN(salida))
      return Math.round(salida);
    else
      return 0;
  }
  getHombresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = ((elemento.hombres * 1) * this.getTotalHombresMujeres(tabla)) / this.getTotalHombres(tabla);
    if (!isNaN(salida))
      return Math.round(salida);
    else
      return 0;
  }

  getPorcMujeresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = this.getMujeresAbs(elemento, tabla) / (this.getMujeresAbs(elemento, tabla) + this.getHombresAbs(elemento, tabla));
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }
  getPorcHombresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
    let salida = this.getHombresAbs(elemento, tabla) / (this.getMujeresAbs(elemento, tabla) + this.getHombresAbs(elemento, tabla));
    if (!isNaN(salida))
      return salida;
    else
      return 0;
  }

  getTotalHombresMujeres(elemento: Tabla3Model[]) {
    let totalm = elemento.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
    let totalh = elemento.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
    return (totalh * 1 + totalm * 1);
  }

  getTotalMujeres(elemento: Tabla3Model[]) {
    return elemento.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
  }

  getTotalHombres(elemento: Tabla3Model[]) {
    return elemento.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
  }


  getTotalCompoPlantilla() {
    return (this.clasprofesional1.data.preg_46 * 1 + this.clasprofesional1.data.preg_47 * 1);
  }
  getMujeresPlantilla() {
    return (this.clasprofesional1.data.preg_46 * 1);
  }
  getMujeresPlantillaPorcentaje() {
    return ((this.clasprofesional1.data.preg_46 * 1) * 100 / (this.clasprofesional1.data.preg_46 * 1 + this.clasprofesional1.data.preg_47 * 1));
  }
  getHombresPlantilla() {
    return (this.clasprofesional1.data.preg_47 * 1);
  }
  getHombresPlantillaPorcentaje() {
    return (this.clasprofesional1.data.preg_47 * 1) * 100 / (this.clasprofesional1.data.preg_46 * 1 + this.clasprofesional1.data.preg_47 * 1);
  }


  /*
  getTotalMujeres(){
      return this.preg_48_tabla_3.value.map(c=>c.mujeres).reduce((sum,current) => (sum*1)+(current*1));
  }*/


  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
    
    this.getClasProfesional();
  }



}