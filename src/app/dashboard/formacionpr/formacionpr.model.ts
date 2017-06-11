export class FormacionPrModel {
    public status: string;
    public data: datosModel;
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;
    public preg_523_tabla_3 : Tabla3Model[];
    public preg_543_tabla_3 : Tabla3Model[];
    public preg_545_tabla_3 : Tabla3Model[];
    public preg_546_tabla_3 : Tabla3Model[];    
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
    public preg_510: any;
    public preg_512: any;
    public preg_513: any; 
    public preg_514: any;
    public preg_515: any;
    public preg_516: any; 
    public preg_517: any;
    public preg_518: any;       
    public preg_519: any; 
    public preg_520: any; 
    public preg_522: any; 
    public preg_524: any;
    public preg_525: any; 
    public preg_527: any; 
    public preg_528: any; 
    public preg_529: any; 
    public preg_530: any;
    public preg_532: any;
    public preg_533: any;
    public preg_534: any;
    public preg_535: any;
    public preg_536: any; 
    public preg_537: any; 
    public preg_538: any; 
    public preg_539: any; 
    public preg_540: any; 

    public preg_541: any; 
    public preg_542: any; 
    constructor() {
        this.preg_510 = '',
        this.preg_512 = '',
        this.preg_513 = '',
        this.preg_514 = '',
        this.preg_515 = '',
        this.preg_516 = '',
        this.preg_517 = '',        
        this.preg_518 = '',        
        this.preg_517 = '',
        this.preg_519 = '',
        this.preg_520 = '',        
        this.preg_522 = '',
        this.preg_524 = '',
        this.preg_525 = '',
        this.preg_527 = '',
        this.preg_528 = '',
        this.preg_529 = '',
        this.preg_530 = '',
        this.preg_532 = '',
        this.preg_533 = '',
        this.preg_534 = '',
        this.preg_535 = '',
        this.preg_536 = '',
        this.preg_537 = '',
        this.preg_538 = '',
        this.preg_539 = '',
        this.preg_540 = '',
        this.preg_541 = '',
        this.preg_542 = ''
    }
}