import { Component, OnInit } from '@angular/core';
import { ClasProfesional1Service } from './ClasProfesional1.service';

@Component({
  selector: 'clasprofesional',
  templateUrl: './clasprofesional1.template.html'
})
export class ClasProfesional1Component implements OnInit {
    
    public datos:string = "datos";

    constructor(private ClasProfesional1Service: ClasProfesional1Service) {    
    }

    ngOnInit() {    
    this.ClasProfesional1Service.getDatos()
                                    .subscribe(
                                        result => {
                                                this.datos = result; 
                                                console.log(this.datos);
                                        },
                                        error => {
                                            console.log(<any>error);                                            
                                        }
                                    );
    }
}