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
		let headers = '';
        return this._http.get(this.config.apilaravel + "cuestionario/seccion/2").map(res =>{
            let headers = res.headers;
            console.log(headers);
            return(res.json());
        });
        /*return this._http.post(this.config.api + "informacionbasica.php/getinformacionbasica", 
				params, {headers: headers}).map(res => res.json());*/
    }
    
    edit(informacionbasica: InformacionBasicaModel, tokenjaume: string){
        let mitoken = JSON.parse(localStorage.getItem('fditoken')); 
        //informacionbasica = informacionbasica.push({"fditoken":mitoken.token})        
        let json = JSON.stringify(informacionbasica);
		let params = "_token="+tokenjaume+"&data="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'X-CSRF-TOKEN': tokenjaume, 'X-XSRF-TOKEN': tokenjaume});

		return this._http.post(this.config.apilaravel + "cuestionario/seccion", 
				params, {headers: headers}).map(res => res.json());
    }
}