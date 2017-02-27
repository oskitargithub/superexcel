import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Graficas1AdminService {
  public datos;
  constructor(private http: Http) {}

  getDatos(){
      return this.http
               .get('http://localhost/superexcel/api/probando.php')
               .map(response => response.json().data as string);
  }

 

 
}