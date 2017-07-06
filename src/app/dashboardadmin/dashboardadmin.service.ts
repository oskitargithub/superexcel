import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Observable }     from 'rxjs/Observable';
import {DatePipe} from "@angular/common";
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

    borraUsuario(idusuario:string){
        let tokenfdi = JSON.parse(localStorage.getItem('fditoken'));
        let mitoken = localStorage.getItem('token');
        let api_token = tokenfdi.api_token;
        let parametros2: URLSearchParams = new URLSearchParams();
        parametros2.set('_token', mitoken);
        parametros2.set('api_token', api_token);
        let headers = '';        
        return this._http.delete(this.config.apilaravel + "gestion/usuario/"+idusuario, { search: parametros2 }).map(res => {
            let headers = res.headers;
            let miobjeto = res.json();
            return (miobjeto);
        });
    }

    bajaCuestionario(idusuario:string){
        let today =  new Date();
        let datePipe = new DatePipe("es");
        let fechahoy = datePipe.transform(today, 'yyyy-MM-dd');
        let tokenfdi = JSON.parse(localStorage.getItem('fditoken'));
        let mitoken = localStorage.getItem('token');
        let api_token = tokenfdi.api_token;        
        let parametros2: URLSearchParams = new URLSearchParams();
        parametros2.set('_token', mitoken);
        parametros2.set('api_token', api_token);
        parametros2.set('usuario', idusuario);
        parametros2.set('fecha_fin', fechahoy);
        let misheaders = new Headers({ "X-Requested-With": "XMLHttpRequest", 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: misheaders });

        return this._http.post(this.config.apilaravel + "cuestionario/cierre",
            parametros2, options).map(res => res.json());

    }

    /**
     * 
     * @param idusuario Ojooo falta que Jaume haga el servicio para el alta de cuestionario cerrado
     */
    altaCuestionario(idusuario:string){
        let tokenfdi = JSON.parse(localStorage.getItem('fditoken'));
        let mitoken = localStorage.getItem('token');
        let api_token = tokenfdi.api_token;        
        let parametros2: URLSearchParams = new URLSearchParams();
        parametros2.set('_token', mitoken);
        parametros2.set('api_token', api_token);
        parametros2.set('usuario', idusuario);
        parametros2.set('fecha_fin', "");
        let misheaders = new Headers({ "X-Requested-With": "XMLHttpRequest", 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: misheaders });

        return this._http.post(this.config.apilaravel + "cuestionario/cierre",
            parametros2, options).map(res => res.json());

    }
}