import { Injectable } from '@angular/core';
import { Tabla3Model, Tabla5Model } from './funciones.model';

export class OpcionesModel {
    chart: any;
    colors: any;
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
export class OpcionesPieModel {
    chart: any;
    colors: any;
    tooltip: any;
    title: any;
    plotOptions: any;
    series: any;
    credits: any;
}





@Injectable()
export class FuncionesHighChartsT3Service {
    private colorespie: any[];
    private colormujer = '#910000';
    private colorhombre = '#8bbc21';
    private pointPadding = 0.01;
    private pointWidth = 20;
    private groupPadding = 0.1;
    private legendx = 0;
    private legendy = 20;
    constructor() {
        /** Vacío */
        /*this.colorespie = ['#492970', '#f28f43', '#1aadce', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a',
            '#81F7BE', '#DF3A01', '#A901DB', '#0B0B61', '#0B6121', '#FF0040', '#F3F781', '#8A0868', '#FA5858', '#9FF781'];*/
        this.colorespie = ['#E5AEFA', '#60DDD0', '#1F9DDD', '#E2F9D4', '#F4F87B', '#FEC323', '#DD9B60', '#42A407',
            '#81F7BE', '#DF3A01', '#A901DB', '#0B0B61', '#0B6121', '#FF0040', '#F3F781', '#8A0868', '#FA5858', '#9FF781'];
    }


    GraficaPiePlantilla(modelo: any, texto1 = "Distribución de la plantilla por sexo", texto2 = "Acoso Sexual"): Object {
        let misopciones: OpcionesPieModel;
        misopciones = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: texto1
            }, colors: [],
            /*colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],*/
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.numero} / {point.percentage:.2f}%'
                    },
                    showInLegend: true
                }
            },
            series: []
        }


        let datos = [];
        datos.push({ y: this.getMujeresPlantillaPorcentaje(modelo), name: 'Mujeres', numero: this.getMujeresPlantilla(modelo), color: this.colormujer });
        datos.push({ y: this.getHombresPlantillaPorcentaje(modelo), name: 'Hombres', numero: this.getHombresPlantilla(modelo), color: this.colorhombre });
        misopciones.series.push({ type: 'pie', name: texto2, data: datos });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }
    GraficaPiePlantillaPr(modelo: any, texto1 = "Distribución de la plantilla por sexo", texto2 = "Acoso Sexual"): Object {
        let misopciones: OpcionesPieModel;
        misopciones = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: texto1
            }, colors: [],
            /*colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],*/
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.numero} / {point.percentage:.2f}%'
                    },
                    showInLegend: true
                }
            },
            series: []
        }


        let datos = [];
        datos.push({ y: this.getMujeresPlantillaPorcentajePr(modelo), name: 'Mujeres', numero: this.getMujeresPlantillaPr(modelo), color: this.colormujer });
        datos.push({ y: this.getHombresPlantillaPorcentajePr(modelo), name: 'Hombres', numero: this.getHombresPlantillaPr(modelo), color: this.colorhombre });
        misopciones.series.push({ type: 'pie', name: texto2, data: datos });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }

    GraficaPieHM(titulo: string, valor1: any, valor2: any): Object {
        let misopciones: OpcionesPieModel;
        misopciones = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: titulo
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y} / {point.percentage:.2f}%'
                    },
                    showInLegend: true
                }
            },
            series: []
        }


        let datos = [];
        datos.push({ y: valor1 * 1, name: 'Mujeres', numero: valor1 * 1, color: this.colormujer });
        datos.push({ y: valor2 * 1, name: 'Hombres', numero: valor2 * 1, color: this.colorhombre });
        misopciones.series.push({ type: 'pie', name: titulo, data: datos });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }


    GraficaPieSimple(nombregrafica: string, subnombregrafica: string, tabla: Tabla3Model[]): Object {
        let misopciones: OpcionesPieModel;
        misopciones = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: nombregrafica
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            }, plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name} {point.numero} / {point.percentage:.1f}%'
                    }
                }
            },
            series: [/*{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Firefox', 45.0],
                    ['IE', 26.8],
                    {
                        name: 'Chrome',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['Safari', 8.5],
                    ['Opera', 6.2],
                    ['Others', 0.7]
                ]
            }*/]
        }


        let datos = [];
        datos.push({ y: this.getSumaMujeresDelTotal(tabla), name: 'Mujeres', numero: this.getTotalMujeres(tabla), color: this.colormujer });
        datos.push({ y: this.getSumaHombresDelTotal(tabla), name: 'Hombres', numero: this.getTotalHombres(tabla), color: this.colorhombre });
        misopciones.series.push({ type: 'pie', name: subnombregrafica, data: datos });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }

    GraficaSimple(nombregrafica: string, subnombregrafica: string, tabla: Tabla3Model[]): Object {
        let numelems = 0;
        tabla.forEach(elemento => {
            if (elemento.hombres != 0 || elemento.mujeres != 0) {
                numelems++;
            }
        });
        let ancho = 800;
        let alto = 1200;
        alto = this.altoGrafica(numelems);
        ancho = this.anchoGrafica(numelems);
        let misopciones: OpcionesModel;
        misopciones = {
            chart: {
                type: 'bar',
                height: alto,
                width: ancho
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
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
                },
                series: {
                    pointPadding: this.pointPadding,
                    pointWidth: this.pointWidth,
                    groupPadding: this.groupPadding
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: this.legendx,
                y: this.legendy,
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
        tabla.forEach((elemento, index) => {
            if (elemento.hombres != 0 || elemento.mujeres != 0) {
                misopciones.xAxis.categories.push(elemento.texto);
                //mujeres
                datosmujeres.push({ y: elemento.mujeres, miporc: this.getMujeresDeFila(elemento, tabla), color: this.colormujer });
                //hombres
                datoshombres.push({ y: elemento.hombres, miporc: this.getHombresDeFila(elemento, tabla), color: this.colorhombre });
            }
        });
        misopciones.series.push({ name: 'Mujeres', data: datosmujeres });
        misopciones.series.push({ name: 'Hombres', data: datoshombres });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }


    GraficaCompuesta1(nombregrafica: string, subnombregrafica: string, tabla: Tabla3Model[], tipo = "fila", mostrarceros = 0): Object {
        let numelems = 0;
        tabla.forEach(elemento => {
            if (elemento.hombres != 0 || elemento.mujeres != 0) {
                numelems++;
            }
        });
        let ancho = 800;
        let alto = 1200;
        let milayout = 'vertical';
        alto = this.altoGrafica(numelems);
        ancho = this.anchoGrafica(numelems);
        let misopciones: OpcionesModel;
        misopciones = {
            chart: {
                type: 'bar',
                height: alto,
                width: ancho
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
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
                shared: true
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{y} / {point.miporc:.0f} %',
                        valueDecimals: 2
                    }
                },
                series: {
                    pointPadding: this.pointPadding,
                    pointWidth: this.pointWidth,
                    groupPadding: this.groupPadding
                }
            },
            legend: {
                layout: milayout,
                align: 'right',
                verticalAlign: 'top',
                x: this.legendx,
                y: this.legendy,
                floating: true,
                borderWidth: 1,
                backgroundColor: ('#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: []
        };
        let datosmujeres = [];
        let datoshombres = [];

        tabla.forEach(elemento => {
            if (mostrarceros == 1) {
                misopciones.xAxis.categories.push(elemento.texto);
                if (tipo == "fila") {
                    //mujeres
                    datosmujeres.push({ y: elemento.mujeres == '' ? 0 : elemento.mujeres, miporc: this.getMujeresDeFila(elemento, tabla), color: this.colormujer });
                    //hombres
                    datoshombres.push({ y: elemento.hombres == '' ? 0 : elemento.hombres, miporc: this.getHombresDeFila(elemento, tabla), color: this.colorhombre });
                }
                else if (tipo == "total") {
                    //mujeres
                    datosmujeres.push({ y: elemento.mujeres == '' ? 0 : elemento.mujeres, miporc: Math.round(this.getMujeresDelTotal(elemento, tabla) * 100), color: this.colormujer });
                    //hombres
                    datoshombres.push({ y: elemento.hombres == '' ? 0 : elemento.hombres, miporc: Math.round(this.getHombresDelTotal(elemento, tabla) * 100), color: this.colorhombre });
                }
            }
            else {
                if (elemento.hombres != 0 || elemento.mujeres != 0) {
                    var re = /En caso afirmativo indique cuantas personas/gi; 
                    var newstr = elemento.texto.replace(re, "Personas que"); 
                    misopciones.xAxis.categories.push(newstr);
                    if (tipo == "fila") {
                        //mujeres
                        datosmujeres.push({ y: elemento.mujeres, miporc: this.getMujeresDeFila(elemento, tabla), color: this.colormujer });
                        //hombres
                        datoshombres.push({ y: elemento.hombres, miporc: this.getHombresDeFila(elemento, tabla), color: this.colorhombre });
                    }
                    else if (tipo == "total") {
                        //mujeres
                        datosmujeres.push({ y: elemento.mujeres, miporc: Math.round(this.getMujeresDelTotal(elemento, tabla) * 100), color: this.colormujer });
                        //hombres
                        datoshombres.push({ y: elemento.hombres, miporc: Math.round(this.getHombresDelTotal(elemento, tabla) * 100), color: this.colorhombre });
                    }

                }
            }
        });
        misopciones.series.push({ name: 'Mujeres', data: datosmujeres });
        misopciones.series.push({ name: 'Hombres', data: datoshombres });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }



    GraficaCompuesta1Hombres(nombregrafica: string, subnombregrafica: string, tabla: Tabla3Model[], tipo = "fila", mostrarceros = 0): Object {
        let numelems = 0;
        tabla.forEach(elemento => {
            if (elemento.hombres != 0) {
                numelems++;
            }
        });
        let ancho = 800;
        let alto = 1200;
        let milayout = 'vertical';
        alto = this.altoGrafica(numelems);
        ancho = this.anchoGrafica(numelems);


        let misopciones: OpcionesModel;
        misopciones = {
            chart: {
                type: 'bar',
                height: alto,
                width: ancho
            },
            colors: ['#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
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
                shared: true
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{y} / {point.miporc:.0f} %',
                        valueDecimals: 2
                    }
                },
                series: {
                    pointPadding: this.pointPadding,
                    pointWidth: this.pointWidth,
                    groupPadding: this.groupPadding
                }
            },
            legend: {
                layout: milayout,
                align: 'right',
                verticalAlign: 'top',
                x: this.legendx,
                y: this.legendy,
                floating: true,
                borderWidth: 1,
                backgroundColor: ('#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: []
        };

        let datoshombres = [];

        tabla.forEach(elemento => {
            if (mostrarceros == 1) {
                misopciones.xAxis.categories.push(elemento.texto);
                if (tipo == "fila") {
                    //hombres
                    datoshombres.push({ y: elemento.hombres == '' ? 0 : elemento.hombres, miporc: this.getHombresDeFila(elemento, tabla), color: this.colorhombre });
                }
                else if (tipo == "total") {
                    //hombres
                    datoshombres.push({ y: elemento.hombres == '' ? 0 : elemento.hombres, miporc: Math.round(this.getHombresDelTotal(elemento, tabla) * 100), color: this.colorhombre });
                }
            }
            else {
                if (elemento.hombres != 0) {
                    misopciones.xAxis.categories.push(elemento.texto);
                    if (tipo == "fila") {
                        //hombres
                        datoshombres.push({ y: elemento.hombres, miporc: this.getHombresDeFila(elemento, tabla), color: this.colorhombre });
                    }
                    else if (tipo == "total") {
                        //hombres
                        datoshombres.push({ y: elemento.hombres, miporc: Math.round(this.getHombresDelTotal(elemento, tabla) * 100), color: this.colorhombre });
                    }

                }
            }
        });
        misopciones.series.push({ name: 'Hombres', data: datoshombres });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }

    GraficaCompuesta1Mujeres(nombregrafica: string, subnombregrafica: string, tabla: Tabla3Model[], tipo = "fila", mostrarceros = 0): Object {
        let numelems = 0;
        tabla.forEach(elemento => {
            if (elemento.mujeres != 0) {
                numelems++;
            }
        });
        let ancho = 800;
        let alto = 1200;
        let milayout = 'vertical';
        alto = this.altoGrafica(numelems);
        ancho = this.anchoGrafica(numelems);


        let misopciones: OpcionesModel;
        misopciones = {
            chart: {
                type: 'bar',
                height: alto,
                width: ancho
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
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
                shared: true
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{y} / {point.miporc:.0f} %',
                        valueDecimals: 2
                    }
                },
                series: {
                    pointPadding: this.pointPadding,
                    pointWidth: this.pointWidth,
                    groupPadding: this.groupPadding
                }
            },
            legend: {
                layout: milayout,
                align: 'right',
                verticalAlign: 'top',
                x: this.legendx,
                y: this.legendy,
                floating: true,
                borderWidth: 1,
                backgroundColor: ('#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: []
        };
        let datosmujeres = [];


        tabla.forEach(elemento => {
            if (mostrarceros == 1) {
                misopciones.xAxis.categories.push(elemento.texto);
                if (tipo == "fila") {
                    //mujeres
                    datosmujeres.push({ y: elemento.mujeres == '' ? 0 : elemento.mujeres, miporc: this.getMujeresDeFila(elemento, tabla), color: this.colormujer });
                }
                else if (tipo == "total") {
                    //mujeres
                    datosmujeres.push({ y: elemento.mujeres == '' ? 0 : elemento.mujeres, miporc: Math.round(this.getMujeresDelTotal(elemento, tabla) * 100), color: this.colormujer });
                }
            }
            else {
                if (elemento.mujeres != 0) {
                    misopciones.xAxis.categories.push(elemento.texto);
                    if (tipo == "fila") {
                        //mujeres
                        datosmujeres.push({ y: elemento.mujeres, miporc: this.getMujeresDeFila(elemento, tabla), color: this.colormujer });
                    }
                    else if (tipo == "total") {
                        //mujeres
                        datosmujeres.push({ y: elemento.mujeres, miporc: Math.round(this.getMujeresDelTotal(elemento, tabla) * 100), color: this.colormujer });
                    }

                }
            }
        });
        misopciones.series.push({ name: 'Mujeres', data: datosmujeres });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }


    GraficaCompuesta1ConOpcion(nombregrafica: string, subnombregrafica: string, tabla: Tabla3Model[], tipo = "fila", opcionmostrar): Object {
        let numelems = 2;
        let ancho = 300;
        let alto = 200;
        let milayout = 'vertical';
        let misopciones: OpcionesModel;
        misopciones = {
            chart: {
                type: 'bar',
                height: alto,
                width: ancho
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
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
                shared: true
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{y} / {point.miporc:.0f} %',
                        valueDecimals: 2
                    }
                },
                series: {
                    pointPadding: this.pointPadding,
                    pointWidth: this.pointWidth,
                    groupPadding: this.groupPadding
                }
            },
            legend: {
                layout: milayout,
                align: 'right',
                verticalAlign: 'top',
                x: this.legendx,
                y: this.legendy,
                floating: true,
                borderWidth: 1,
                backgroundColor: ('#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: []
        };
        let datosmujeres = [];
        let datoshombres = [];

        tabla.forEach(elemento => {

            if (elemento.hombres != 0 || elemento.mujeres != 0) {
                if (elemento.texto == opcionmostrar) {
                    misopciones.xAxis.categories.push(elemento.texto);
                    if (tipo == "fila") {
                        //mujeres
                        datosmujeres.push({ y: elemento.mujeres, miporc: this.getMujeresDeFila(elemento, tabla), color: this.colormujer });
                        //hombres
                        datoshombres.push({ y: elemento.hombres, miporc: this.getHombresDeFila(elemento, tabla), color: this.colorhombre });
                    }
                    else if (tipo == "total") {
                        //mujeres
                        datosmujeres.push({ y: elemento.mujeres, miporc: Math.round(this.getMujeresDelTotal(elemento, tabla) * 100), color: this.colormujer });
                        //hombres
                        datoshombres.push({ y: elemento.hombres, miporc: Math.round(this.getHombresDelTotal(elemento, tabla) * 100), color: this.colorhombre });
                    }
                }
            }

        });
        misopciones.series.push({ name: 'Mujeres', data: datosmujeres });
        misopciones.series.push({ name: 'Hombres', data: datoshombres });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }

    GraficaCompuesta1SinOpciones(nombregrafica: string, subnombregrafica: string, tabla: Tabla3Model[], tipo = "fila", opcionmostrar, opcionmostrar2): Object {
        let numelems = 0;
        tabla.forEach(elemento => {
            if (elemento.hombres != 0 || elemento.mujeres != 0) {
                numelems++;
            }
        });
        numelems = numelems - 2;
        let ancho = 800;
        let alto = 1200;
        let milayout = 'vertical';
        alto = this.altoGrafica(numelems);
        ancho = this.anchoGrafica(numelems);


        let misopciones: OpcionesModel;
        misopciones = {
            chart: {
                type: 'bar',
                height: alto,
                width: ancho
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
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
                shared: true
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{y} / {point.miporc:.0f} %',
                        valueDecimals: 2
                    }
                },
                series: {
                    pointPadding: this.pointPadding,
                    pointWidth: this.pointWidth,
                    groupPadding: this.groupPadding
                }
            },
            legend: {
                layout: milayout,
                align: 'right',
                verticalAlign: 'top',
                x: this.legendx,
                y: this.legendy,
                floating: true,
                borderWidth: 1,
                backgroundColor: ('#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: []
        };
        let datosmujeres = [];
        let datoshombres = [];

        tabla.forEach(elemento => {

            if (elemento.hombres != 0 || elemento.mujeres != 0) {
                if (elemento.texto != opcionmostrar && elemento.texto != opcionmostrar2) {
                    misopciones.xAxis.categories.push(elemento.texto);
                    if (tipo == "fila") {
                        //mujeres
                        datosmujeres.push({ y: elemento.mujeres, miporc: this.getMujeresDeFila(elemento, tabla), color: this.colormujer });
                        //hombres
                        datoshombres.push({ y: elemento.hombres, miporc: this.getHombresDeFila(elemento, tabla), color: this.colorhombre });
                    }
                    else if (tipo == "total") {
                        //mujeres
                        datosmujeres.push({ y: elemento.mujeres, miporc: Math.round(this.getMujeresDelTotal(elemento, tabla) * 100), color: this.colormujer });
                        //hombres
                        datoshombres.push({ y: elemento.hombres, miporc: Math.round(this.getHombresDelTotal(elemento, tabla) * 100), color: this.colorhombre });
                    }
                }
            }

        });
        misopciones.series.push({ name: 'Mujeres', data: datosmujeres });
        misopciones.series.push({ name: 'Hombres', data: datoshombres });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }

    GraficaCompuesta1Proporcionada(nombregrafica: string, subnombregrafica: string, tabla: Tabla3Model[]): Object {
        let numelems = 0;
        tabla.forEach(elemento => {
            if (elemento.hombres != 0 || elemento.mujeres != 0) {
                numelems++;
            }
        });
        let ancho = 800;
        let alto = 1200;
        let milayout = 'vertical';
        alto = this.altoGrafica(numelems);
        ancho = this.anchoGrafica(numelems);
        
        let misopciones: OpcionesModel;
        misopciones = {
            chart: {
                type: 'bar',
                height: alto,
                width: ancho
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
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
                shared: true
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.miporc:.0f} %',
                        valueDecimals: 2
                    }
                },
                series: {
                    pointPadding: this.pointPadding,
                    pointWidth: this.pointWidth,
                    groupPadding: this.groupPadding
                }
            },
            legend: {
                layout: milayout,
                align: 'right',
                verticalAlign: 'top',
                x: this.legendx,
                y: this.legendy,
                floating: true,
                borderWidth: 1,
                backgroundColor: ('#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: []
        };
        let datosmujeres = [];
        let datoshombres = [];
        tabla.forEach(elemento => {
            if (elemento.hombres != 0 || elemento.mujeres != 0) {
                misopciones.xAxis.categories.push(elemento.texto);
                //mujeres
                datosmujeres.push({ y: this.getPorcMujeresAbs(elemento, tabla), miporc: this.getPorcMujeresAbs(elemento, tabla), color: this.colormujer });
                //hombres
                datoshombres.push({ y: this.getPorcHombresAbs(elemento, tabla), miporc: this.getPorcHombresAbs(elemento, tabla), color: this.colorhombre });
            }
        });
        misopciones.series.push({ name: 'Mujeres %', data: datosmujeres });
        misopciones.series.push({ name: 'Hombres %', data: datoshombres });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }


    GraficaPieCompuesta1(nombregrafica: string, subnombregrafica: string, tabla: Tabla3Model[], tipo = "fila"): Object {
        let misopciones: OpcionesPieModel;
        misopciones = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: nombregrafica
            },
            colors: ['#910000', '#492970', '#8bbc21', '#1aadce', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            }, plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y} / {point.percentage:.2f}%'
                        /*format: '{point.name} {point.y} / {point.numero:.1f}%'*/
                    },
                    showInLegend: true
                }
            },
            series: []
        }


        let datos = [];
        tabla.forEach((elemento, index) => {
            if (elemento.mujeres != 0) {
                if (tipo == "fila") {
                    
                    console.log("mujeres"+elemento.mujeres+"/"+this.getMujeresDeFila(elemento, tabla));
                    
                    datos.push({ y: elemento.mujeres, name: elemento.texto, numero: this.getMujeresDeFila(elemento, tabla), color: this.colorespie[index] });
                }
                else if (tipo == "total") {
                    datos.push({ y: elemento.mujeres, name: elemento.texto, numero: Math.round(this.getMujeresDelTotal(elemento, tabla) * 100), color: this.colorespie[index] });
                }
            }
        });
        misopciones.series.push({ type: 'pie', name: subnombregrafica, data: datos });
        console.log("misopciones" + nombregrafica);
        console.log(misopciones);
        return misopciones;
    }
    GraficaPieCompuesta2(nombregrafica: string, subnombregrafica: string, tabla: Tabla3Model[], tipo = "fila"): Object {

        let misopciones: OpcionesPieModel;
        misopciones = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: nombregrafica
            },
            colors: ['#910000', '#492970', '#8bbc21', '#1aadce', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            }, plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y} / {point.percentage:.2f}%'
                        /*format: '{point.name} {point.y} / {point.numero:.1f}%'*/
                    },
                    showInLegend: true
                }
            },
            series: []
        }


        let datos = [];
        tabla.forEach((elemento, index) => {
            if (elemento.hombres != 0) {
                if (tipo == "fila") {
                    datos.push({ y: elemento.hombres, name: elemento.texto, numero: this.getHombresDeFila(elemento, tabla), color: this.colorespie[index] });
                }
                else if (tipo == "total") {
                    datos.push({ y: elemento.hombres, name: elemento.texto, numero: Math.round(this.getHombresDelTotal(elemento, tabla) * 100), color: this.colorespie[index] });
                }
            }
        });
        misopciones.series.push({ type: 'pie', name: subnombregrafica, data: datos });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }


    GraficaCompuestat5(nombregrafica: string, subnombregrafica: string, tabla: Tabla5Model[], mostrarceros = 0): Object {
        let numelems = 0;
        tabla.forEach(elemento => {
            if (mostrarceros == 1) {
                numelems++;
            }
            else {
                if (elemento.hombres != 0 || elemento.mujeres != 0) {
                    numelems++;
                }
            }
        });
        let ancho = 800;
        let alto = 1200;
        alto = this.altoGrafica(numelems);
        ancho = this.anchoGrafica(numelems);
        let misopciones: OpcionesModel;
        misopciones = {
            chart: {
                type: 'bar',
                height: alto,
                width: ancho

            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
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
                shared: true
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{y} / {point.miporc:.2f} %',
                        valueDecimals: 2,
                        crop: false
                    }
                },
                series: {
                    pointPadding: this.pointPadding,
                    pointWidth: this.pointWidth,
                    groupPadding: this.groupPadding
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: this.legendx,
                y: this.legendy,
                floating: true,
                borderWidth: 1,
                backgroundColor: ('#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: []
        };
        let datosmujeres = [];
        let datoshombres = [];
        tabla.forEach(elemento => {
            if (mostrarceros == 1) {
                if (elemento.hombres != 0 || elemento.mujeres != 0) {
                    misopciones.xAxis.categories.push(elemento.texto);
                    //mujeres
                    datosmujeres.push({ y: elemento.mujeres, miporc: this.getMujeresDeFila1(elemento, tabla), color: this.colormujer });
                    //hombres
                    datoshombres.push({ y: elemento.hombres, miporc: this.getHombresDeFila1(elemento, tabla), color: this.colorhombre });
                }
                else {

                    misopciones.xAxis.categories.push(elemento.texto);
                    datosmujeres.push({ y: elemento.mujeres == '' ? 0 : elemento.mujeres, miporc: this.getMujeresDeFila1(elemento, tabla), color: this.colormujer });
                    datoshombres.push({ y: elemento.hombres == '' ? 0 : elemento.hombres, miporc: this.getHombresDeFila1(elemento, tabla), color: this.colorhombre });
                }


            }
            else {
                if (elemento.hombres != 0 || elemento.mujeres != 0) {
                    misopciones.xAxis.categories.push(elemento.texto);
                    //mujeres
                    datosmujeres.push({ y: elemento.mujeres, miporc: this.getMujeresDeFila1(elemento, tabla), color: this.colormujer });
                    //hombres
                    datoshombres.push({ y: elemento.hombres, miporc: this.getHombresDeFila1(elemento, tabla), color: this.colorhombre });
                }
            }
        });
        misopciones.series.push({ name: 'Mujeres', data: datosmujeres });
        misopciones.series.push({ name: 'Hombres', data: datoshombres });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }

    GraficaCompuestat5_2(nombregrafica: string, subnombregrafica: string, tabla: Tabla5Model[], mostrarceros = 0): Object {
        let numelems = 0;
        tabla.forEach(elemento => {
            if (mostrarceros == 1) {
                numelems++;
            }
            else {
                if (elemento.hombres2 != 0 || elemento.mujeres2 != 0) {
                    numelems++;
                }
            }
        });


        let ancho = 800;
        let alto = 1200;
        alto = this.altoGrafica(numelems);
        ancho = this.anchoGrafica(numelems);
        let misopciones: OpcionesModel;
        misopciones = {
            chart: {
                type: 'bar',
                height: alto,
                width: ancho
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
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
                shared: true
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{y} / {point.miporc:.2f} %',
                        valueDecimals: 2
                    }
                },
                series: {
                    pointPadding: this.pointPadding,
                    pointWidth: this.pointWidth,
                    groupPadding: this.groupPadding
                },
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: this.legendx,
                y: this.legendy,
                floating: true,
                borderWidth: 1,
                backgroundColor: ('#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: []
        };
        let datosmujeres = [];
        let datoshombres = [];
        tabla.forEach(elemento => {
            if (mostrarceros == 1) {
                misopciones.xAxis.categories.push(elemento.texto);
                //mujeres
                datosmujeres.push({ y: elemento.mujeres2 == '' ? 0 : elemento.mujeres2, miporc: this.getMujeresDeFila2(elemento, tabla), color: this.colormujer });
                //hombres
                datoshombres.push({ y: elemento.hombres2 == '' ? 0 : elemento.hombres2, miporc: this.getHombresDeFila2(elemento, tabla), color: this.colorhombre });
            }
            else {
                if (elemento.hombres2 != 0 || elemento.mujeres2 != 0) {
                    misopciones.xAxis.categories.push(elemento.texto);
                    //mujeres
                    datosmujeres.push({ y: elemento.mujeres2, miporc: this.getMujeresDeFila2(elemento, tabla), color: this.colormujer });
                    //hombres
                    datoshombres.push({ y: elemento.hombres2, miporc: this.getHombresDeFila2(elemento, tabla), color: this.colorhombre });
                }
            }
        });
        misopciones.series.push({ name: 'Mujeres', data: datosmujeres });
        misopciones.series.push({ name: 'Hombres', data: datoshombres });
        //console.log("misopciones");

        return misopciones;
    }

    GraficaCompuestat5Proporcionada(nombregrafica: string, subnombregrafica: string, tabla: Tabla5Model[], mostrarceros = 0): Object {
        let numelems = 0;
        tabla.forEach(elemento => {
            if (elemento.hombres != 0 || elemento.mujeres != 0) {
                numelems++;
            }
        });

        let ancho = 800;
        let alto = 1200;
        alto = this.altoGrafica(numelems);
        ancho = this.anchoGrafica(numelems);
        let misopciones: OpcionesModel;
        misopciones = {
            chart: {
                type: 'bar',
                height: alto,
                width: ancho
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
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
                shared: true
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.miporc:.0f} %',
                        valueDecimals: 2
                    }
                },
                series: {
                    pointPadding: this.pointPadding,
                    pointWidth: this.pointWidth,
                    groupPadding: this.groupPadding
                },
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: this.legendx,
                y: this.legendy,
                floating: true,
                borderWidth: 1,
                backgroundColor: ('#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: []
        };
        let datosmujeres = [];
        let datoshombres = [];
        tabla.forEach(elemento => {
            if (mostrarceros == 1) {
                misopciones.xAxis.categories.push(elemento.texto);
                //mujeres
                datosmujeres.push({ y: this.getPorcMujeresAbs1(elemento, tabla), miporc: this.getPorcMujeresAbs1(elemento, tabla), color: this.colormujer });
                //hombres
                datoshombres.push({ y: this.getPorcHombresAbs1(elemento, tabla), miporc: this.getPorcHombresAbs1(elemento, tabla), color: this.colorhombre });
            }
            else {
                if (elemento.hombres != 0 || elemento.mujeres != 0) {
                    misopciones.xAxis.categories.push(elemento.texto);
                    //mujeres
                    datosmujeres.push({ y: this.getPorcMujeresAbs1(elemento, tabla), miporc: this.getPorcMujeresAbs1(elemento, tabla), color: this.colormujer });
                    //hombres
                    datoshombres.push({ y: this.getPorcHombresAbs1(elemento, tabla), miporc: this.getPorcHombresAbs1(elemento, tabla), color: this.colorhombre });
                }
            }
        });
        misopciones.series.push({ name: 'Mujeres %', data: datosmujeres });
        misopciones.series.push({ name: 'Hombres %', data: datoshombres });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }

    GraficaPie_t5_1Mujeres(nombregrafica: string, subnombregrafica: string, tabla: Tabla5Model[]): Object {
        let misopciones: OpcionesPieModel;
        misopciones = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: nombregrafica + " " + subnombregrafica
            }/*,
            legend: {
                width: 400,
                floating: true,
                align: 'left',
                x: 70, // = marginLeft - default spacingLeft
                itemWidth: 100,
                borderWidth: 1
            }*/,
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            }, plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.numero} / {point.percentage:.1f}%'
                    },
                    showInLegend: true
                }
            },
            series: []
        }
        let datos = [];
        tabla.forEach((elemento, index) => {
            if (elemento.mujeres != 0) {
                //mujeres
                datos.push({ name: elemento.texto, y: elemento.mujeres, numero: elemento.mujeres, miporc: this.getPorcMujeresAbs1(elemento, tabla), color: this.colorespie[index] });
            }
        });
        misopciones.series.push({ type: 'pie', name: subnombregrafica, data: datos });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }

    GraficaPie_t5_1Hombres(nombregrafica: string, subnombregrafica: string, tabla: Tabla5Model[]): Object {
        let misopciones: OpcionesPieModel;
        misopciones = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: nombregrafica + " " + subnombregrafica
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.numero} / {point.percentage:.1f}%'
                    },
                    showInLegend: true
                }
            },
            series: []
        }
        let datos = [];
        tabla.forEach((elemento, index) => {
            if (elemento.hombres != 0) {
                //mujeres
                datos.push({ name: elemento.texto, y: elemento.hombres, numero: elemento.hombres, miporc: this.getPorcHombresAbs1(elemento, tabla), color: this.colorespie[index] });
            }
        });
        misopciones.series.push({ type: 'pie', name: subnombregrafica, data: datos });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }

    GraficaPie_t5_2Mujeres(nombregrafica: string, subnombregrafica: string, tabla: Tabla5Model[]): Object {
        let misopciones: OpcionesPieModel;
        misopciones = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: nombregrafica + " " + subnombregrafica
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.numero} / {point.percentage:.1f}%'
                    },
                    showInLegend: true
                }
            },
            series: []
        }
        let datos = [];
        tabla.forEach((elemento, index) => {
            if (elemento.mujeres2 != 0) {
                //mujeres
                datos.push({ name: elemento.texto, y: elemento.mujeres2, numero: elemento.mujeres2, miporc: this.getPorcMujeresAbs2(elemento, tabla), color: this.colorespie[index] });
            }
        });
        misopciones.series.push({ type: 'pie', name: subnombregrafica, data: datos });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }

    GraficaPie_t5_2Hombres(nombregrafica: string, subnombregrafica: string, tabla: Tabla5Model[]): Object {
        let misopciones: OpcionesPieModel;
        misopciones = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: nombregrafica + " " + subnombregrafica
            },
            colors: ['#910000', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#2f7ed8', '#0d233a'],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.numero} / {point.percentage:.1f}%'
                    },
                    showInLegend: true
                }
            },
            series: []
        }
        let datos = [];
        tabla.forEach((elemento, index) => {
            if (elemento.hombres2 != 0) {
                //mujeres
                datos.push({ name: elemento.texto, y: elemento.hombres2, numero: elemento.hombres2, miporc: this.getPorcHombresAbs2(elemento, tabla), color: this.colorespie[index] });
            }
        });
        misopciones.series.push({ type: 'pie', name: subnombregrafica, data: datos });
        //console.log("misopciones");
        //console.log(misopciones);
        return misopciones;
    }




    altoGrafica(numelems: any) {
        let alto = 0;
        if (numelems < 4) {
            alto = 300;
        }
        else if (numelems < 8) {
            alto = 500;
        }
        else if (numelems < 12) {
            alto = 600;
        }
        else if (numelems < 24) {
            alto = 800;
        }
        else {
            alto = (numelems / 2) * 100;
        }
        return alto;
    }

    anchoGrafica(numelems: any) {
        let ancho = 0;
        if (numelems < 4) {
            ancho = 600;
        }
        else if (numelems < 8) {
            ancho = 600;
        }
        else if (numelems < 12) {
            ancho = 600;
        }
        else if (numelems < 24) {
            ancho = 600;
        }
        else {
            ancho = 800;
        }
        return ancho;
    }





    getMujeresPlantilla(modelo: any) {
        let salida = modelo.data.preg_46 * 1;
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getMujeresPlantillaPr(modelo: any) {
        let salida = modelo.data.preg_381 * 1;
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }


    getMujeresPlantillaPorcentaje(modelo: any) {
        let salida = (modelo.data.preg_46 * 1) * 100 / ((modelo.data.preg_46 * 1 + modelo.data.preg_47 * 1));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getMujeresPlantillaPorcentajePr(modelo: any) {
        let salida = (modelo.data.preg_381 * 1) * 100 / ((modelo.data.preg_381 * 1 + modelo.data.preg_382 * 1));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }


    getHombresPlantilla(modelo: any) {
        let salida = modelo.data.preg_47 * 1;
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }

    getHombresPlantillaPr(modelo: any) {
        let salida = modelo.data.preg_382 * 1;
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }

    getHombresPlantillaPorcentaje(modelo: any) {
        let salida = (modelo.data.preg_47 * 1) * 100 / ((modelo.data.preg_46 * 1) + (modelo.data.preg_47 * 1));
        if (!isNaN(salida))
            return salida;
        else
            return 0;

    }
    getHombresPlantillaPorcentajePr(modelo: any) {
        let salida = (modelo.data.preg_382 * 1) * 100 / ((modelo.data.preg_381 * 1) + (modelo.data.preg_382 * 1));
        if (!isNaN(salida))
            return salida;
        else
            return 0;

    }





    getPorcMujeresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = this.getMujeresAbs(elemento, tabla) / (this.getMujeresAbs(elemento, tabla) + this.getHombresAbs(elemento, tabla));
        if (!isNaN(salida))
            return Math.round(salida * 100);
        else
            return 0;
    }
    getPorcHombresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = this.getHombresAbs(elemento, tabla) / (this.getMujeresAbs(elemento, tabla) + this.getHombresAbs(elemento, tabla));
        if (!isNaN(salida))
            return Math.round(salida * 100);
        else
            return 0;
    }

    getMujeresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = ((elemento.mujeres * 1) * this.getTotalHombresMujeres(tabla)) / this.getTotalMujeres(tabla);
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }
    getHombresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = ((elemento.hombres * 1) * this.getTotalHombresMujeres(tabla)) / this.getTotalHombres(tabla);
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }






    getMujeresDeFila(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = (elemento.mujeres * 1) / ((elemento.mujeres * 1) + (elemento.hombres * 1));
        if (!isNaN(salida))
            return Math.round(salida * 100);
        else
            return 0;
    }

    getHombresDeFila(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = (elemento.hombres * 1) / ((elemento.mujeres * 1) + (elemento.hombres * 1));
        if (!isNaN(salida))
            return Math.round(salida * 100);
        else
            return 0;
    }


    getTotalMujeres(elemento: Tabla3Model[]) {
        if (elemento != null) {
            return elemento.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
        }
        else {
            return 0;
        }
    }
    getTotalHombres(elemento: Tabla3Model[]) {
        if (elemento != null) {
            return elemento.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
        }
        else {
            return 0;
        }
    }

    getSumaMujeresDelTotal(tabla: Tabla3Model[]) {
        /**suma de elementos de getMujeresDelTotal */
        let salida = 0;
        if (tabla != null) {
            tabla.forEach(elemento => {
                salida = salida + this.getMujeresDelTotal(elemento, tabla);
            });
        }
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }

    getSumaHombresDelTotal(tabla: Tabla3Model[]) {
        /**suma de elementos de getMujeresDelTotal */
        let salida = 0;
        if (tabla != null) {
            tabla.forEach(elemento => {
                salida = salida + this.getHombresDelTotal(elemento, tabla);
            });
        }
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }

    getTotalHombresMujeres(elemento: Tabla3Model[]) {
        if (elemento != null) {
            let totalm = elemento.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
            let totalh = elemento.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
            return (totalh * 1 + totalm * 1);
        }
        else {
            return 0;
        }
    }

    getMujeresDelTotal(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = (elemento.mujeres * 1) / (this.getTotalHombresMujeres(tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getHombresDelTotal(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = (elemento.hombres * 1) / (this.getTotalHombresMujeres(tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }




    /**
     * Funciones Tabla 5
     */

    getMujeresDeFila1(elemento: Tabla5Model, tabla: Tabla5Model[]) {
        let salida = (elemento.mujeres * 1) / ((elemento.mujeres * 1) + (elemento.hombres * 1));
        if (!isNaN(salida))
            return Math.round(salida * 100);
        else
            return 0;
    }
    getMujeresDeFila2(elemento: Tabla5Model, tabla: Tabla5Model[]) {
        let salida = (elemento.mujeres2 * 1) / ((elemento.mujeres2 * 1) + (elemento.hombres2 * 1));
        if (!isNaN(salida))
            return Math.round(salida * 100);
        else
            return 0;
    }
    getHombresDeFila1(elemento: Tabla5Model, tabla: Tabla5Model[]) {
        let salida = (elemento.hombres * 1) / ((elemento.mujeres * 1) + (elemento.hombres * 1));
        if (!isNaN(salida))
            return Math.round(salida * 100);
        else
            return 0;
    }
    getHombresDeFila2(elemento: Tabla5Model, tabla: Tabla5Model[]) {
        let salida = (elemento.hombres2 * 1) / ((elemento.mujeres2 * 1) + (elemento.hombres2 * 1));
        if (!isNaN(salida))
            return Math.round(salida * 100);
        else
            return 0;
    }
    getMujeresAbs1(elemento: Tabla5Model, tabla: Tabla5Model[]) {
        let salida = ((elemento.mujeres * 1) * this.getTotalHombresMujeres1(tabla)) / this.getTotalMujeres1(tabla);
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }
    getMujeresAbs2(elemento: Tabla5Model, tabla: Tabla5Model[]) {
        let salida = ((elemento.mujeres2 * 1) * this.getTotalHombresMujeres2(tabla)) / this.getTotalMujeres2(tabla);
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }
    getHombresAbs1(elemento: Tabla5Model, tabla: Tabla5Model[]) {
        let salida = ((elemento.hombres * 1) * this.getTotalHombresMujeres1(tabla)) / this.getTotalHombres1(tabla);
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }
    getHombresAbs2(elemento: Tabla5Model, tabla: Tabla5Model[]) {
        let salida = ((elemento.hombres2 * 1) * this.getTotalHombresMujeres2(tabla)) / this.getTotalHombres2(tabla);
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }
    getPorcMujeresAbs1(elemento: Tabla5Model, tabla: Tabla5Model[]) {
        let salida = this.getMujeresAbs1(elemento, tabla) / (this.getMujeresAbs1(elemento, tabla) + this.getHombresAbs1(elemento, tabla));
        if (!isNaN(salida))
            return Math.round(salida * 100);
        else
            return 0;
    }
    getPorcMujeresAbs2(elemento: Tabla5Model, tabla: Tabla5Model[]) {
        let salida = this.getMujeresAbs2(elemento, tabla) / (this.getMujeresAbs2(elemento, tabla) + this.getHombresAbs2(elemento, tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getPorcHombresAbs1(elemento: Tabla5Model, tabla: Tabla5Model[]) {
        let salida = this.getHombresAbs1(elemento, tabla) / (this.getMujeresAbs1(elemento, tabla) + this.getHombresAbs1(elemento, tabla));
        if (!isNaN(salida))
            return Math.round(salida * 100);
        else
            return 0;
    }
    getPorcHombresAbs2(elemento: Tabla5Model, tabla: Tabla5Model[]) {
        let salida = this.getHombresAbs2(elemento, tabla) / (this.getMujeresAbs2(elemento, tabla) + this.getHombresAbs2(elemento, tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getTotalHombresMujeres1(elemento: Tabla5Model[]) {
        if (elemento != null) {
            let totalm = elemento.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
            let totalh = elemento.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
            return (totalh * 1 + totalm * 1);
        }
        else {
            return 0;
        }
    }
    getTotalHombresMujeres2(elemento: Tabla5Model[]) {
        if (elemento != null) {
            let totalm = elemento.map(c => c.mujeres2).reduce((sum, current) => (sum * 1) + (current * 1));
            let totalh = elemento.map(c => c.hombres2).reduce((sum, current) => (sum * 1) + (current * 1));
            return (totalh * 1 + totalm * 1);
        }
        else {
            return 0;
        }
    }
    getTotalMujeres1(elemento: Tabla5Model[]) {
        if (elemento != null) {
            return elemento.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
        }
        else {
            return 0;
        }
    }
    getTotalMujeres2(elemento: Tabla5Model[]) {
        if (elemento != null) {
            return elemento.map(c => c.mujeres2).reduce((sum, current) => (sum * 1) + (current * 1));
        }
        else {
            return 0;
        }
    }
    getTotalHombres1(elemento: Tabla5Model[]) {
        if (elemento != null) {
            return elemento.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
        }
        else {
            return 0;
        }
    }
    getTotalHombres2(elemento: Tabla5Model[]) {
        if (elemento != null) {
            return elemento.map(c => c.hombres2).reduce((sum, current) => (sum * 1) + (current * 1));
        }
        else {
            return 0;
        }
    }
}