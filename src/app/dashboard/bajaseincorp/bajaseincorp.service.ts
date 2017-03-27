import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class BajasEIncorpService {
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
    var respuesta = {"status":"success","total":24,"respondidas":0,
    "respondidasCuest":0,"respondidasSeccion":9,"totalCuest":12,"totalSeccion":12,
    "data":{"user_id":2,"nombre":"Personal","apellidos":"de l''ajuntament"},
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
        { "denominacion": "Año 2015", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" },
        { "denominacion": "Año 2016", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" },
        { "denominacion": "Año 2017", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" },
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
    "preg_4_tabla_3":[{"denominacion": "", "mujeres": "", "hombres": ""} ],
    "preg_5_tabla_4":[
        {"denominacion1": "Jubilación","denominacion2": "", "mujeres": "", "hombres": ""},
        {"denominacion1": "Jubilación Anticipada","denominacion2": "", "mujeres": "", "hombres": ""},
        {"denominacion1": "Despido","denominacion2": "Menor de 20 años", "mujeres": "", "hombres": ""},
        {"denominacion1": "Despido","denominacion2": "20-29", "mujeres": "", "hombres": ""},
        {"denominacion1": "Despido","denominacion2": "30-45", "mujeres": "", "hombres": ""},
        {"denominacion1": "Despido","denominacion2": "46 y más", "mujeres": "", "hombres": ""},
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