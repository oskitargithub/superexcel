import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
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


    getCuestionarios(){
        let mitoken = JSON.parse(localStorage.getItem('fditoken'));        
        let json = JSON.stringify({fditoken: mitoken.token});
        let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this._http.get(this.config.apilaravel + "gestion/cuestionarios").map(res => res.json());
    }

    getDatosUsuario(usuario:DashBoardAdminModel){
        let mitoken = JSON.parse(localStorage.getItem('fditoken'));        
        let json = JSON.stringify({fditoken: mitoken.token});
        let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this._http.get(this.config.apilaravel + "gestion/usuario/"+usuario.user).map(res => res.json());
    }
}