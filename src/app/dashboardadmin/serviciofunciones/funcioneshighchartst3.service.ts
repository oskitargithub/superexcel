import { Injectable } from '@angular/core';
import { Tabla3Model } from './funciones.model';

export class OpcionesModel {
    chart: any;
    colors:any;
    title: any;
    subtitle: any;
    xAxis: any;
    yAxis: any;
    tooltip: any;
    plotOptions: any;
    legend: any;
    credits: any;
    series: any;
}



@Injectable()
export class FuncionesHighChartsT3Service {
    constructor() {
        /** Vacío */
    }


    GraficaSimple(nombregrafica: string, subnombregrafica: string, tabla: Tabla3Model[]): Object {
        let misopciones: OpcionesModel;
        misopciones = {
            chart: {
                type: 'bar'
            },
            colors:['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a','#2f7ed8', '#0d233a'],
            title: {
                text: nombregrafica
            },
            subtitle: {
                text: subnombregrafica
            },
            xAxis: {
                categories: [], /*['Africa', 'America', 'Asia', 'Europe', 'Oceania'],*/
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',/* 'Population (millions)',*/
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                /*headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',*/
                shared: true,
                /*useHTML: true*/
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{y} / {point.miporc:.0f} %',
                        valueDecimals: 2
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: 0,
                y: 0,
                floating: true,
                borderWidth: 1,
                backgroundColor: ('#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [/*{
                name: 'Year 1800',
                data: [{x:0,y:107, miporc: "45"}, {x:1,y:31, miporc: "30"}]
            }, {
                name: 'Year 1900',
                data: [{x:0,y:100, miporc: "42"}, {x:1,y:31, miporc: "30"}]
            }*/]
        };
        let datosmujeres = [];
        let datoshombres = [];
        tabla.forEach(elemento => {
            misopciones.xAxis.categories.push(elemento.texto);
            //mujeres
            datosmujeres.push({y: elemento.mujeres , miporc:this.getMujeresDeFila(elemento,tabla)});          
            //hombres
            datoshombres.push({y: elemento.hombres , miporc:this.getHombresDeFila(elemento,tabla)});
            
        });
        misopciones.series.push({name: 'Mujeres', data: datosmujeres});
        misopciones.series.push({name: 'Hombres', data: datoshombres});
        console.log("misopciones");
        console.log(misopciones);
        return misopciones;
    }


    getMujeresDeFila(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = (elemento.mujeres * 1) / ((elemento.mujeres * 1) + (elemento.hombres * 1));
        if (!isNaN(salida))
            return Math.round(salida*100);
        else
            return 0;
    }






    getHombresDeFila(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = (elemento.hombres * 1) / ((elemento.mujeres * 1) + (elemento.hombres * 1));
        if (!isNaN(salida))
            return Math.round(salida*100);
        else
            return 0;
    }
}