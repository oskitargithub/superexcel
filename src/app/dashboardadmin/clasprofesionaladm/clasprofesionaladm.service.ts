import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class ClasProfesionalAdmService {
  public datos;
  config: any;
	constructor(private _http: Http,config: AppConfig){
         this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

  
 getClasProfesional(){
    var respuesta = {"status":"success","total":24,"respondidas":0,"id":2, "user_id":2,
    "data":{"preg_5":"30","preg_6":"15", "preg_7":""},
    "preg_3_tabla_3":[ { "denominacion": "dpto1", "mujeres": "15", "hombres": "4" }],
    "preg_4_tabla_3":[ 
      { "denominacion": "Menos de 20", "mujeres": "15", "hombres": "3" },
      { "denominacion": "Entre 20 y 29", "mujeres": "", "hombres": "8" },
      { "denominacion": "Entre 30 y 45", "mujeres": "5", "hombres": "2" },
      { "denominacion": "Entre 45 y 56", "mujeres": "", "hombres": "2" },
      { "denominacion": "57 o más", "mujeres": "10", "hombres": "" }
      ],
      "preg_5_tabla_3":[{ "denominacion": "jefatura1", "mujeres": "15", "hombres": "11" }],
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