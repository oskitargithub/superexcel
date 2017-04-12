export class BajasEIncorpModel {
        public status: string;        
        public totalCuest: number;
        public respondidasCuest: number;
        public totalSeccion: number;
        public respondidasSeccion: number;
        public preg_120_tabla_3: Tabla3Model[];
        public preg_121_tabla_5: Tabla5Model[];
        public preg_122_tabla_3: Tabla3Model[];
        public preg_123_tabla_3: Tabla3Model[];
        public preg_124_tabla_3: Tabla3Model[];
        public preg_125_tabla_3: Tabla3Model[];


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
