export class SelPersonalModel {

    public id: number;
    public user_id: number;
    public data: dataModel;
    public preg_100_tabla2: CriterioTipoInflu[];

    constructor() {
        this.id = 0,
            this.user_id = 0
    }
}

export class CriterioTipoInflu {
    criterio: string = '';
    influencia: any = '';
}

export class dataModel {
    public preg_1: string;
    /*public preg_2: string;
    public preg_3: string;
    public preg_4: string;
    public preg_5: string;
    public preg_6: string;
    public preg_6txt: string;

    public preg_11: string;
    public preg_12: string;
    public preg_13: string;
    public preg_14: string;
    public preg_15: string;
    public preg_16: string;
    public preg_16txt: string;

    public preg_17: string;

    public preg_21: string;
    public preg_22: string;
    public preg_23: string;
    public preg_24: string;
    public preg_25: string;
    public preg_26: string;
    public preg_27: string;
    public preg_27txt: string;

    public preg_31: string;
    public preg_32: string;
    public preg_32txt: string;
    public preg_33txt: string;
    public preg_34txt: string;
    public preg_35: string;
    public preg_36: string;

    public preg_40: string;
    public preg_41: string;
    public preg_42: string;
    public preg_43: string;
    public preg_44: string;
    public preg_45: string;
    public preg_46: string;
    public preg_47: string;
    public preg_48: string;
    public preg_49: string;
    public preg_50: string;
    public preg_51: string;
    public preg_52: string;
    public preg_53: string;
    public preg_54: string;
    public preg_55: string;
    public preg_56: string;
    public preg_57: string;
    public preg_58: string;
    public preg_59: string;
    public preg_60: string;

    public preg_61: string;

    public preg_70: string;
    public preg_71: string;
    public preg_72: string;
    public preg_73: string;
    public preg_74: string;
    public preg_75: string;
    public preg_76: string;
    public preg_77: string;
    public preg_78: string;
    public preg_79: string;
    public preg_80: string;
    public preg_81: string;
    public preg_82: string;
    public preg_83: string;
    public preg_84: string;
    public preg_85: string;
    public preg_86: string;
    public preg_87: string;
    public preg_88: string;
    public preg_89: string;
    public preg_90: string;
    public preg_70txt: string;
    public preg_71txt: string;
    public preg_72txt: string;
    public preg_73txt: string;
    public preg_74txt: string;
    public preg_75txt: string;
    public preg_76txt: string;
    public preg_77txt: string;
    public preg_78txt: string;
    public preg_79txt: string;
    public preg_80txt: string;
    public preg_81txt: string;
    public preg_82txt: string;
    public preg_83txt: string;
    public preg_84txt: string;
    public preg_85txt: string;
    public preg_86txt: string;
    public preg_87txt: string;
    public preg_88txt: string;
    public preg_89txt: string;
    public preg_90txt: string;

    public preg_91: string;
    public preg_92: string;
    public preg_93: string;

    public preg_94: string;
    public preg_95: string;
    public preg_96: string;
    public preg_94txt: string;
    public preg_95txt: string;
    public preg_96txt: string;*/
    constructor() {
        this.preg_1 = ''
    }
}


