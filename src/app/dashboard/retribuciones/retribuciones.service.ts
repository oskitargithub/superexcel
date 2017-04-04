import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class RetribucionesService {
    public datos;
    config: any;
    constructor(private _http: Http, config: AppConfig) {
        this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

    getDatosModelo() {
        return this._http.get(this.config.apilaravel + "cuestionario/seccion/5").map(res => {
            let headers = res.headers;
            let miobjeto = res.json();
            return (miobjeto);
        });
    }

    setDatosModelo() {
        return this._http.get(this.config.apilaravel + "cuestionario/seccion/5").map(res => {
            let headers = res.headers;
            let miobjeto = res.json();
            return (miobjeto);
        });
    }
}