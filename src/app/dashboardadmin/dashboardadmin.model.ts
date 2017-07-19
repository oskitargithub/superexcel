export class DashBoardAdminModel{
    public id: number;
    public user: number;
    public cuest: number;
    public fecha_ini: string;
    public fecha_fin: string;
    public nomUsu: string;
    public Personal: string;
    public apellidos: string;
}


export class UserAdminModel{
    public user_id: number;
    public nombre: string;
    public apellidos: string;
    public username: string;
    public email: string;
    public password: string;
    public repitepassword: string;
}

export class UserFormModel{
    public cuest:any;
        public password:string;
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
        public repitepassword: string;
        constructor(){
            this.cuest = 1,
           this.password = '',
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
           this.repitepassword ='',
           this.web = ''
        }
}