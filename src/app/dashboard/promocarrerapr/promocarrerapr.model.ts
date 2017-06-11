export class PromoCarreraPrModel{
    public status: string;    
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;    
    public data: dataModel;
    public preg_573_tabla_6: Tabla3Model[];
    public preg_574_tabla_6: Tabla3Model[];
    public preg_575_tabla_3: Tabla3Model[];
    public preg_576_tabla_3: Tabla3Model[];
    public preg_577_tabla_3: Tabla3Model[];
    public preg_585_tabla_3: Tabla3Model[];
    public preg_586_tabla_3: Tabla3Model[];
    public preg_587_tabla_3: Tabla3Model[];
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
    public preg_550: any;
    public preg_552: any;
    public preg_553: any; 
    public preg_554: any;
    public preg_555: any;
    public preg_556: any; 
    public preg_557: any;
    public preg_558: any;
    public preg_559: any; 
    public preg_560: any; 
    public preg_561: any; 
    public preg_562: any; 
    public preg_563: any; 
    public preg_564: any; 
    public preg_565: any; 
    public preg_566: any; 
    public preg_567: any; 
    public preg_568: any; 
    public preg_569: any; 
    public preg_570: any; 
    public preg_571: any; 
    public preg_580: any;
    public preg_581: any;
    public preg_582: any;
    public preg_583: any;
    public preg_584: any;
    constructor(){
        this.preg_550 = '',
        this.preg_552 = '',
        this.preg_553 = '',
        this.preg_554 = '',
        this.preg_555 = '',
        this.preg_556 = '',
        this.preg_557 = '',
        this.preg_558 = '',
        this.preg_559 = '',
        this.preg_560 = '',
        this.preg_561 = '',
        this.preg_562 = '',
        this.preg_563 = '',
        this.preg_564 = '',
        this.preg_565 = '',
        this.preg_566 = '',
        this.preg_567 = '',
        this.preg_568 = '',
        this.preg_569 = '',
        this.preg_570 = '',
        this.preg_571 = '',
        this.preg_580 = '',
        this.preg_581 = '',
        this.preg_582 = '',
        this.preg_583 = '',
        this.preg_584 = ''
    }
}