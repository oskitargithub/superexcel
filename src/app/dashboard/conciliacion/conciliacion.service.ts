import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class ConciliacionService {
    public datos;
    config: any;
    constructor(private _http: Http, config: AppConfig) {
        this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

    getDatos() {
        return this._http
            .get(this.config.api + 'probando.php')
            .map(res => res.json());
    }

    getDatosModelo() {
        var respuesta = {
            "status": "success", "total": 24, "respondidas": 0,
            "respondidasCuest": 0, "respondidasSeccion": 9, "totalCuest": 12, "totalSeccion": 12,
            "data": { "user_id": 2,"preg_1":"si","preg_2":"","preg_3":"","preg_4":"","preg_5":"","preg_6":"","preg_7":"","preg_8":"","preg_9":"","preg_10":"" ,"preg_11":"","preg_12":""  },
            "preg_0_tabla_2": [
                { "denominacion": "1", "valor": "true"},
                { "denominacion": "2", "valor": "false"},
                { "denominacion": "3", "valor": "true"},
                { "denominacion": "4", "valor": "true"},
            ],
            "preg_1_tabla_3": [
                { "denominacion": "Personas empleadas con hijos e hijas a cargo", "mujeres": "2", "hombres": "3" },
                { "denominacion": "Personas  empleadas  con  otros  familiares  o personas dependientes a cargo", "mujeres": "2", "hombres": "3" },
            ],
            "preg_2_tabla_3": [
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
            ],
            "preg_3_tabla_3": [
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
            ],
            "preg_4_tabla_3": [
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
            ],
            "preg_5_tabla_3": [
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
            ],
            "preg_6_tabla_3": [
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
                { "denominacion": "", "mujeres": "2", "hombres": "3" },
            ],
            "preg_7_tabla_3": [
                { "denominacion": "1", "mujeres": "2", "hombres": "3" },
                { "denominacion": "2", "mujeres": "2", "hombres": "3" },
                { "denominacion": "3", "mujeres": "2", "hombres": "3" },
                { "denominacion": "4", "mujeres": "2", "hombres": "3" },
                { "denominacion": "5", "mujeres": "2", "hombres": "3" },
                { "denominacion": "6", "mujeres": "2", "hombres": "3" },
                { "denominacion": "7", "mujeres": "2", "hombres": "3" },
                { "denominacion": "8", "mujeres": "2", "hombres": "3" },
                { "denominacion": "9", "mujeres": "2", "hombres": "3" },
                { "denominacion": "10", "mujeres": "2", "hombres": "3" },
                { "denominacion": "11", "mujeres": "2", "hombres": "3" },
                { "denominacion": "12", "mujeres": "2", "hombres": "3" },
                { "denominacion": "13", "mujeres": "2", "hombres": "3" },
                { "denominacion": "14", "mujeres": "2", "hombres": "3" },
                { "denominacion": "15", "mujeres": "2", "hombres": "3" },
                { "denominacion": "16", "mujeres": "2", "hombres": "3" },
                { "denominacion": "17", "mujeres": "2", "hombres": "3" },
            ],
            "preg_8_tabla_3": [
                { "denominacion": "1", "mujeres": "2", "hombres": "3" },
                { "denominacion": "2", "mujeres": "2", "hombres": "3" },
                { "denominacion": "3", "mujeres": "2", "hombres": "3" },
                { "denominacion": "4", "mujeres": "2", "hombres": "3" },
                { "denominacion": "5", "mujeres": "2", "hombres": "3" },
                { "denominacion": "6", "mujeres": "2", "hombres": "3" },
            ],
            "preg_9_tabla_3": [
                { "denominacion": "", "mujeres": "2", "hombres": "3" }
            ],
            "preg_10_tabla_3": [
                { "denominacion": "", "mujeres": "2", "hombres": "3" }
            ],
            "preg_rara":[
                {"denominacion": "pregunta 1", "valor": "true"},
                {"denominacion": "pregunta 2", "valor": "false"},
                {"denominacion": "pregunta 3", "valor": "true", "otro": "Perico de los palotes"}
            ]
        };
        return Observable.of(respuesta);
    }


}