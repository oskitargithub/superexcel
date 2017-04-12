export class ConciliacionModel {
    public status: string;
    public data: datosModel;
    public totalCuest: number;
    public respondidasCuest: number;
    public totalSeccion: number;
    public respondidasSeccion: number;
    public preg_140_tabla_3: Tabla3Model[];
    public preg_142_tabla_3: Tabla3Model[];
    public preg_143_tabla_3: Tabla3Model[];
    public preg_146_tabla_3: Tabla3Model[];
    public preg_147_tabla_3: Tabla3Model[];
    public preg_148_tabla_3: Tabla3Model[];
    public preg_150_tabla_3: Tabla3Model[];
    public preg_152_tabla_3: Tabla3Model[];
    public preg_130_tabla_2: Tabla2Model[];
    constructor(){
        this.data = new datosModel();
    }

}

export class datosModel {
    public preg_131: any;
    public preg_132: any;
    public preg_133: any;
    public preg_134: any;
    public preg_135: any;
    public preg_136: any;
    public preg_138: any;
    public preg_139: any;
    public preg_154: any;
    public preg_155: any;
    public preg_157: any;
    public preg_158: any;
    constructor() {
        this.preg_131 = '',
        this.preg_132 = '',
        this.preg_133 = '',
        this.preg_134 = '',
        this.preg_135 = '',
        this.preg_136 = '',
        this.preg_138 = '',
        this.preg_139 = '',
        this.preg_154 = '',
        this.preg_155 = '',
        this.preg_157 = '',
        this.preg_158 = ''
    }
} 

export class Tabla3Model {
    texto: any = '';
    mujeres: any = 0;
    hombres: any = 0;
    respuesta: any = 0;  
}

export class Tabla2Model {
    texto1: any = '';
    texto2: any = '';
    respuesta: any = 0;    
}
