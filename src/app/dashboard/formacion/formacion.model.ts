export class FormacionModel {
    public status: string;
    public data: datosModel;
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;
    public preg_174_tabla_3 : Tabla3Model;
    public preg_195_tabla_3 : Tabla3Model;
    public preg_199_tabla_3 : Tabla3Model;
    public preg_200_tabla_3 : Tabla3Model;

    public preg_169: any;
    public preg_171: any;
    public preg_179: any;
    public preg_184: any;
    public preg_185: any;
    public preg_186: any;
    public preg_187: any;
    public preg_188: any;
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

export class Tabla2Model{
        texto: any = '';
        respuesta: any;
        valor1: any = '';
}

export class datosModel {
    public user_id: number;    
    public preg_160: any;
    public preg_162: any;
    public preg_163: any; 
    public preg_164: any;
    public preg_165: any;
    public preg_166: any; 
    public preg_167: any;
    public preg_168: any;    
    public preg_170: any; 
    public preg_173: any; 
    public preg_177: any; 
    public preg_180: any; 
    public preg_181: any; 
    public preg_182: any; 
    public preg_190: any; 
    public preg_191: any; 
    public preg_192: any; 
    public preg_193: any; 
    public preg_194: any; 
    constructor() {
        this.user_id = 0,
        this.preg_160 = '',
        this.preg_162 = '',
        this.preg_163 = '',
        this.preg_164 = '',
        this.preg_165 = '',
        this.preg_166 = '',
        this.preg_167 = '',
        this.preg_168 = '',
        this.preg_170 = '',
        this.preg_173 = '',
        this.preg_177 = '',
        this.preg_180 = '',
        this.preg_181 = '',
        this.preg_182 = '',
        this.preg_190 = '',
        this.preg_191 = '',
        this.preg_192 = '',
        this.preg_193 = '',
        this.preg_194 = ''
    }
}