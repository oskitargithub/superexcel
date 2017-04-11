import {Injectable} from "@angular/core";
import {Http, Response, Headers, URLSearchParams} from "@angular/http";
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../app.config';

import {DashBoardAdminModel} from './dashboardadmin.model';

@Injectable()
export class DashBoardAdminService{
    config: any;
	constructor(private _http: Http,config: AppConfig){
         this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }   

    getCuestionarios() {
        let tokenfdi = JSON.parse(localStorage.getItem('fditoken'));
        let mitoken = localStorage.getItem('token');
        let api_token = tokenfdi.api_token;
        let parametros2: URLSearchParams = new URLSearchParams();
        parametros2.set('_token', mitoken);
        parametros2.set('api_token', api_token);
        let headers = '';
        return this._http.get(this.config.apilaravel + "gestion/cuestionarios", { search: parametros2 }).map(res => {
            let headers = res.headers;
            let miobjeto = res.json();
            return (miobjeto);
        });
    }

    getDatosUsuario(usuario:DashBoardAdminModel) {
        let tokenfdi = JSON.parse(localStorage.getItem('fditoken'));
        let mitoken = localStorage.getItem('token');
        let api_token = tokenfdi.api_token;
        let parametros2: URLSearchParams = new URLSearchParams();
        parametros2.set('_token', mitoken);
        parametros2.set('api_token', api_token);
        let headers = '';
        return this._http.get(this.config.apilaravel + "gestion/usuario/"+usuario.user, { search: parametros2 }).map(res => {
            let headers = res.headers;
            let miobjeto = res.json();
            return (miobjeto);
        });
    }
}