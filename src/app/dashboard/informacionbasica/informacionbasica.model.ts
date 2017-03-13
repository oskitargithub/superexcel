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
        public preg_1: string;//public desarrollaact: string;       
        public preg_3: string;//public denominacion: string;
        public preg_5: string;//public mujeres: number;
        public preg_6: string;//public hombres: number;
        public preg_19: string;//public bpoliticas1: boolean;
        public preg_20: string;//public bpoliticas2: boolean;
        public preg_21: string;//public bpoliticas3: boolean;
        public preg_22: string;//public bpoliticas4: boolean;
        public preg_23: string;//public bpoliticas5: boolean;
        public preg_2_tabla_2: CentroActividad[]
   
}

export class CentroActividad{
        centro: string = '';
        actividad: string ='';
}