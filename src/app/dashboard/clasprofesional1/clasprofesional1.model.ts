export class ClasProfesional1Model{

    public id: number;
    public user_id : number;
    public data: dataModel;
    public preg_48_tabla_3: Tabla3Model[];
    public preg_49_tabla_3: Tabla3Model[];
    public preg_54_tabla_3: Tabla3Model[];
    public preg_55_tabla_3: Tabla3Model[];
    public preg_56_tabla_3: Tabla3Model[];
    public preg_57_tabla_3: Tabla3Model[];
    public preg_59_tabla_3: Tabla3Model[];
    public preg_60_tabla_3: Tabla3Model[];
    public preg_61_tabla_3: Tabla3Model[];
    public preg_62_tabla_3: Tabla3Model[];
    public preg_63_tabla_3: Tabla3Model[];
    constructor(){
        this.id=0,
        this.user_id = 0
    }
}

export class Tabla3Model{
        texto: any = '';
        respuesta: number = 0;
        mujeres: any = 0;
        hombres: any = 0;
}
export class dataModel{
    public preg_46: any;
    public preg_47: any;
    public preg_50: any;
    public preg_52: any;
    public preg_53: any;
    constructor(){
        this.preg_46 = '',
        this.preg_47 = '',
        this.preg_50='',
        this.preg_52='',
        this.preg_53=''
    }
}