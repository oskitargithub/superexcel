export class SelPersonalModel {

    public id: number;
    public user_id: number;
    public data: dataModel;
    
    constructor() {
        this.id = 0,
        this.user_id = 0,
        this.data = new dataModel();
    }
}

export class CriterioTipoInflu {
    criterio: string = '';
    tipoInfluencia: any = '';
}


export class TablaCheckbox {
    respuesta: number = 0;
    texto: string = '';
    valor1: any = '';
    texto1: string = '';
}

export class dataModel {
    public preg_89: any = '';
    public preg_96: any = '';
    public preg_97: any = '';
    public preg_98: any = '';
    public preg_100: any = '';
    public preg_102: any = '';
    public preg_104: any = '';
    public preg_105: any = '';
    public preg_106: any = '';
    public preg_111: any = '';
    public preg_112: any = '';
    public preg_113: any = '';
    public preg_114: any = '';
    public preg_115: any = '';
    public preg_116: any = '';
    constructor() {
        this.preg_100 = '';
    }
}


