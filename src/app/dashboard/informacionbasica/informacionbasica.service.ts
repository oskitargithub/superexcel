import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {InformacionBasicaModel} from './informacionbasica.model';


import { AppConfig } from '../../app.config';


@Injectable()
export class InformacionBasicaService{
    config: any;
	constructor(private _http: Http,config: AppConfig){
         this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

    getInformacionBasica(){
        let mitoken = JSON.parse(localStorage.getItem('fditoken'));        
        let json = JSON.stringify({fditoken: mitoken.token});
        let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        
        
        return this._http.get(this.config.apilaravel + "cuestionario/seccion/2").map(res => res.json());
        /*return this._http.post(this.config.api + "informacionbasica.php/getinformacionbasica", 
				params, {headers: headers}).map(res => res.json());*/
    }
    
    edit(informacionbasica: InformacionBasicaModel){
        let mitoken = JSON.parse(localStorage.getItem('fditoken')); 
        let json = JSON.stringify({"informacionbasica": informacionbasica,"fditoken":mitoken.token} );
		let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.config.api + "informacionbasica.php/updinformacionbasica", 
				params, {headers: headers}).map(res => res.json());
    }
}