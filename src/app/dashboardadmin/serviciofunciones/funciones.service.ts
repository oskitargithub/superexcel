import { Injectable } from '@angular/core';
import { Tabla3Model } from './funciones.model';

@Injectable()
export class FuncionesService {
    constructor() {
        /** Vacío */
    }


    getTotalHombresMujeres(elemento: Tabla3Model[]) {
        let totalm = elemento.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
        let totalh = elemento.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
        return (totalh * 1 + totalm * 1);
    }


    getTotalMujeres(elemento: Tabla3Model[]) {
        return elemento.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
    }


    getTotalHombres(elemento: Tabla3Model[]) {
        return elemento.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
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

    getMujeresDeFila(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = (elemento.mujeres * 1) / ((elemento.mujeres * 1) + (elemento.hombres * 1));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }






    getHombresDeFila(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = (elemento.hombres * 1) / ((elemento.mujeres * 1) + (elemento.hombres * 1));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }


    getSumaFila(elemento: Tabla3Model) {
        let salida = (elemento.hombres * 1) + (elemento.mujeres * 1);
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }

    getSumaMujeresDelTotal(tabla: Tabla3Model[]) {
        /**suma de elementos de getMujeresDelTotal */
        let salida = 0;
        tabla.forEach(elemento => {
            salida = salida + this.getMujeresDelTotal(elemento, tabla);
        });
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }

    getSumaHombresDelTotal(tabla: Tabla3Model[]) {
        /**suma de elementos de getMujeresDelTotal */
        let salida = 0;
        tabla.forEach(elemento => {
            salida = salida + this.getHombresDelTotal(elemento, tabla);
        });
        if (!isNaN(salida))
            return salida;
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

    getTotalAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let item1 = ((elemento.mujeres * 1) * this.getTotalHombresMujeres(tabla)) / this.getTotalMujeres(tabla);
        let item2 = ((elemento.hombres * 1) * this.getTotalHombresMujeres(tabla)) / this.getTotalHombres(tabla);
        let salida = item1 + item2;
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }


    getPorcMujeresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = this.getMujeresAbs(elemento, tabla) / (this.getMujeresAbs(elemento, tabla) + this.getHombresAbs(elemento, tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getPorcHombresAbs(elemento: Tabla3Model, tabla: Tabla3Model[]) {
        let salida = this.getHombresAbs(elemento, tabla) / (this.getMujeresAbs(elemento, tabla) + this.getHombresAbs(elemento, tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }


    asignaPorcentajeDonutHMPlantilla(elemento: Tabla3Model[], grafica1: any, grafica2: any, label1: any, label2: any) {
        elemento.forEach(element => {
            let porcentajem = Math.round(this.getMujeresDeFila(element, elemento) * 100);
            let porcentajeh = Math.round(this.getHombresDeFila(element, elemento) * 100);
            grafica1.push(porcentajem);
            grafica2.push(porcentajeh);
            label1.push('% ' + element.denominacion);
            label2.push('% ' + element.denominacion);
        });
    }

    asignaPorcentajes(elemento: Tabla3Model[], grafica1: any, grafica2: any, label1: any, label2: any) {
        let datam = [];
        let datah = [];
        let data2m = [];
        let data2h = [];
        elemento.forEach(element => {
            let porcentajem = Math.round((element.mujeres * 1) / this.getTotalHombresMujeres(elemento) * 100);
            let porcentajeh = Math.round((element.hombres * 1) / this.getTotalHombresMujeres(elemento) * 100);

            let mujabs = ((element.mujeres * 1) * this.getTotalHombresMujeres(elemento)) / this.getTotalMujeres(elemento);
            let homabs = ((element.hombres * 1) * this.getTotalHombresMujeres(elemento)) / this.getTotalHombres(elemento);
            let porcentaje2m = Math.round(mujabs / (mujabs + homabs) * 100);
            let porcentaje2h = Math.round(homabs / (mujabs + homabs) * 100);

            datam.push(porcentajem);
            datah.push(porcentajeh);
            data2m.push(porcentaje2m);
            data2h.push(porcentaje2h);
            label1.push(element.denominacion);
            if (label2 != null)
                label2.push(element.denominacion);
        });
        grafica1.push({ data: datam, label: "Mujeres %" });
        grafica1.push({ data: datah, label: "Hombres %" });
        if (grafica2 != null) {
            grafica2.push({ data: data2m, label: "Mujeres %" });
            grafica2.push({ data: data2h, label: "Hombres %" });
        }
    }

    asignaPorcentajesPorTipo(tabla: Tabla3Model[], grafica1: any, label1: any, grafica2: any, label2: any) {
        let datam = [];
        let datah = [];
        let data2m = [];
        let data2h = [];
        tabla.forEach(elemento => {
            let mujeres = this.getMujeresDeFila(elemento, tabla);
            let hombres = this.getHombresDeFila(elemento, tabla);
            let mujeres2 = this.getPorcMujeresAbs(elemento, tabla);
            let hombres2 = this.getPorcHombresAbs(elemento, tabla);
            datam.push(Math.round(mujeres * 100));
            datah.push(Math.round(hombres * 100));
            data2m.push(Math.round(mujeres2 * 100));
            data2h.push(Math.round(hombres2 * 100));
            label1.push(elemento.denominacion);
            label2.push(elemento.denominacion);
        });
        grafica1.push({ data: datam, label: "Mujeres %" });
        grafica1.push({ data: datah, label: "Hombres %" });
        grafica2.push({ data: data2m, label: "Mujeres %" });
        grafica2.push({ data: data2h, label: "Hombres %" });
    }

    asignaPorcentajesGrafLineal(tabla: Tabla3Model[], grafica1: any, label1: any, grafica2: any, label2: any) {
        let datam = [];
        let datah = [];
        tabla.forEach(elemento => {
            let mujeres = this.getMujeresDeFila(elemento, tabla);
            let hombres = this.getHombresDeFila(elemento, tabla);
            datam.push(Math.round(mujeres * 100));
            datah.push(Math.round(hombres * 100));
            label1.push(elemento.denominacion);
            label2.push(elemento.denominacion);
        });
        grafica1.push({ data: datam, label: "%" }, { data: [], label: '' });
        grafica2.push({ data: [], label: '' }, { data: datah, label: "%" });
    }

}