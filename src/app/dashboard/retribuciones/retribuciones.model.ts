export class RetribucionesModel{
    public id: number;
    public user_id : number;    
    public preg_70_tabla_5: Tabla5Model[];
    public preg_71_tabla_5: Tabla5Model[];
    public preg_72_tabla_5: Tabla5Model[];
    public preg_73_tabla_5: Tabla5Model[];
    public preg_74_tabla_5: Tabla5Model[];
    public preg_75_tabla_5: Tabla5Model[];
    public preg_76_tabla_5: Tabla5Model[];
    public preg_77_tabla_5: Tabla5Model[];
    public preg_78_tabla_5: Tabla5Model[];
    public preg_79_tabla_5: Tabla5Model[];
    public preg_80_tabla_5: Tabla5Model[];
    public preg_81_tabla_5: Tabla5Model[];    
    public preg_83_tabla_5: Tabla5Model[];
    public preg_84_tabla_5: Tabla5Model[];
    public preg_85_tabla_5: Tabla5Model[];
    public preg_86_tabla_3: Tabla3Model[];

    constructor(){
        this.id=0,
        this.user_id = 0
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
