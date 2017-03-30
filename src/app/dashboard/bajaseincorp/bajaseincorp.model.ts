export class BajasEIncorpModel {
        public status: string;
        public data: datosModel;
        public totalCuest: number;
        public respondidasCuest: number;
        public totalSeccion: number;
        public respondidasSeccion: number;
        public preg_1_tabla_3: Tabla3Model[];
        public preg_2_tabla_5: Tabla5Model[];
        public preg_3_tabla_3: Tabla3Model[];
        public preg_4_tabla_3: Tabla3Model[];
        public preg_5_tabla_4: Tabla4Model[];
        public preg_6_tabla_3: Tabla3Model[];


}

export class datosModel {
        public user_id: number;
        public id: number;
        constructor() {
                this.id = 0,
                this.user_id = 0
        }
}

export class Tabla3Model {
        texto: any = '';
        mujeres: any = 0;
        hombres: any = 0;
}

export class Tabla4Model {
        denominacion1: any = '';
        denominacion2: any = '';
        mujeres: any = 0;
        hombres: any = 0;
}
export class Tabla5Model{
        texto: string = '';
        mujeres: any = '';
        hombres: any = '';        
        mujeres2: any = '';
        hombres2: any = '';
}
