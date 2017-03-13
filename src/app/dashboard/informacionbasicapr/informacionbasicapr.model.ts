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
        public preg_1: string;//public desarrollaact: string;       
        public preg_3: string;//public denominacion: string;
        public preg_5: string;//public mujeres: number;
        public preg_6: string;//public hombres: number;
        public preg_8: string;
        public preg_9: string;
        public preg_10: string;
        public preg_11: string;
        public preg_12: string;  
        public preg_13: string; 
        public preg_14: string; 
        public preg_15: string; 
        public preg_16: string; 
        public preg_17: string; 
        public preg_18: string; 
        public preg_19: string; 
        public preg_20: string; 
        public preg_21: string;   
        public preg_22: string;    
        public preg_23: string;       
        public preg_2_tabla_2: CentroActividad[];         
        public preg_17_tabla_4: TipodeMovimiento[];
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