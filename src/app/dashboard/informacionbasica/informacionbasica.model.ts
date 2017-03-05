export class InformacionBasicaModel{
    public id: number;
        public id_usuario : number;
        public razon_social: string;
        public cif: string;
        public ambito: string;
        public convenio: string;
        public domicilio: string;
        public web: string;
        public personas: string;
        public telefono: string;
        public horario: string;
        public email: string;
        public dia: string;
        public mes: string;
        public anyo: string;
        public desarrollaact: string;       
        public denominacion: string;
        public mujeres: number;
        public hombres: number;
        public bpoliticas1: boolean;
        public bpoliticas2: boolean;
        public bpoliticas3: boolean;
        public bpoliticas4: boolean;
        public bpoliticas5: boolean;
        public centros_actividades: CentroActividad[]
   
}

export class CentroActividad{
        centro: string = '';
        actividad: string ='';
}