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
    "data":{"user_id":2,"nombre":"Personal","apellidos":"de l''ajuntament","preg_5":1,"preg_6":5},
    "preg_3_tabla_3":[ { "denominacion": "wewe", "mujeres": "2", "hombres": "3" }]
  };
   return Observable.of(respuesta);
 }

 
}