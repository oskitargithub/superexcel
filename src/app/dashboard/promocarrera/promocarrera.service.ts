import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class PromoCarreraService {
    public datos;
    config: any;
    constructor(private _http: Http, config: AppConfig) {
        this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

    getDatosModelo() {
        var respuesta = {
            "status": "success", "total": 24, "respondidas": 0, "id": 2, "user_id": 2,
            "respondidasCuest": 0, "respondidasSeccion": 9, "totalCuest": 12, "totalSeccion": 12,
            "preg_1_tabla_3": [
                { "texto": "Horas extraordinarias", "mujeres": "", "hombres": "" },
                { "texto": "Productividad", "mujeres": "", "hombres": "" },
            ],
            "preg_2_tabla_3": [
                { "texto": "Horas extraordinarias", "mujeres": "", "hombres": "" },
                { "texto": "Productividad", "mujeres": "", "hombres": "" },
            ]
        }
        return Observable.of(respuesta);
    }
}