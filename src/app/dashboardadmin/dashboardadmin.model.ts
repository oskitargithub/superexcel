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