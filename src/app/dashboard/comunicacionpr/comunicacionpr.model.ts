export class ComunicacionPrModel{
public status: string;    
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;    
    public data: dataModel;   
    public preg_682: any;
    public preg_683: any; 
    constructor(){
        this.data = new dataModel();
    }   
}


export class dataModel{    
    public preg_685: any;
    public preg_686: any;
    public preg_687: any;
    public preg_688: any; 
    public preg_689: any;
    public preg_690: any;
    public preg_691: any; 
    public preg_692: any;
    public preg_693: any;
   

    constructor(){        
        this.preg_685 = '',
        this.preg_686 = '',
        this.preg_687 = '',
        this.preg_688 = '',
        this.preg_689 = '',
        this.preg_690 = '',
        this.preg_691 = '',
        this.preg_692 = '',
        this.preg_693 = ''        
    }
}