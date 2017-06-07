export class ClasProfesional1PrModel{
    public data: dataModel;
    public preg_383_tabla_3: Tabla3Model[];
    public preg_390_tabla_3: Tabla3Model[];
    public preg_391_tabla_3: Tabla3Model[];
    public preg_392_tabla_3: Tabla3Model[];
    public preg_393_tabla_3: Tabla3Model[];
    public preg_394_tabla_3: Tabla3Model[];
    public preg_395_tabla_3: Tabla3Model[];
    public preg_396_tabla_3: Tabla3Model[];
    public preg_397_tabla_3: Tabla3Model[];
    
}

export class Tabla3Model{
        texto: any = '';
        respuesta: any;
        mujeres: any = 0;
        hombres: any = 0;
}
export class dataModel{
    public preg_381: any;
    public preg_382: any;
    public preg_398: any;
    public preg_400: any;
    public preg_401: any;
    constructor(){
        this.preg_381 = '',
        this.preg_382 = '',
        this.preg_398='',
        this.preg_400='',
        this.preg_401=''
    }
}