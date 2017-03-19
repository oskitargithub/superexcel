export class ClasProfesional2Model{

    public id: number;
    public user_id : number;
    public preg_14_tabla_3: Tabla3Model[];
    public preg_15_tabla_3: Tabla3Model[];
    public preg_16_tabla_3: Tabla3Model[];
    public preg_17_tabla_3: Tabla3Model[];
    public preg_18_tabla_3: Tabla3Model[];
    public preg_19_tabla_3: Tabla3Model[];
}

export class Tabla3Model{
        denominacion: string = '';
        mujeres: string = '';
        hombres: string = '';
}
