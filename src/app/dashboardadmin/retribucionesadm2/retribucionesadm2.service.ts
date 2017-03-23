import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class RetribucionesAdm2Service {
    public datos;
    config: any;
    constructor(private _http: Http, config: AppConfig) {
        this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

    getDatosModelo() {
        var respuesta = {
            "status": "success", "total": 24, "respondidas": 0, "id": 2, "user_id": 2,
            "preg_14_tabla_3": [
                { "denominacion": "Funcionariado de carrera", "mujeres": "15", "hombres": "4" },
                { "denominacion": " Funcionariado de interinidad", "mujeres": "5", "hombres": "4" },
                { "denominacion": "Personal Laboral fijo", "mujeres": "4", "hombres": "5" },
                { "denominacion": "Personal Laboral indefinido", "mujeres": "2", "hombres": "2" },
                { "denominacion": "Personal Laboral Interino", "mujeres": "2", "hombres": "4" },
                { "denominacion": "Personal Laboral Temporal", "mujeres": "2", "hombres": "2" },
                { "denominacion": "Personal Eventual", "mujeres": "14", "hombres": "12" }
            ]
        }
    }
}