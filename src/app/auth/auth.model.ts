export class AuthModel{
    constructor(
        public usuario: string,
        public password: string,
        public perfil:string,
        public token: string
    ) { }
}