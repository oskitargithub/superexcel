export class InformacionBasicaModel{
        public user: datosUserModel;
        public data: dataModel;
        public preg_2_tabla_2: CentroActividad[];
        public _token: string;
        public totalCuest: number;
        public respondidasCuest: number;
        public totalSeccion: number;
        public respondidasSeccion: number;
        /*constructor(){
                this.data = new dataModel();
                this.user = new datosUserModel();
        }*/
}

export class CentroActividad{
        centro: string = '';
        actividad: string ='';
}
export class dataModel{
        public preg_1: any;//public desarrollaact: string;       
        public preg_3: any;//public denominacion: string;
        public preg_5: any;//public mujeres: number;
        public preg_6: any;//public hombres: number;
        public preg_18: any;//public bpoliticas3: boolean;
        public preg_19: any;//public bpoliticas1: boolean;
        public preg_20: any;//public bpoliticas2: boolean;        
        public preg_22: any;//public bpoliticas4: boolean;
        public preg_23: any;//public bpoliticas5: boolean;
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
        public apellidos: string;
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
        public fecha_ini: any;
        public nombre: any;
        public tipo : any;
        public updated_at : any;
        public username : any;
        constructor(){
           this.user_id = 0,
           this.ambito='',
           this.apellidos='',
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
           this.fecha_ini = '',
           this.nombre='',
           this.tipo = '',
           this.updated_at = '',
           this.username = '',
           this.web = ''
        }
}