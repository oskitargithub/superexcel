import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, URLSearchParams  } from "@angular/http";
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class ClasProfesional2Service {
  public datos;
  config: any;
	constructor(private _http: Http,config: AppConfig){
         this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }  

 getDatosModelo() {
    let tokenfdi = JSON.parse(localStorage.getItem('fditoken'));
    let mitoken = localStorage.getItem('token');
    let api_token = tokenfdi.api_token;
    let parametros2: URLSearchParams = new URLSearchParams();
    parametros2.set('_token', mitoken);
    parametros2.set('api_token', api_token);
    let headers = '';
    return this._http.get(this.config.apilaravel + "cuestionario/seccion/4", { search: parametros2 }).map(res => {
      let headers = res.headers;
      let miobjeto = res.json();
      return (miobjeto);
    });
  }

  getDatosModeloProf1() {
    let tokenfdi = JSON.parse(localStorage.getItem('fditoken'));
    let mitoken = localStorage.getItem('token');
    let api_token = tokenfdi.api_token;
    let parametros2: URLSearchParams = new URLSearchParams();
    parametros2.set('_token', mitoken);
    parametros2.set('api_token', api_token);
    let headers = '';
    return this._http.get(this.config.apilaravel + "cuestionario/seccion/3", { search: parametros2 }).map(res => {
      let headers = res.headers;
      let miobjeto = res.json();
      return (miobjeto);
    });
  }

  setDatosModelo(modelo: any) {
    let tokenfdi = JSON.parse(localStorage.getItem('fditoken'));
    let mitoken = localStorage.getItem('token');
    let api_token = tokenfdi.api_token;
    let json = JSON.stringify(modelo);
    let parametros2: URLSearchParams = new URLSearchParams();
    parametros2.set('_token', mitoken);
    parametros2.set('api_token', api_token);
    parametros2.set('data', json);
    let misheaders = new Headers({ "X-Requested-With": "XMLHttpRequest", 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: misheaders });

    return this._http.post(this.config.apilaravel + "cuestionario/seccion",
      parametros2, options).map(res => res.json());

  }
}