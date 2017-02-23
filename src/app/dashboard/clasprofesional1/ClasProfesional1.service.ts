import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ClasProfesional1Service {
  public datos;
  constructor(private http: Http) {}

  getDatos(){
      return this.http
               .get('http://localhost:8080/superexcel/api/probando.php')
               .map(response => response.json().data as string);
  }

 

 
}