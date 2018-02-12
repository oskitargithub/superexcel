export class Retribuciones2PrModel{
    public data: dataModel;    
    public preg_422_tabla_5: Tabla5Model[];
    public preg_423_tabla_5: Tabla5Model[];
    public preg_424_tabla_5: Tabla5Model[];
    public preg_425_tabla_5: Tabla5Model[];    
    public preg_426_tabla_5: Tabla5Model[];    
    public preg_427_tabla_5: Tabla5Model[];
    public preg_428_tabla_5: Tabla5Model[];
    public preg_429_tabla_5: Tabla5Model[];
    public preg_430_tabla_3: Tabla3Model[];

    public preg_699_tabla_5: Tabla5Model[];

    constructor() {
        this.data = new dataModel();
    }
}

export class dataModel{
    public preg_431:any;
    constructor(){
        this.preg_431 = ''
    }
}
export class Tabla3Model{
        respuesta: number = 0;
        texto: any = '';
        mujeres: any = 0;
        hombres: any = 0;
}

export class Tabla5Model{
        respuesta: number = 0;
        texto: string = '';
        mujeres: any = '';
        hombres: any = '';        
        mujeres2: any = '';
        hombres2: any = '';
}
