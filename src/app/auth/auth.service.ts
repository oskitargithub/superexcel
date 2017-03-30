import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import { Router}      from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AppConfig } from '../app.config';
import {AuthModel} from './auth.model';

@Injectable()
export class AuthService {
  config: any;
  isLoggedIn: boolean = false;
  perfilauth : string = '';
  tipocuest: number = 0;
  usucuest:number = 0;
	constructor(private _http: Http,config: AppConfig, private router: Router){
         this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
         
    }
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  auth(roles:Array<string>): Observable<boolean> {
     if (localStorage.getItem("fditoken") === null) {
       this.router.navigate([this.config.login]);
      return Observable.of(false);
    }
    let mitoken = JSON.parse(localStorage.getItem('fditoken')); 
    //paso el roles[0] porque nada más voy a considerar que se pone un rol por ruta
    let json = JSON.stringify({fditoken: mitoken.token, permisos: roles[0], usuario: mitoken.usuario, perfil: mitoken.perfil});
    let params = "json="+json;
    //consultamos en la BD si está logado
    console.log("Consultamos la bd con el rol:" + roles[0]);
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    /*return this._http.post(this.config.api + "login.php/isLogged2", params, {headers: headers})
            .map((response: Response) =>{ 
              return response.json().success});*/
    return this._http.post(this.config.api + "login.php/isLogged2", params, {headers: headers})
      .map(res => {
        this.perfilauth = roles[0];
        if(res.json().tipocuest!=null)
          this.tipocuest= res.json().tipocuest;
        return res.json().success});  
  }

 
  login(usuario : AuthModel) {
    localStorage.removeItem('fditoken');
    let json = JSON.stringify(usuario);
    let params = "json="+json;
    this.redirectUrl = this.config.urluser;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
      return this._http.post(this.config.api + "login.php/login", 
				params, {headers: headers}).map(res => res.json());  
   
  }

  ResetPassword(usuario : AuthModel) {
    localStorage.removeItem('fditoken');
    let json = JSON.stringify(usuario);
    let params = "json="+json;
    this.redirectUrl = this.config.urluser;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
      return this._http.post(this.config.api + "login.php/resetpassword", 
				params, {headers: headers}).map(res => res.json());  
   
  }

  logout(): void {
    localStorage.removeItem('fditoken');
    this.isLoggedIn = false;
  }
}
