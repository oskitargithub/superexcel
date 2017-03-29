export class ClasProfesional2Model{

    public id: number;
    public user_id : number;
    public preg_64_tabla_3: Tabla3Model[];
    public preg_65_tabla_3: Tabla3Model[];
    public preg_66_tabla_3: Tabla3Model[];
    public preg_67_tabla_3: Tabla3Model[];
    public preg_68_tabla_3: Tabla3Model[];
    public preg_69_tabla_3: Tabla3Model[];
    constructor(){
        this.id=0,
        this.user_id = 0
    }
}

export class Tabla3Model{
        respuesta: number = 0;
        texto: string = '';
        mujeres: any = '';
        hombres: any = '';
}
