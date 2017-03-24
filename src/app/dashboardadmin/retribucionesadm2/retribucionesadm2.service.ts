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
            "preg_49_tabla_6": [],
            "preg_50_tabla_6": [],
            "preg_51_tabla_6": [],
            "preg_52_tabla_6": [],
            "preg_53_tabla_6": [],
            "preg_54_tabla_6": [],
            "preg_55_tabla_6": [],           
            "preg_60_tabla_5": [
                { "denominacion": "Cargo 1",      "mujeres1": "2",    "hombres1": "1","mujeres2": "3",    "hombres2": "4"},
                { "denominacion": "Cargo 2", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2"}                
            ],
            "preg_61_tabla_5": [
                { "denominacion": "Cargo 3", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2" },
                { "denominacion": "Cargo 4", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2"},                
            ],
            "preg_62_tabla_5": [
                { "denominacion": "Cargo 1",      "mujeres1": "2",    "hombres1": "1","mujeres2": "3",    "hombres2": "4"},
                { "denominacion": "Cargo 2", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2"},
                { "denominacion": "Cargo 3", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2" }                
            ],
            "preg_63_tabla_5": [
                { "denominacion": "Cargo 4", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2" },
                { "denominacion": "Cargo 5", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2" },
                { "denominacion": "Cargo 6", "mujeres1": "1",    "hombres1": "3","mujeres2": "12",    "hombres2": "3" },
                { "denominacion": "Cargo 7", "mujeres1": "2",    "hombres1": "4","mujeres2": "2",    "hombres2": "4" }
            ],
            "preg_64_tabla_5": [
                { "denominacion": "Cargo 3", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2" },
                { "denominacion": "Cargo 4", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2"},
                { "denominacion": "Cargo 5", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2"},
                { "denominacion": "Cargo 6", "mujeres1": "1",    "hombres1": "3","mujeres2": "12",    "hombres2": "3" }                
            ],
            "preg_65_tabla_5": [
                { "denominacion": "Cargo 1",      "mujeres1": "2",    "hombres1": "1","mujeres2": "3",    "hombres2": "4"},
                { "denominacion": "Cargo 2", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2"},
                { "denominacion": "Cargo 7", "mujeres1": "2",    "hombres1": "4","mujeres2": "2",    "hombres2": "4" }
            ],
            "preg_66_tabla_5": [
                { "denominacion": "Cargo 3", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2" },
                { "denominacion": "Cargo 4", "mujeres1": "3",    "hombres1": "4","mujeres2": "1",    "hombres2": "2" },                
            ],
            "preg_67_tabla_3": [
                { "denominacion": "HORAS EXTRAS PERSONAL FUNCIONARIADO", "mujeres": "2",    "hombres": "4" },
                { "denominacion": "HORAS EXTRAS PERSONAL LABORAL", "mujeres": "3",    "hombres": "3" },
                { "denominacion": "PRODUCTIVIDAD PERSONAL FUNCIONARIADO", "mujeres": "5",    "hombres": "2" },
                { "denominacion": "PRODUCTIVIDAD PERSONAL LABORAL", "mujeres": "4",    "hombres": "1" }                
            ]
        }
        return Observable.of(respuesta);
    }
}