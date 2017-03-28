export class PRLLModel{

    public id: number;
    public user_id : number;
    public data: dataModel;
    public preg_1_tabla_3: Tabla3Model[];
    public preg_2_tabla_3: Tabla3Model[];
    public preg_3_tabla_3: Tabla3Model[];
    public preg_4_tabla_3: Tabla3Model[];

    constructor(){
        this.id=0,
        this.user_id = 0
    }
}

export class Tabla3Model{
        denominacion: any = '';
        mujeres: any = 0;
        hombres: any = 0;
}
export class dataModel{
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
    public preg_13: any; 
    public preg_14: any; 
    public preg_15: any; 
    public preg_16: any; 
    public preg_17: any; 
    public preg_18: any; 
    public preg_19: any; 
    constructor(){
        this.preg_5 = '',
        this.preg_6 = '',
        this.preg_7=''
    }
}