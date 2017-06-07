export class InformacionBasicaPrModel{
        public user: datosUserModel;
        public data: dataModel;
        public preg_25_tabla_2: CentroActividad[];         
        public preg_40_tabla_4: TipodeMovimiento[];
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

export class TipodeMovimiento{
        texto : string='';
        fecha: string = '';
        mujeres: string ='';
        hombres: string ='';
}


export class dataModel{
        public preg_24: string;//public desarrollaact: string;       
        public preg_26: string;//public denominacion: string;
        public preg_28: string;//public mujeres: number;
        public preg_29: string;//public hombres: number;
        public preg_31: string; //comité empresa
        public preg_32: string;
        public preg_33: string;
        public preg_34: string;
        public preg_35: string;  
        public preg_36: string; 
        public preg_37: string; 
        public preg_38: string; 
        public preg_39: string; 
        public preg_41: string; 
        public preg_42: string; 
        public preg_43: string; 
        public preg_44: string;     
        constructor(){
            this.preg_24='',
            this.preg_26='',
           this.preg_28='',
           this.preg_29='',
           this.preg_31='',
           this.preg_32='',
           this.preg_33='',
           this.preg_34='',
           this.preg_35='',
           this.preg_36='',
           this.preg_37='',
           this.preg_38='',
           this.preg_39='',
           this.preg_41='',
           this.preg_42='',
           this.preg_43='',
           this.preg_44=''
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