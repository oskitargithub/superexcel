import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class BajasEIncorpAdmService {
  public datos;
  config: any;
	constructor(private _http: Http,config: AppConfig){
         this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

  getDatos(){
      return this._http
               .get(this.config.api + 'probando.php')
               .map(res => res.json());
  }

 getDatosModelo(){
    var respuesta = {"status":"success","respondidasCuest":0,"respondidasSeccion":9,"totalCuest":12,"totalSeccion":12,
    "data":{"id":1,"user_id":2},
    "preg_1_tabla_3":[ 
        { "denominacion": "Dimisión de la trabajadora o del trabajador", "mujeres": "2", "hombres": "3" },
        { "denominacion": "Fin contrato / No renovación de contrato temporal", "mujeres": "2", "hombres": "3" },
        { "denominacion": "Despido disciplinario", "mujeres": "2", "hombres": "3" },
        { "denominacion": "Extinción durante período de prueba", "mujeres": "2", "hombres": "3" },
        { "denominacion": "Jubilación", "mujeres": "2", "hombres": "3" },
        { "denominacion": "Cese por personas a cargo", "mujeres": "4", "hombres": "3" },
        { "denominacion": "Defunción", "mujeres": "", "hombres": "" },
    ],
    "preg_2_tabla_5": [
        { "denominacion": "Año 2015", "mujeres1": "2", "hombres1": "3", "mujeres2": "", "hombres2": "" },
        { "denominacion": "Año 2016", "mujeres1": "4", "hombres1": "2", "mujeres2": "", "hombres2": "" },
        { "denominacion": "Año 2017", "mujeres1": "7", "hombres1": "1", "mujeres2": "", "hombres2": "" },
    ],
    "preg_3_tabla_3":[ 
        { "denominacion": "Temporal a tiempo parcial", "mujeres": "2", "hombres": "3" },
        { "denominacion": "Temporal a tiempo completo", "mujeres": "2", "hombres": "3" },
        { "denominacion": "Fijo discontinuo", "mujeres": "2", "hombres": "3" },
        { "denominacion": "Plaza consolidada / funcionariado a tiempo parcial", "mujeres": "2", "hombres": "3" },
        { "denominacion": "Plaza consolidada / funcionariado a tiempo completo", "mujeres": "2", "hombres": "3" },
        { "denominacion": "Prácticas o Formación", "mujeres": "2", "hombres": "3" },
        { "denominacion": "Interinidad", "mujeres": "2", "hombres": "3" },
    ],
    "preg_4_tabla_3":[{"denominacion": "supercatego1", "mujeres": "15", "hombres": "10"},
        {"denominacion": "supercatego2", "mujeres": "25", "hombres": "20"},
        {"denominacion": "supercatego3", "mujeres": "5", "hombres": "10"},
     ],
    "preg_5_tabla_4":[
        {"denominacion1": "Jubilación","denominacion2": "", "mujeres": "1", "hombres": "2"},
        {"denominacion1": "Jubilación Anticipada","denominacion2": "", "mujeres": "3", "hombres": "4"},
        {"denominacion1": "Despido","denominacion2": "Menor de 20 años", "mujeres": "5", "hombres": "6"},
        {"denominacion1": "Despido","denominacion2": "20-29", "mujeres": "7", "hombres": "8"},
        {"denominacion1": "Despido","denominacion2": "30-45", "mujeres": "9", "hombres": "10"},
        {"denominacion1": "Despido","denominacion2": "46 y más", "mujeres": "11", "hombres": "12"},
        {"denominacion1": "Fin Contrato","denominacion2": "Menor de 20 años", "mujeres": "", "hombres": ""},
        {"denominacion1": "Fin Contrato","denominacion2": "20-29", "mujeres": "", "hombres": ""},
        {"denominacion1": "Fin Contrato","denominacion2": "30-45", "mujeres": "", "hombres": ""},
        {"denominacion1": "Fin Contrato","denominacion2": "46 y más", "mujeres": "", "hombres": ""},
        {"denominacion1": "Dimisión / Cese voluntario","denominacion2": "Menor de 20 años", "mujeres": "", "hombres": ""},
        {"denominacion1": "Dimisión / Cese voluntario","denominacion2": "20-29", "mujeres": "", "hombres": ""},
        {"denominacion1": "Dimisión / Cese voluntario","denominacion2": "30-45", "mujeres": "", "hombres": ""},
        {"denominacion1": "Dimisión / Cese voluntario","denominacion2": "46 y más", "mujeres": "", "hombres": ""},
        {"denominacion1": "Cese por personas a cargo","denominacion2": "Menor de 20 años", "mujeres": "", "hombres": ""},
        {"denominacion1": "Cese por personas a cargo","denominacion2": "20-29", "mujeres": "", "hombres": ""},
        {"denominacion1": "Cese por personas a cargo","denominacion2": "30-45", "mujeres": "", "hombres": ""},
        {"denominacion1": "Cese por personas a cargo","denominacion2": "46 y más", "mujeres": "", "hombres": ""},
    ],
    "preg_6_tabla_3":[
        {"denominacion": "IT (no previa a la maternidad)", "mujeres": "", "hombres": ""},
        {"denominacion": "Accidente de trabajo", "mujeres": "", "hombres": ""},
        {"denominacion": "IT por riesgo durante embarazo / lactancia", "mujeres": "", "hombres": ""}
    ],
  };
   return Observable.of(respuesta);
 }

 
}