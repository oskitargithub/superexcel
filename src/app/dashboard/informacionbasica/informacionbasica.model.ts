export class InformacionBasicaModel{
        public user: datosUserModel;
        public data: dataModel;
        public preg_2_tabla_2: CentroActividad[];
        public _token: string;
        public totalCuest: number;
        public respondidasCuest: number;
        public totalSeccion: number;
        public respondidasSeccion: number;
}

export class CentroActividad{
        centro: string = '';
        actividad: string ='';
}
export class dataModel{
        public preg_1: string;//public desarrollaact: string;       
        public preg_3: string;//public denominacion: string;
        public preg_5: string;//public mujeres: number;
        public preg_6: string;//public hombres: number;
        public preg_18: string;//public bpoliticas3: boolean;
        public preg_19: string;//public bpoliticas1: boolean;
        public preg_20: string;//public bpoliticas2: boolean;        
        public preg_22: string;//public bpoliticas4: boolean;
        public preg_23: string;//public bpoliticas5: boolean;
        constructor(){
            this.preg_1='',
            this.preg_3='',
            this.preg_5='0',
            this.preg_6='0',
            this.preg_18='',
            this.preg_19='',
            this.preg_20='',
            this.preg_22='',
            this.preg_23=''   
        }   
}


export class datosUserModel{
        public user_id : number;
        public empresa: string;
        public cif: string;
        public ambito: string;
        public sector: string;
        public convenio: string;
        public domicilio: string;
        public web: string;
        public personas: string;
        public telefonos: string;
        public horarios: string;
        public email: string;
        public num_centros: string;
        public num_comunidades:string;
        public created_at: any;
        public dia: string;
        public mes: string;
        public anyo: string;
        constructor(){
           this.user_id = 0,
           this.ambito='',
           this.anyo='',
           this.cif='',
           this.convenio='',
           this.dia = '',
           this.domicilio='',
           this.email ='',
           this.empresa='',
           this.horarios='',
           this.mes='',
           this.num_centros='',
           this.created_at = '';
           this.num_comunidades='',
           this.personas = '',
           this.sector = '',
           this.telefonos='',
           this.user_id = 0,
           this.web = ''
        }
}