import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class RetribucionesPrAdm2Service {
    public datos;
    config: any;
    constructor(private _http: Http, config: AppConfig) {
        this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }
    getDatosModelo() {
        let tokenfdi = JSON.parse(localStorage.getItem('fditoken'));
        let mitoken = localStorage.getItem('token');
        let api_token = tokenfdi.api_token;
        let usuariocuest = localStorage.getItem('usuariocuest');
        let parametros2: URLSearchParams = new URLSearchParams();
        parametros2.set('usuario', usuariocuest);
        parametros2.set('_token', mitoken);
        parametros2.set('api_token', api_token);     
        let headers = '';
        return this._http.get(this.config.apilaravel + "cuestionario/seccion/23", { search: parametros2 }).map(res => {
            let headers = res.headers;
            let miobjeto = res.json();
            return (miobjeto);
        });
    }
}