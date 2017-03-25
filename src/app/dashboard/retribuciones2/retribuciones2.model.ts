export class Retribuciones2Model{

    public id: number;
    public user_id : number;
    public preg_60_tabla_5: Tabla5Model[];
    public preg_61_tabla_5: Tabla5Model[];
    public preg_62_tabla_5: Tabla5Model[];
    public preg_63_tabla_5: Tabla5Model[];
    public preg_64_tabla_5: Tabla5Model[];
    public preg_65_tabla_5: Tabla5Model[];
    public preg_66_tabla_5: Tabla5Model[];    
    public preg_68_tabla_5: Tabla5Model[];

    public preg_67_tabla_3: Tabla3Model[];


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
export class Tabla5Model{
        denominacion: string = '';
        mujeres1: any = '';
        hombres1: any = '';        
        mujeres2: any = '';
        hombres2: any = '';
}
