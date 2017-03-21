export class ClasProfesional1Model{

    public id: number;
    public user_id : number;
    public data: dataModel;
    public preg_3_tabla_3: Tabla3Model[];
    public preg_4_tabla_3: Tabla3Model[];
    public preg_5_tabla_3: Tabla3Model[];
    public preg_6_tabla_3: Tabla3Model[];
    public preg_7_tabla_3: Tabla3Model[];
    public preg_8_tabla_3: Tabla3Model[];
    public preg_9_tabla_3: Tabla3Model[];
    public preg_10_tabla_3: Tabla3Model[];
    public preg_11_tabla_3: Tabla3Model[];
    public preg_12_tabla_3: Tabla3Model[];
    public preg_13_tabla_3: Tabla3Model[];
    constructor(){
        this.id=0,
        this.user_id = 0
    }
}

export class Tabla3Model{
        denominacion: any = '';
        mujeres: any = 0;
        hombres: any = 0;
}
export class dataModel{
    public preg_5: any;//public mujeres: number;
    public preg_6: any;//public hombres: number;
    public preg_7: string; //La organización, ¿tiene contratadas a personas con diversidad funcional o algún tipo de discapacidad?
    constructor(){
        this.preg_5 = '',
        this.preg_6 = '',
        this.preg_7=''
    }
}