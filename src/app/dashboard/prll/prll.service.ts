import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class PRLLService {
    public datos;
    config: any;
    constructor(private _http: Http, config: AppConfig) {
        this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

    getDatosModelo() {
        return this._http.get(this.config.apilaravel + "cuestionario/seccion/11").map(res => {
            let headers = res.headers;
            let miobjeto = res.json();
            return (miobjeto);
        });
    }
    setDatosModelo(modelo: any) {
        let mitoken = JSON.parse(localStorage.getItem('fditoken'));
        let json = JSON.stringify(modelo);
        let params = "data=" + json;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let opciones = new RequestOptions({
            headers: headers,
            /*withCredentials: true            */
        });
        return this._http.post(this.config.apilaravel + "cuestionario/seccion/11",
            params, opciones).map(res => res.json());

    }
}