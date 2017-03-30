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

 getDatosModelo() {
        var respuesta = {
            "status": "success",
            "totalCuest": 83,
            "respondidasCuest": 0,
            "totalSeccion": 6,
            "respondidasSeccion": 0,
            "data": null,
            "preg_120_tabla_3": [
                {
                    "respuesta": 210,
                    "texto": "Dimisi\u00f3n de la trabajadora o del trabajador",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 211,
                    "texto": "Fin contrato \/ No renovaci\u00f3n de contrato temporal ",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 212,
                    "texto": "Despido disciplinario",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 213,
                    "texto": "Extinci\u00f3n durante per\u00edodo de prueba",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 214,
                    "texto": "Jubilaci\u00f3n",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 215,
                    "texto": "Cese por personas a cargo",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 216,
                    "texto": "Defunci\u00f3n",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 217,
                    "texto": "Otra (especificar):",
                    "mujeres": "",
                    "hombres": ""
                }
            ],
            "preg_121_tabla_5": [
                {
                    "respuesta": 218,
                    "texto": "A\u00f1o 2015",
                    "mujeres": "",
                    "hombres": "",
                    "mujeres2": "",
                    "hombres2": ""
                },
                {
                    "respuesta": 219,
                    "texto": "A\u00f1o 2016",
                    "mujeres": "",
                    "hombres": "",
                    "mujeres2": "",
                    "hombres2": ""
                },
                {
                    "respuesta": 220,
                    "texto": "A\u00f1o 2017",
                    "mujeres": "",
                    "hombres": "",
                    "mujeres2": "",
                    "hombres2": ""
                }
            ],
            "preg_122_tabla_3": [
                {
                    "respuesta": 221,
                    "texto": "Temporal a tiempo parcial",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 222,
                    "texto": "Temporal a tiempo completo",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 223,
                    "texto": "Fijo discontinuo",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 224,
                    "texto": "Plaza consolidada \/ funcionariado a tiempo parcial",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 225,
                    "texto": "Plaza consolidada \/ funcionariado a tiempo completo",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 226,
                    "texto": "Pr\u00e1cticas o Formaci\u00f3n",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 227,
                    "texto": "Interinidad",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 228,
                    "texto": "Otros (especificar):",
                    "mujeres": "",
                    "hombres": ""
                }
            ],
            "preg_123_tabla_3": [
                {
                    "respuesta": "",
                    "texto": "",
                    "mujeres": "",
                    "hombres": ""
                }
            ],
            "preg_124_tabla_3": [
                {
                    "respuesta": "",
                    "texto": "",
                    "mujeres": "",
                    "hombres": ""
                }
            ],
            "preg_125_tabla_3": [
                {
                    "respuesta": 250,
                    "texto": "IT (no previa a la maternidad)",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 251,
                    "texto": "Accidente de trabajo",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 252,
                    "texto": "IT por riesgo durante embarazo \/ lactancia",
                    "mujeres": "",
                    "hombres": ""
                },
                {
                    "respuesta": 253,
                    "texto": "Otro (especificar)",
                    "mujeres": "",
                    "hombres": ""
                }
            ],
            "url": "http:\/\/jaumeportatil\/superexcel\/api\/cuestionario\/seccion",
            "title": "Testing cuestionario\/seccion"
        };
        return Observable.of(respuesta);
    }

 
}