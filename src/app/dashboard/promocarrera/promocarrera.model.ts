export class PromoCarreraModel{
    public status: string;    
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;    
    public data: dataModel;
    public preg_233_tabla_6: Tabla3Model[];
    public preg_234_tabla_6: Tabla3Model[];
    public preg_240_tabla_3: Tabla3Model[];
    public preg_241_tabla_3: Tabla3Model[];
    public preg_242_tabla_3: Tabla3Model[];
    public preg_243_tabla_3: Tabla3Model[];
    public preg_244_tabla_3: Tabla3Model[];
    public preg_245_tabla_3: Tabla3Model[];
}

export class Tabla3Model{
        texto: any = '';
        mujeres: any = 0;
        hombres: any = 0;
        respuesta: any = 0;  
}
export class Tabla2Model {
    texto1: any = '';
    texto2: any = '';
    respuesta: any = 0;    
}
export class Tabla6Model {
    texto1: any = '';
    texto2: any = '';
    texto3: any = '';
    texto4: any = '';
    texto5: any = '';
    respuesta: any = 0;    
}
export class dataModel{
    public preg_210: any;
    public preg_212: any;
    public preg_213: any; 
    public preg_214: any;
    public preg_215: any;
    public preg_216: any; 
    public preg_217: any;
    public preg_218: any;
    public preg_219: any; 
    public preg_220: any; 
    public preg_221: any; 
    public preg_222: any; 
    public preg_223: any; 
    public preg_224: any; 
    public preg_225: any; 
    public preg_226: any; 
    public preg_227: any; 
    public preg_228: any; 
    public preg_229: any; 
    public preg_230: any; 
    public preg_231: any; 
    public preg_235: any;
    public preg_236: any;
    public preg_237: any;
    public preg_238: any;
    public preg_239: any;
    constructor(){
        this.preg_210 = '',
        this.preg_212 = '',
        this.preg_213 = '',
        this.preg_214 = '',
        this.preg_215 = '',
        this.preg_216 = '',
        this.preg_217 = '',
        this.preg_218 = '',
        this.preg_219 = '',
        this.preg_220 = '',
        this.preg_221 = '',
        this.preg_222 = '',
        this.preg_223 = '',
        this.preg_224 = '',
        this.preg_225 = '',
        this.preg_226 = '',
        this.preg_227 = '',
        this.preg_228 = '',
        this.preg_229 = '',
        this.preg_230 = '',
        this.preg_231 = '',
        this.preg_235 = '',
        this.preg_236 = '',
        this.preg_237 = '',
        this.preg_238 = '',
        this.preg_239 = ''
    }
}