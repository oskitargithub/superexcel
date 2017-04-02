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
            "data": { "user_id": 2, "preg_1": "", "preg_2": "", "preg_3": "", "preg_4": "", "preg_5": "", "preg_6": "", "preg_7": "", "preg_8": "", "preg_9": "", "preg_10": "", "preg_11": "",
             "preg_12": "", "preg_13": "", "preg_14": "", "preg_15": "", "preg_16": "", "preg_17": "", "preg_18": "" , "preg_19": "", "preg_20": "" , "preg_21": "",
             "preg_22": "", "preg_23": "", "preg_24": "", "preg_25": "", "preg_26": "", "preg_27": "", "preg_28": "" , "preg_29": "", "preg_30": "", "preg_31": ""},
            "preg_1_tabla_5": [
                { "texto1": "ao", "texto2": "true", "texto3": "false", "texto4": "", "texto5": "" },
                
            ],
            "preg_2_tabla_5": [
                { "texto1": "ea", "texto2": "1", "texto3": "false", "texto4": "", "texto5": "" },
            ],
            "preg_3_tabla_3": [
                { "texto": "Solicitudes de promoción presentadas", "mujeres": "1", "hombres": "1" },
            ],
            "preg_4_tabla_3": [
                { "texto": "", "mujeres": "", "hombres": "" },
            ],
            "preg_5_tabla_3": [
                { "texto": "", "mujeres": "", "hombres": "" },
            ],
            "preg_6_tabla_3": [
                { "texto": "Transformación de contratos a tiempo parcial en tiempo completo", "mujeres": "", "hombres": "" },
            ],
            "preg_7_tabla_3": [
                { "texto": "", "mujeres": "", "hombres": "" },
            ],
            "preg_8_tabla_3": [
                { "texto": "", "mujeres": "", "hombres": "" },
            ]
        }
        return Observable.of(respuesta);
    }
}