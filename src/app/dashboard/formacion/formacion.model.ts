export class FormacionModel {
    public status: string;
    public data: datosModel;
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;
}

export class datosModel {
    public user_id: number;
    public id: number;
}