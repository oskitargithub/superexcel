export class ComunicacionModel{
public status: string;    
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;    
    public data: dataModel;    
    constructor(){
        this.data = new dataModel();
    }   
}


export class dataModel{
    public user_id: number;
    public preg_1: any;
    public preg_2: any;
    public preg_3: any; 
    public preg_4: any;
    public preg_5: any;
    public preg_6: any; 
    public preg_7: any;
    public preg_8: any;
    public preg_9: any; 
   

    constructor(){
        this.user_id = 0,
        this.preg_1 = '',
        this.preg_2 = '',
        this.preg_3 = '',
        this.preg_4 = '',
        this.preg_5 = '',
        this.preg_6 = '',
        this.preg_7 = '',
        this.preg_8 = '',
        this.preg_9 = ''
    }
}