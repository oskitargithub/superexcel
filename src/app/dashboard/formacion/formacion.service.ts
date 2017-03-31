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
            "data": { "user_id": 2, "preg_1": "", "preg_2": "", "preg_3": "", "preg_4": "", "preg_5": "", "preg_6": "", "preg_7": "", "preg_8": "", "preg_9": "", "preg_10": "", "preg_11": "", "preg_12": "" },
            "preg_1_tabla_3": [
                { "texto": " Personas beneficiadas de formación interna", "mujeres": "", "hombres": "" },
                { "texto": " Personas beneficiadas de formación externa", "mujeres": "", "hombres": "" },
            ],
            "preg_2_tabla_3": [
                { "texto": "A1", "mujeres": "", "hombres": "" },
                { "texto": "A2", "mujeres": "", "hombres": "" },
                { "texto": "B", "mujeres": "", "hombres": "" },
                { "texto": "C1", "mujeres": "", "hombres": "" },
                { "texto": "C2", "mujeres": "", "hombres": "" },
                { "texto": "E", "mujeres": "", "hombres": "" },
            ],
        };
        return Observable.of(respuesta);
    }
}