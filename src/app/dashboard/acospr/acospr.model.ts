export class AcosPRModel{
public status: string;    
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;    
    public data: dataModel;
    public preg_1_tabla_3: Tabla3Model[];
    constructor(){
        this.data = new dataModel();
    }   
}

export class Tabla3Model{
        respuesta: number = 0;
        texto: any = '';
        mujeres: any = 0;
        hombres: any = 0;
}

export class dataModel{
    public user_id: number;
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
    public preg_20: any; 
    public preg_21: any; 
    public preg_22: any; 
    public preg_23: any;
    public preg_24: any;
    public preg_25: any;
    public preg_26: any;
    public preg_27: any;
    public preg_28: any;
    public preg_29: any;
    public preg_30: any; 
    public preg_31: any; 
    public preg_32: any; 
    public preg_33: any; 
    public preg_34: any; 
    public preg_35: any; 
    public preg_36: any; 
    public preg_37: any; 
    public preg_38: any; 
    public preg_39: any; 
   

    constructor(){
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
        this.preg_12 = '',
        this.preg_13 = '',
        this.preg_14 = '',
        this.preg_15 = '',
        this.preg_16 = '',
        this.preg_17 = '',
        this.preg_18 = '',
        this.preg_19 = '',
        this.preg_20 = '',
        this.preg_21 = '',
        this.preg_22 = '',
        this.preg_23 = '',
        this.preg_24 = '',
        this.preg_25 = '',
        this.preg_26 = '',
        this.preg_27 = '',
        this.preg_28 = '',
        this.preg_29 = '',
        this.preg_30 = '',
        this.preg_31 = '',
        this.preg_32 = '',
        this.preg_33 = '',
        this.preg_34 = '',
        this.preg_35 = '',
        this.preg_36 = '',
        this.preg_37 = '',
        this.preg_38 = '',
        this.preg_39 = ''
    }
}