export class ClasProfesional2Model{

    public id: number;
    public user_id : number;
    public preg_14_tabla_3: Tabla3Model[];
    public preg_15_tabla_3: Tabla3Model[];
    public preg_16_tabla_3: Tabla3Model[];
    public preg_17_tabla_3: Tabla3Model[];
    public preg_18_tabla_3: Tabla3Model[];
    public preg_19_tabla_3: Tabla3Model[];
    constructor(){
        this.id=0,
        this.user_id = 0
    }
}

export class Tabla3Model{
        denominacion: string = '';
        mujeres: any = '';
        hombres: any = '';
}
