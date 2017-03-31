import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class ConciliacionAdmService {
    public datos;
    config: any;
    constructor(private _http: Http, config: AppConfig) {
        this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

    /*getDatosModelo() {
        return this._http.get(this.config.apilaravel + "cuestionario/seccion/7").map(res => {
            let headers = res.headers;
            let miobjeto = res.json();
            return (miobjeto);
        });
    }*/
     getDatosModelo() {
        return this._http
               .get(this.config.api + 'probando2.php')
               .map(res => res.json());
    }
}