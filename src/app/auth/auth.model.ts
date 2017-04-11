export class AuthModel{
    constructor(
        public usuario: string,
        public clave: string,
        public perfil:string,
        public nombre: string,
        public apellidos: string,
        public token: string,
        public api_token,
        public tipocuest: number
    ) { }
}