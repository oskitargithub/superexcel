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
            "data":{"preg_1":"S","preg_2":"","preg_3":"","preg_4":"","preg_5":"","preg_6":"","preg_6txt":"",
                    "preg_7":"S","preg_8":"","preg_9":"","preg_10":"","preg_11":"","preg_12":"","preg_12txt":"",
                    "preg_13txt":"",
                    "preg_14":"S","preg_15":"","preg_16":"","preg_17":"","preg_18":"","preg_19":"","preg_20":"","preg_20txt":"",
                    "preg_21":"S","preg_22":"","preg_22txt":"","preg_23txt":"",
                    },                  
            "preg_100_tabla_2": [
                { "criterio": "Sexo femenino", "influencia": "1" },
                { "criterio": "Edad entre 25 y 40 años", "influencia": "3" },
                { "criterio": "Estado Civil de casada/o", "influencia": "2" },
                { "criterio": "Aspecto físico agradable", "influencia": "" },
            ],

        }
        return Observable.of(respuesta);
    }
}