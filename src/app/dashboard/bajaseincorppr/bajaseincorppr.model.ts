export class BajasEIncorpPrModel {
        public status: string;        
        public totalCuest: number;
        public respondidasCuest: number;
        public totalSeccion: number;
        public respondidasSeccion: number;
        public data: dataModel;
        public preg_465_tabla_3: Tabla3Model[];
        public preg_466_tabla_5: Tabla5Model[];
        public preg_467_tabla_3: Tabla3Model[];
        public preg_468_tabla_3: Tabla3Model[];
        public preg_469_tabla_3: Tabla3Model[];
        public preg_470_tabla_3: Tabla3Model[];
        public preg_471_tabla_3: Tabla3Model[];
        public preg_472_tabla_3: Tabla3Model[];
        public preg_473_tabla_3: Tabla3Model[];

}
export class dataModel {
        public preg_461: any = '';
        public preg_463: any = '';
        public preg_464: any = '';
        constructor(){
                this.preg_461 = '';
                this.preg_463 = '';
                this.preg_464 = '';
        }
}

export class Tabla3Model {
        respuesta: any;
        texto: any = '';
        mujeres: any = 0;
        hombres: any = 0;
}

export class Tabla5Model{
        respuesta: any;
        texto: string = '';
        mujeres: any = '';
        hombres: any = '';        
        mujeres2: any = '';
        hombres2: any = '';
}
