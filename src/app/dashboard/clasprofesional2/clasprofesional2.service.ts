import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class ClasProfesional2Service {
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
    "preg_14_tabla_3":[ 
      { "denominacion": "Funcionariado de carrera", "mujeres": "2", "hombres": "3" },
      
    ],
    "preg_15_tabla_3":[ 
      { "denominacion": "Menos de 20", "mujeres": "2", "hombres": "3" },
      { "denominacion": "Entre 20 y 29", "mujeres": "", "hombres": "" },
      { "denominacion": "Entre 30 y 45", "mujeres": "", "hombres": "" },
      { "denominacion": "Entre 45 y 56", "mujeres": "", "hombres": "" },
      { "denominacion": "57 o más", "mujeres": "", "hombres": "" }
      ],
      "preg_16_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }],
      "preg_17_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }],
      "preg_18_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }],
      "preg_19_tabla_3":[{ "denominacion": "", "mujeres": "", "hombres": "" }]
  };
   return Observable.of(respuesta);
 }

 
}