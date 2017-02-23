import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';
import {AuthModel} from './auth.model';

@Injectable()
export class AuthService {
  config: any;
  isLoggedIn: boolean = false;


	constructor(private _http: Http,config: AppConfig){
         this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
         
    }
  
  
  

  // store the URL so we can redirect after logging in
  redirectUrl: string;


  estaLogado(roles:Array<string>){
      let mitoken = JSON.parse(localStorage.getItem('fditoken')); 
      let json = JSON.stringify({fditoken: mitoken.token, permisos: roles});
      let params = "json="+json;
      //consultamos en la BD si está logado
      let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
      return this._http.post(this.config.api + "login.php/isLogged", 
				params, {headers: headers}).map(res => res.json());  
  }

  login(usuario : AuthModel) {
    localStorage.removeItem('fditoken');
    let json = JSON.stringify(usuario);
    let params = "json="+json;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
      return this._http.post(this.config.api + "login.php/login", 
				params, {headers: headers}).map(res => res.json());  
   
  }

  logout(): void {
    localStorage.removeItem('fditoken');
    this.isLoggedIn = false;
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/