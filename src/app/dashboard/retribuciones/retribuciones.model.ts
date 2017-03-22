export class RetribucionesModel{

    public id: number;
    public user_id : number;
    public preg_50_tabla_6: Tabla6Model[];
    public preg_51_tabla_6: Tabla6Model[];
    public preg_52_tabla_6: Tabla6Model[];
    public preg_53_tabla_6: Tabla6Model[];
    public preg_54_tabla_6: Tabla6Model[];
    public preg_55_tabla_6: Tabla6Model[];
    constructor(){
        this.id=0,
        this.user_id = 0
    }
}

export class Tabla6Model{
        denominacion1: string = '';
        mujeres1: any = '';
        hombres1: any = '';
        denominacion2: string = '';
        mujeres2: any = '';
        hombres2: any = '';
}