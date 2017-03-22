import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class TipoDeContratoAdmService {
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
            ],
            "preg_15_tabla_3": [
                { "denominacion": "Obra o servicio", "mujeres": "15", "hombres": "3" },
                { "denominacion": "Eventual circunstancias producción", "mujeres": "", "hombres": "8" },
                { "denominacion": "Interinidad", "mujeres": "5", "hombres": "2" },
                { "denominacion": "Prácticas", "mujeres": "", "hombres": "2" },
                { "denominacion": "Beca de Formación", "mujeres": "10", "hombres": "" }
            ],
            "preg_16_tabla_3": [
                { "denominacion": "A TIEMPO COMPLETO", "mujeres": "12", "hombres": "4" },
                { "denominacion": "A TIEMPO PARCIAL", "mujeres": "3", "hombres": "10" }
            ],
            "preg_17_tabla_3": [
                { "denominacion": "menos de 1 año", "mujeres": "2", "hombres": "5" },
                { "denominacion": "más de 1 año", "mujeres": "4", "hombres": "12" },
                { "denominacion": "más de 3 años", "mujeres": "7", "hombres": "14" }
            ],
            "preg_18_tabla_3": [
                { "denominacion": "menos de 10", "mujeres": "2", "hombres": "24" },
                { "denominacion": "de 11 a 20", "mujeres": "12", "hombres": "6" },
                { "denominacion": "de 21 a 35", "mujeres": "21", "hombres": "3" }
                ],
            "preg_19_tabla_3": [{ "denominacion": "t1", "mujeres": "2", "hombres": "24" },
                { "denominacion": "t2", "mujeres": "12", "hombres": "6" },
                { "denominacion": "t3", "mujeres": "21", "hombres": "3" }],
        };
        return Observable.of(respuesta);
    }

}