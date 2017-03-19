import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class ClasProfesional1Service {
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

 getClasProfesional1(){
    var respuesta = {"status":"success","total":24,"respondidas":0,
    "data":{"user_id":2,"nombre":"Personal","apellidos":"de l''ajuntament","preg_5":1,"preg_6":5, "preg_7":null},
    "preg_3_tabla_3":[ { "denominacion": "wewe", "mujeres": "2", "hombres": "3" }],
    "preg_4_tabla_3":[ 
      { "denominacion": "Menos de 20", "mujeres": "2", "hombres": "3" },
      { "denominacion": "Entre 20 y 29", "mujeres": "", "hombres": "" },
      { "denominacion": "Entre 30 y 45", "mujeres": "", "hombres": "" },
      { "denominacion": "Entre 45 y 56", "mujeres": "", "hombres": "" },
      { "denominacion": "57 o más", "mujeres": "", "hombres": "" }
      ],
      "preg_5_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }],
      "preg_6_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }],
      "preg_7_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }],
      "preg_8_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }],
      "preg_9_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }],
      "preg_10_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }],
      "preg_11_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }],
      "preg_12_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }],
      "preg_13_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }],
  };
   return Observable.of(respuesta);
 }

 
}