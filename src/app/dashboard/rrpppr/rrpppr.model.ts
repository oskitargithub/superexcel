export class RRPPPrModel {
    public status: string;
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;
    public preg_675_tabla_3: Tabla3Model[];
    public preg_676_tabla_3: Tabla3Model[];
    public preg_677_tabla_3: Tabla3Model[];
    public preg_679:any;
    public preg_680:any;
    public data: dataModel;
}
export class dataModel{
    public preg_678: any;
    public preg_681: any;
    constructor(){
        this.preg_678 = '';
        this.preg_681 = '';
    }
}
export class Tabla3Model {
    respuesta: number = 0;
    texto: any = '';
    mujeres: any = 0;
    hombres: any = 0;
}
