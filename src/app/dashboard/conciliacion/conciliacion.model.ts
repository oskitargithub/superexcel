export class ConciliacionModel {
    public status: string;
    public data: datosModel;
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;
    public preg_1_tabla_3: Tabla3Model[];
    public preg_2_tabla_3: Tabla3Model[];
    public preg_3_tabla_3: Tabla3Model[];
    public preg_4_tabla_3: Tabla3Model[];
    public preg_5_tabla_3: Tabla3Model[];
    public preg_6_tabla_3: Tabla3Model[];
    public preg_7_tabla_3: Tabla3Model[];
    public preg_8_tabla_3: Tabla3Model[];
    public preg_0_tabla_2: Tabla2Model[];
    constructor(){
        this.data = new datosModel();
    }

}

export class datosModel {
    public user_id: number;
    public id: number;
    public preg_1: any;
    public preg_2: any;
    public preg_3: any;
    public preg_4: any;
    public preg_5: any;
    public preg_6: any;
    public preg_7: any;
    public preg_8: any;
    public preg_9: any;
    public preg_10: any;
    public preg_11: any;
    public preg_12: any;
    constructor() {
        this.id = 0,
        this.user_id = 0,
        this.preg_1 = '',
        this.preg_2 = '',
        this.preg_3 = '',
        this.preg_4 = '',
        this.preg_5 = '',
        this.preg_6 = '',
        this.preg_7 = '',
        this.preg_8 = '',
         this.preg_9 = '',
        this.preg_10 = '',
        this.preg_11 = '',
        this.preg_12 = ''
    }
} 

export class Tabla3Model {
    denominacion: any = '';
    mujeres: any = 0;
    hombres: any = 0;
}

export class Tabla2Model {
    denominacion: any = '';
    valor: any = 0;    
}

export class TablaRaraModel{
    denominacion: any = '';
    valor: any = 0;   
    otro: any = null;
}