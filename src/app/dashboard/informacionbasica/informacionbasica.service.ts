import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {InformacionBasicaModel} from './informacionbasica.model';

@Injectable()
export class InformacionBasicaService{
	constructor(private _http: Http){}

    getInformacionBasica(){
        let mitoken = JSON.parse(localStorage.getItem('fditoken'));        
        let json = JSON.stringify({fditoken: mitoken.token});
        let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this._http.post("http://localhost/angular2/app/api/informacionbasica.php/getinformacionbasica", 
				params, {headers: headers}).map(res => res.json());
    }
    
    edit(informacionbasica: InformacionBasicaModel){
        let mitoken = JSON.parse(localStorage.getItem('fditoken')); 
        let json = JSON.stringify({"informacionbasica": informacionbasica,"fditoken":mitoken.token} );
		let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post("http://localhost/angular2/app/api/informacionbasica.php/updinformacionbasica", 
				params, {headers: headers}).map(res => res.json());
    }
}