export class ComunicacionModel{
public status: string;    
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;    
    public data: dataModel;   
    public preg_355: any;
    public preg_356: any; 
    constructor(){
        this.data = new dataModel();
    }   
}


export class dataModel{
    public user_id: number;
    public preg_360: any;
    public preg_361: any;
    public preg_362: any;
    public preg_363: any; 
    public preg_364: any;
    public preg_365: any;
    public preg_366: any; 
    public preg_367: any;
    public preg_368: any;
   

    constructor(){
        this.user_id = 0,
        this.preg_360 = '',
        this.preg_361 = '',
        this.preg_362 = '',
        this.preg_363 = '',
        this.preg_364 = '',
        this.preg_365 = '',
        this.preg_366 = '',
        this.preg_367 = '',
        this.preg_368 = ''        
    }
}