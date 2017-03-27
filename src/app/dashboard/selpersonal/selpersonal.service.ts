import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class SelPersonalService {
    public datos;
    config: any;
    constructor(private _http: Http, config: AppConfig) {
        this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

    getDatosModelo() {
        var respuesta = {
            "status": "success", "total": 24, "respondidas": 0, "id": 2, "user_id": 2,    
            "respondidasCuest":0,"respondidasSeccion":9,"totalCuest":12,"totalSeccion":12,       
            "data":{"preg_1":"S","preg_2":"","preg_3":"","preg_4":"","preg_5":"","preg_6":"","preg_6txt":"",
                    "preg_7":"S","preg_8":"","preg_9":"","preg_10":"","preg_11":"","preg_12":"","preg_12txt":"",
                    "preg_13txt":"",
                    "preg_14":"S","preg_15":"","preg_16":"","preg_17":"","preg_18":"","preg_19":"","preg_20":"","preg_20txt":"",
                    "preg_21":"S","preg_22":"","preg_22txt":"","preg_23txt":"","preg_24txt":"","preg_25":"","preg_26":"","preg_27":"","preg_28":"","preg_29":"",
                    "preg_30":"", "preg_31":"","preg_32":"","preg_33":"","preg_34":"","preg_35":"","preg_36":"","preg_35txt":"","preg_37txt":"","preg_38txt":"","preg_39txt":"",
                    "preg_40":"","preg_40txt":"","preg_41":"","preg_41txt":"","preg_42":"","preg_42txt":""
                },                  
            "preg_100_tabla_2": [
                { "criterio": "Sexo femenino", "influencia": "1" },
                { "criterio": "Edad entre 25 y 40 años", "influencia": "3" },
                { "criterio": "Estado Civil de casada/o", "influencia": "2" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
                { "criterio": "26", "influencia": "" },
            ],
            "preg_100_tabla_3": [
                { "definicion":"Sexo", "criterio": "Si", "grupo": "eaaaaa" },
                 { "definicion":"Edad", "criterio": "", "grupo": "" },
                { "definicion":"Estado Civil", "criterio": "", "grupo": "" },
                 { "definicion":"Aspecto Físico", "criterio": "", "grupo": "" },
            ],
        }
        return Observable.of(respuesta);
    }
}