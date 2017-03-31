export class FormacionModel {
    public status: string;
    public data: datosModel;
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;
   constructor(){
        this.data = new datosModel();
    }
}

export class Tabla3Model{
        texto: any = '';
        respuesta: any;
        mujeres: any = 0;
        hombres: any = 0;
}

export class datosModel {
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
    constructor() {
        this.user_id = 0,
        this.preg_1 = '',
        this.preg_2 = ''
    }
}