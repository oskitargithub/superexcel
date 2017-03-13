export class InformacionBasicaPrModel{
    public id: number;
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
        public dia: string;
        public mes: string;
        public anyo: string;
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
        public preg_2_tabla_2: CentroActividad[];         
        public preg_40_tabla_4: TipodeMovimiento[];
}

export class CentroActividad{
        centro: string = '';
        actividad: string ='';
}

export class DenominacionMujeresHombres{
        denominacion: string = '';
        mujeres: string ='';
        hombres: string ='';
}
export class TipodeMovimiento{
        fecha: string = '';
        mujeres: string ='';
        hombres: string ='';
}