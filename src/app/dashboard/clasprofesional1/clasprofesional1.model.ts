export class ClasProfesional1Model{

    public id: number;
    public user_id : number;
    public preg_5: string;//public mujeres: number;
    public preg_6: string;//public hombres: number;
    public preg_3_tabla_3: Tabla3Model[]
}

export class Tabla3Model{
        denominacion: string = '';
        mujeres: string = '';
        hombres: string = '';
}