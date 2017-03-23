import { Injectable } from '@angular/core';
import { Tabla6Model } from './funciones.model';

@Injectable()
export class FuncionesT6Service {
    
    constructor() {
        /** Vacío */
    }
    getSumaFila1(elemento: Tabla6Model) {
        let salida = (elemento.hombres1 * 1) + (elemento.mujeres1 * 1);
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getSumaFila2(elemento: Tabla6Model) {
        let salida = (elemento.hombres2 * 1) + (elemento.mujeres2 * 1);
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    
    getTotalHombresMujeres1(elemento: Tabla6Model[]) {
        let totalm = elemento.map(c => c.mujeres1).reduce((sum, current) => (sum * 1) + (current * 1));
        let totalh = elemento.map(c => c.hombres1).reduce((sum, current) => (sum * 1) + (current * 1));
        return (totalh * 1 + totalm * 1);
    }
    getTotalHombresMujeres2(elemento: Tabla6Model[]) {
        let totalm = elemento.map(c => c.mujeres2).reduce((sum, current) => (sum * 1) + (current * 1));
        let totalh = elemento.map(c => c.hombres2).reduce((sum, current) => (sum * 1) + (current * 1));
        return (totalh * 1 + totalm * 1);
    }
    getTotalMujeres1(elemento: Tabla6Model[]) {
        return elemento.map(c => c.mujeres1).reduce((sum, current) => (sum * 1) + (current * 1));
    }
    getTotalMujeres2(elemento: Tabla6Model[]) {
        return elemento.map(c => c.mujeres2).reduce((sum, current) => (sum * 1) + (current * 1));
    }
    getTotalHombres1(elemento: Tabla6Model[]) {
        return elemento.map(c => c.hombres1).reduce((sum, current) => (sum * 1) + (current * 1));
    }
    getTotalHombres2(elemento: Tabla6Model[]) {
        return elemento.map(c => c.hombres2).reduce((sum, current) => (sum * 1) + (current * 1));
    }
    getMujeresDelTotal1(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = (elemento.mujeres1 * 1) / (this.getTotalHombresMujeres1(tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getMujeresDelTotal2(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = (elemento.mujeres2 * 1) / (this.getTotalHombresMujeres2(tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getHombresDelTotal1(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = (elemento.hombres1 * 1) / (this.getTotalHombresMujeres1(tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getHombresDelTotal2(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = (elemento.hombres2 * 1) / (this.getTotalHombresMujeres2(tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getMujeresDeFila1(elemento: Tabla6Model, tabla: Tabla6Model[]){
        let salida = (elemento.mujeres1 * 1) / ((elemento.mujeres1 * 1) + (elemento.hombres1 * 1));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getMujeresDeFila2(elemento: Tabla6Model, tabla: Tabla6Model[]){
        let salida = (elemento.mujeres2 * 1) / ((elemento.mujeres2 * 1) + (elemento.hombres2 * 1));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getHombresDeFila1(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = (elemento.hombres1 * 1) / ((elemento.mujeres1 * 1) + (elemento.hombres1 * 1));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getHombresDeFila2(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = (elemento.hombres2 * 1) / ((elemento.mujeres2 * 1) + (elemento.hombres2 * 1));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getMujeresAbs1(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = ((elemento.mujeres1 * 1) * this.getTotalHombresMujeres1(tabla)) / this.getTotalMujeres1(tabla);
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }
    getMujeresAbs2(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = ((elemento.mujeres2 * 1) * this.getTotalHombresMujeres2(tabla)) / this.getTotalMujeres2(tabla);
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }
    getHombresAbs1(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = ((elemento.hombres1 * 1) * this.getTotalHombresMujeres1(tabla)) / this.getTotalHombres1(tabla);
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }
    getHombresAbs2(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = ((elemento.hombres2 * 1) * this.getTotalHombresMujeres2(tabla)) / this.getTotalHombres2(tabla);
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }
    getPorcMujeresAbs1(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = this.getMujeresAbs1(elemento, tabla) / (this.getMujeresAbs1(elemento, tabla) + this.getHombresAbs1(elemento, tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getPorcMujeresAbs2(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = this.getMujeresAbs2(elemento, tabla) / (this.getMujeresAbs2(elemento, tabla) + this.getHombresAbs2(elemento, tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getPorcHombresAbs1(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = this.getHombresAbs1(elemento, tabla) / (this.getMujeresAbs1(elemento, tabla) + this.getHombresAbs1(elemento, tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getPorcHombresAbs2(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let salida = this.getHombresAbs2(elemento, tabla) / (this.getMujeresAbs2(elemento, tabla) + this.getHombresAbs2(elemento, tabla));
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getTotalAbs1(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let item1 = ((elemento.mujeres1 * 1) * this.getTotalHombresMujeres1(tabla)) / this.getTotalMujeres1(tabla);
        let item2 = ((elemento.hombres1 * 1) * this.getTotalHombresMujeres1(tabla)) / this.getTotalHombres1(tabla);
        let salida = item1 + item2;
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }
    getTotalAbs2(elemento: Tabla6Model, tabla: Tabla6Model[]) {
        let item1 = ((elemento.mujeres2 * 1) * this.getTotalHombresMujeres2(tabla)) / this.getTotalMujeres2(tabla);
        let item2 = ((elemento.hombres2 * 1) * this.getTotalHombresMujeres2(tabla)) / this.getTotalHombres2(tabla);
        let salida = item1 + item2;
        if (!isNaN(salida))
            return Math.round(salida);
        else
            return 0;
    }

    getSumaMujeresDelTotal1(tabla: Tabla6Model[]) {
        /**suma de elementos de getMujeresDelTotal */
        let salida = 0;
        tabla.forEach(elemento => {
            salida = salida + this.getMujeresDelTotal1(elemento, tabla);
        });
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getSumaMujeresDelTotal2(tabla: Tabla6Model[]) {
        /**suma de elementos de getMujeresDelTotal */
        let salida = 0;
        tabla.forEach(elemento => {
            salida = salida + this.getMujeresDelTotal2(elemento, tabla);
        });
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }

    getSumaHombresDelTotal1(tabla: Tabla6Model[]) {
        /**suma de elementos de getMujeresDelTotal */
        let salida = 0;
        tabla.forEach(elemento => {
            salida = salida + this.getHombresDelTotal1(elemento, tabla);
        });
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }
    getSumaHombresDelTotal2(tabla: Tabla6Model[]) {
        /**suma de elementos de getMujeresDelTotal */
        let salida = 0;
        tabla.forEach(elemento => {
            salida = salida + this.getHombresDelTotal2(elemento, tabla);
        });
        if (!isNaN(salida))
            return salida;
        else
            return 0;
    }


    asignaPorcentajes1(elemento: Tabla6Model[], grafica1: any, grafica2: any, label1: any, label2: any) {
    let datam = [];
    let datah = [];
    let data2m = [];
    let data2h = [];
    elemento.forEach(element => {
      let porcentajem = Math.round((element.mujeres1 * 1) / this.getTotalHombresMujeres1(elemento) * 100);
      let porcentajeh = Math.round((element.hombres1 * 1) / this.getTotalHombresMujeres1(elemento) * 100);

      let mujabs = ((element.mujeres1 * 1) * this.getTotalHombresMujeres1(elemento)) / this.getTotalMujeres1(elemento);
      let homabs = ((element.hombres1 * 1) * this.getTotalHombresMujeres1(elemento)) / this.getTotalHombres1(elemento);
      let porcentaje2m = Math.round(mujabs / (mujabs + homabs) * 100);
      let porcentaje2h = Math.round(homabs / (mujabs + homabs) * 100);

      datam.push(porcentajem);
      datah.push(porcentajeh);
      data2m.push(porcentaje2m);
      data2h.push(porcentaje2h);
      label1.push(element.denominacion1);
      if (label2 != null)
        label2.push(element.denominacion1);
    });
    grafica1.push({ data: datam, label: "Mujeres %" });
    grafica1.push({ data: datah, label: "Hombres %" });
    if (grafica2 != null) {
      grafica2.push({ data: data2m, label: "Mujeres %" });
      grafica2.push({ data: data2h, label: "Hombres %" });
    }
  }

  asignaPorcentajes2(elemento: Tabla6Model[], grafica1: any, grafica2: any, label1: any, label2: any) {
    let datam = [];
    let datah = [];
    let data2m = [];
    let data2h = [];
    elemento.forEach(element => {
      let porcentajem = Math.round((element.mujeres2 * 1) / this.getTotalHombresMujeres2(elemento) * 100);
      let porcentajeh = Math.round((element.hombres2 * 1) / this.getTotalHombresMujeres2(elemento) * 100);

      let mujabs = ((element.mujeres2 * 1) * this.getTotalHombresMujeres2(elemento)) / this.getTotalMujeres2(elemento);
      let homabs = ((element.hombres2 * 1) * this.getTotalHombresMujeres2(elemento)) / this.getTotalHombres2(elemento);
      let porcentaje2m = Math.round(mujabs / (mujabs + homabs) * 100);
      let porcentaje2h = Math.round(homabs / (mujabs + homabs) * 100);

      datam.push(porcentajem);
      datah.push(porcentajeh);
      data2m.push(porcentaje2m);
      data2h.push(porcentaje2h);
      label1.push(element.denominacion2);
      if (label2 != null)
        label2.push(element.denominacion2);
    });
    grafica1.push({ data: datam, label: "Mujeres %" });
    grafica1.push({ data: datah, label: "Hombres %" });
    if (grafica2 != null) {
      grafica2.push({ data: data2m, label: "Mujeres %" });
      grafica2.push({ data: data2h, label: "Hombres %" });
    }
  }

  asignaPorcentajeDonutHMPlantilla1(elemento: Tabla6Model[], grafica1: any, grafica2: any, label1: any, label2: any) {
        elemento.forEach(element => {
            let porcentajem = Math.round(this.getMujeresDeFila1(element, elemento) * 100);
            let porcentajeh = Math.round(this.getHombresDeFila1(element, elemento) * 100);
            grafica1.push(porcentajem);
            grafica2.push(porcentajeh);
            label1.push('% ' + element.denominacion1);
            label2.push('% ' + element.denominacion1);
        });
    }
    asignaPorcentajeDonutHMPlantilla2(elemento: Tabla6Model[], grafica1: any, grafica2: any, label1: any, label2: any) {
        elemento.forEach(element => {
            let porcentajem = Math.round(this.getMujeresDeFila2(element, elemento) * 100);
            let porcentajeh = Math.round(this.getHombresDeFila2(element, elemento) * 100);
            grafica1.push(porcentajem);
            grafica2.push(porcentajeh);
            label1.push('% ' + element.denominacion2);
            label2.push('% ' + element.denominacion2);
        });
    }
    asignaPorcentajesPorTipo1(tabla: Tabla6Model[], grafica1: any, label1: any, grafica2: any, label2: any) {
        let datam = [];
        let datah = [];
        let data2m = [];
        let data2h = [];
        tabla.forEach(elemento => {
            let mujeres = this.getMujeresDeFila1(elemento, tabla);
            let hombres = this.getHombresDeFila1(elemento, tabla);
            let mujeres2 = this.getPorcMujeresAbs1(elemento, tabla);
            let hombres2 = this.getPorcHombresAbs1(elemento, tabla);
            datam.push(Math.round(mujeres * 100));
            datah.push(Math.round(hombres * 100));
            data2m.push(Math.round(mujeres2 * 100));
            data2h.push(Math.round(hombres2 * 100));
            label1.push(elemento.denominacion1);
            label2.push(elemento.denominacion1);
        });
        grafica1.push({ data: datam, label: "Mujeres %" });
        grafica1.push({ data: datah, label: "Hombres %" });
        grafica2.push({ data: data2m, label: "Mujeres %" });
        grafica2.push({ data: data2h, label: "Hombres %" });
    }
    asignaPorcentajesPorTipo2(tabla: Tabla6Model[], grafica1: any, label1: any, grafica2: any, label2: any) {
        let datam = [];
        let datah = [];
        let data2m = [];
        let data2h = [];
        tabla.forEach(elemento => {
            let mujeres = this.getMujeresDeFila2(elemento, tabla);
            let hombres = this.getHombresDeFila2(elemento, tabla);
            let mujeres2 = this.getPorcMujeresAbs2(elemento, tabla);
            let hombres2 = this.getPorcHombresAbs2(elemento, tabla);
            datam.push(Math.round(mujeres * 100));
            datah.push(Math.round(hombres * 100));
            data2m.push(Math.round(mujeres2 * 100));
            data2h.push(Math.round(hombres2 * 100));
            label1.push(elemento.denominacion2);
            label2.push(elemento.denominacion2);
        });
        grafica1.push({ data: datam, label: "Mujeres %" });
        grafica1.push({ data: datah, label: "Hombres %" });
        grafica2.push({ data: data2m, label: "Mujeres %" });
        grafica2.push({ data: data2h, label: "Hombres %" });
    }
}