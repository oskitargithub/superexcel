export class ConciliacionPrModel {
    public status: string;
    public data: datosModel;
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;
    public preg_490_tabla_3: Tabla3Model[];
    public preg_492_tabla_3: Tabla3Model[];
    public preg_493_tabla_3: Tabla3Model[];
    public preg_496_tabla_3: Tabla3Model[];
    public preg_497_tabla_3: Tabla3Model[];
    public preg_498_tabla_3: Tabla3Model[];
    public preg_500_tabla_3: Tabla3Model[];
    public preg_501_tabla_3: Tabla3Model[];
    public preg_480_tabla_2: Tabla2Model[];
    constructor(){
        this.data = new datosModel();
    }

}

export class datosModel {
    public preg_481: any;
    public preg_482: any;
    public preg_483: any;
    public preg_484: any;
    public preg_485: any;
    public preg_486: any;
    public preg_488: any;
    public preg_489: any;
    public preg_503: any;
    public preg_504: any;
    public preg_506: any;
    public preg_507: any;
    constructor() {
        this.preg_481 = '',
        this.preg_482 = '',
        this.preg_483 = '',
        this.preg_484 = '',
        this.preg_485 = '',
        this.preg_486 = '',
        this.preg_488 = '',
        this.preg_489 = '',
        this.preg_503 = '',
        this.preg_504 = '',
        this.preg_506 = '',
        this.preg_507 = ''
    }
} 

export class Tabla3Model {
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
