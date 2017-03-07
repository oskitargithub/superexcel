export class AuthModel{
    constructor(
        public usuario: string,
        public password: string,
        public perfil:string,
        public nombre: string,
        public apellidos: string,
        public token: string,
        public tipocuest: number
    ) { }
}