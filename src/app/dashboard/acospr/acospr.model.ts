export class AcosPRModel{
public status: string;    
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;    
    public data: dataModel;
    public preg_346_tabla_3: Tabla3Model[];
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
    public preg_291: any;
    public preg_292: any;
    public preg_293: any; 
    public preg_294: any;
    public preg_295: any;
    public preg_296: any; 
    public preg_297: any;
    public preg_298: any;
    public preg_299: any; 
    public preg_300: any; 
    public preg_301: any; 
    public preg_302: any; 
    public preg_303: any; 
    public preg_306: any; 
    public preg_308: any; 
    public preg_309: any; 
    public preg_310: any; 
    public preg_311: any; 
    public preg_316: any; 
    public preg_317: any; 
    public preg_318: any; 
    public preg_319: any; 
    public preg_320: any; 
    public preg_321: any; 
    public preg_322: any; 
    public preg_323: any;
    public preg_324: any;
    public preg_325: any;
    public preg_326: any;
    public preg_331: any; 
    public preg_332: any; 
    public preg_333: any; 
    public preg_334: any;     
    public preg_336: any; 
    public preg_337: any; 
    public preg_341: any; 
    public preg_342: any; 
   public preg_343: any; 
   public preg_344: any; 

    constructor(){
        this.user_id = 0,
        this.preg_291 = '',
    this.preg_292 = '',
    this.preg_293 = '', 
    this.preg_294 = '',
    this.preg_295 = '',
    this.preg_296 = '', 
    this.preg_297 = '',
    this.preg_298 = '',
    this.preg_299 = '', 
    this.preg_300 = '', 
    this.preg_301 = '', 
    this.preg_302 = '', 
    this.preg_303 = '', 
    this.preg_306 = '', 
    this.preg_308 = '', 
    this.preg_309 = '', 
    this.preg_310 = '', 
    this.preg_311 = '', 
    this.preg_316 = '', 
    this.preg_317 = '', 
    this.preg_318 = '', 
    this.preg_319 = '', 
    this.preg_320 = '', 
    this.preg_321 = '', 
    this.preg_322 = '', 
    this.preg_323 = '',
    this.preg_324 = '',
    this.preg_325 = '',
    this.preg_326 = '',
    this.preg_331 = '', 
    this.preg_332 = '', 
    this.preg_333 = '', 
    this.preg_334 = '',     
    this.preg_336 = '', 
    this.preg_337 = '', 
    this.preg_341 = '', 
    this.preg_342 = '', 
   this.preg_343 = '', 
   this.preg_344 = ''
    }
}