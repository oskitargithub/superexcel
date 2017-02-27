import { Component, OnInit } from '@angular/core';
import { Graficas1AdminService } from './graficas1admin.service';

declare var jQuery: any;

@Component({
  selector: 'graficas1admin',
  styleUrls: ['./graficas1admin.style.scss'],
  templateUrl: './graficas1admin.template.html'
})
export class Graficas1AdminComponent implements OnInit {
    
    sparklineCompositeData: Array<any>;
    sparklineCompositeOptions: Array<any>;
    sparklinePieData: Array<any>;
    sparklinePieOptions: any;
    public datos:string = "datos";

    constructor(private Graficas1AdminService: Graficas1AdminService) {    
    }

    ngOnInit() {  
        this.sparklineCompositeData = [];
        
        this.sparklinePieData = []; 
        this.sparklineCompositeOptions = [{
        width: '99%',
        fillColor: '#ddd',
        height: '100px',
        lineColor: 'transparent',
        spotColor: '#c0d0f0',
        minSpotColor: null,
        maxSpotColor: null,
        highlightSpotColor: '#ddd',
        highlightLineColor: '#ddd'
        }, {
        lineColor: 'transparent',
        spotColor: '#c0d0f0',
        fillColor: 'rgba(192, 208, 240, 0.76)',
        minSpotColor: null,
        maxSpotColor: null,
        highlightSpotColor: '#ddd',
        highlightLineColor: '#ddd'
        }];
        this.sparklinePieOptions = {
            type: 'pie',
            width: '100px',
            height: '100px',
            sliceColors: ['#F5CB7B', '#FAEEE5', '#f0f0f0']
        };
        this.Graficas1AdminService.getDatos()
        .subscribe(
            result => {
                    this.datos = result; 
                    this.sparklineCompositeData = [
                    [2, 4, 6, 2, 7, 5, 3, 7, 8, 3, 6],
                    [5, 3, 7, 8, 3, 6, 2, 4, 6, 2, 7]
                    ];
                    this.sparklinePieData = [2, 4, 6];
                   
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