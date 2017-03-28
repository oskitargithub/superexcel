import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class FormacionService {
    public datos;
    config: any;
    constructor(private _http: Http, config: AppConfig) {
        this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }
    getDatosModelo() {
        var respuesta = {
            "status": "success", "total": 24, "respondidas": 0,
            "respondidasCuest": 0, "respondidasSeccion": 9, "totalCuest": 12, "totalSeccion": 12,
            "data": { "user_id": 2, "preg_1": "si", "preg_2": "", "preg_3": "", "preg_4": "", "preg_5": "", "preg_6": "", "preg_7": "", "preg_8": "", "preg_9": "", "preg_10": "", "preg_11": "", "preg_12": "" },
            "preg_0_tabla_2": [
                { "denominacion": "1", "valor": "true" },
                { "denominacion": "2", "valor": "false" },
                { "denominacion": "3", "valor": "true" },
                { "denominacion": "4", "valor": "true" },
            ],
        };
        return Observable.of(respuesta);
    }
}