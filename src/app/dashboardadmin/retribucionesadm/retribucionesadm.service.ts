import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class RetribucionesAdmService {
    public datos;
    config: any;
    constructor(private _http: Http, config: AppConfig) {
        this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

    getDatosModelo() {
        var respuesta = {
            "status": "success", "total": 24, "respondidas": 0, "id": 2, "user_id": 2,
            "preg_50_tabla_6": [
                { "denominacion1": "Menos de 7.200 €",      "mujeres1": "2",    "hombres1": "1","mujeres2": "3",    "hombres2": "4",    "denominacion2":"Menos de 7.200 €" },
                { "denominacion1": "Entre 7.201 y 12000 €", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2",    "denominacion2":"Entre 7.201 y 12000 €" },
                { "denominacion1": "Entre 30001 y 36000 €", "mujeres1": "1",    "hombres1": "3","mujeres2": "12",    "hombres2": "3",   "denominacion2":"Entre 30001 y 36000 €" },
                { "denominacion1": "Más de 36000 €",        "mujeres1": "2",    "hombres1": "4","mujeres2": "2",    "hombres2": "4",    "denominacion2":"Más de 36000 €" }
            ],
            "preg_51_tabla_6": [],
            "preg_52_tabla_6": [],
            "preg_53_tabla_6": [],
            "preg_54_tabla_6": [],
            "preg_55_tabla_6": [],
            "preg_56_tabla_6": [],
            "preg_60_tabla_5": [],
            "preg_61_tabla_5": [],
            "preg_62_tabla_5": [],
            "preg_63_tabla_5": [],
            "preg_64_tabla_5": [],
            "preg_65_tabla_5": [],
            "preg_66_tabla_5": [],
            "preg_67_tabla_5": [],
            "preg_68_tabla_5": [],
        }
        return Observable.of(respuesta);
    }
}