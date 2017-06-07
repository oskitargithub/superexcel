import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams,RequestOptions } from "@angular/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AppConfig } from '../app.config';
import { AuthModel } from './auth.model';

@Injectable()
export class AuthService {
  config: any;
  isLoggedIn: boolean = false;
  perfilauth: string = '';
  tipocuest: number = 1;
  usucuest: number = 0;
  api_token: any='';
  constructor(private _http: Http, config: AppConfig, private router: Router) {
    this.config = config.getConfig(); //me traigo la configuración para saber la url de la api

  }
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  auth(roles: Array<string>): Observable<boolean> {
    if (localStorage.getItem("fditoken") === null) {
      this.router.navigate([this.config.login]);
      return Observable.of(false);
    }
    
    let tokenfdi = JSON.parse(localStorage.getItem('fditoken'));
    let mitoken = localStorage.getItem('token');
    let api_token = tokenfdi.api_token;
    let parametros2: URLSearchParams = new URLSearchParams();
    parametros2.set('_token', mitoken);
    parametros2.set('api_token', api_token);
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded',  'Access-Control-Allow-Origin': '*' });
    
   
    return this._http.post(this.config.apilaravel + "isLoggedIn", 
      parametros2).map(res => {
        let datos = res.json().data[0];
        console.log("Asignamos rol:" + datos.perfil);
        
        this.perfilauth = datos.perfil;
        if (datos.cuest != null)
          this.tipocuest = datos.cuest;
        else
          this.tipocuest = 1; // lo pongo a 1 para que no de error en el admin
        
        return (res.json().isLoggedIn==true);
      });
   
   
   
   
    /*return this._http.get(this.config.apilaravel + "isLoggedIn",
      { search: parametros2 }).map(res => {
        console.log("Asignamos rol:" + roles[0]);
        this.perfilauth = roles[0];
        if (res.json().tipocuest != null)
          this.tipocuest = res.json().tipocuest;
        //return res.json().success
        //return res.json().isLoggedIn
        this.tipocuest = 1;
        return true
      });*/
  }


  getToken() {
    //let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
    return this._http.get(this.config.apilaravel + "token"/*, { headers: headers }*/).map(res => {
      let headers = res.headers;
      let miobjeto = res.json();
      return (miobjeto);
    });
  }

  login(usuario: AuthModel) {
    console.log("login con");
    console.log(usuario);
    localStorage.removeItem('fditoken');
    let json = JSON.stringify(usuario);
    let params = "json=" + json;
    let parametros = "usuario=" + usuario.usuario + "&clave=" + usuario.clave + "&_token=" + usuario.token;
    let misheaders = new Headers({ /*"X-Requested-With": "XMLHttpRequest",*/'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: misheaders });


    this.redirectUrl = this.config.urluser;
    return this._http.post(this.config.apilaravel + "login", 
      parametros.toString(), options).map(res => res.json());
    /*
    let parametros2: URLSearchParams = new URLSearchParams();
    parametros2.set('usuario', usuario.usuario);
    parametros2.set('clave', usuario.clave);
    parametros2.set('_token', usuario.token);
    
    return this._http.post(this.config.apilaravel + "login",
      parametros2.toString()).map(res => res.json());
*/
  }

  ResetPassword(usuario: AuthModel) {
    localStorage.removeItem('fditoken');
    let json = JSON.stringify(usuario);
    let params = "json=" + json;
    this.redirectUrl = this.config.urluser;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.config.api + "login.php/resetpassword",
      params, { headers: headers }).map(res => res.json());

  }

  logout(): void {
    localStorage.removeItem('fditoken');
    this.isLoggedIn = false;
  }
}
