import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class Retribuciones2Service {
    public datos;
    config: any;
    constructor(private _http: Http, config: AppConfig) {
        this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

    getDatosModelo() {
        var respuesta = {
            "status": "success", "total": 24, "respondidas": 0, "id": 2, "user_id": 2,                      
            "preg_60_tabla_5": [{ "denominacion": "", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" }],
            "preg_61_tabla_5": [{ "denominacion": "", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" }],
            "preg_62_tabla_5": [{ "denominacion": "", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" }],
            "preg_63_tabla_5": [{ "denominacion": "", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" }],
            "preg_64_tabla_5": [{ "denominacion": "", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" }],
            "preg_65_tabla_5": [{ "denominacion": "", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" }],
            "preg_66_tabla_5": [{ "denominacion": "", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" }],
            "preg_67_tabla_5": [{ "denominacion": "", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" }],
            "preg_68_tabla_5": [{ "denominacion": "", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" }],
            "preg_69_tabla_5": [{ "denominacion": "", "mujeres1": "", "hombres1": "", "mujeres2": "", "hombres2": "" }],
            "preg_67_tabla_3": [
                { "denominacion": "Horas extraordinarias", "mujeres": "", "hombres": "" },
                { "denominacion": "Productividad", "mujeres": "", "hombres": "" },
                ]
        }
        return Observable.of(respuesta);
    }
}