import { Component, OnInit } from '@angular/core';
import { Graficas1AdminService } from './graficas1admin.service';

declare var jQuery: any;

@Component({
  selector: 'graficas1admin',
  styleUrls: ['./graficas1admin.style.scss'],
  templateUrl: './graficas1admin.template.html'
})
export class Graficas1AdminComponent implements OnInit {
    
    
    public datos:string = "datos";

    constructor(private Graficas1AdminService: Graficas1AdminService) {    
    }

    ngOnInit() {          
        this.Graficas1AdminService.getDatos()
        .subscribe(
            result => {
                    this.datos = result; 
                    /*this.sparklineCompositeData = [
                    [2, 4, 6, 2, 7, 5, 3, 7, 8, 3, 6],
                    [5, 3, 7, 8, 3, 6, 2, 4, 6, 2, 7]
                    ];
                    this.sparklinePieData = [2, 4, 6];*/
                   
                console.log("Mostrando datos");  
                    console.log(this.datos);
            },
            error => {
                console.log("Error");  
                console.log(<any>error);                                            
            }
        );
    }
}