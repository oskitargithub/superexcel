export class RRPPModel {
    public status: string;
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;
    public preg_351_tabla_3: Tabla3Model[];
    public preg_352_tabla_3: Tabla3Model[];

}

export class Tabla3Model {
    respuesta: number = 0;
    texto: any = '';
    mujeres: any = 0;
    hombres: any = 0;
}
