import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class ConciliacionService {
    public datos;
    config: any;
    constructor(private _http: Http, config: AppConfig) {
        this.config = config.getConfig(); //me traigo la configuración para saber la url de la api
    }

    getDatosModelo() {
        return this._http.get(this.config.apilaravel + "cuestionario/seccion/8").map(res => {
            let headers = res.headers;
            let miobjeto = res.json();
            return (miobjeto);
        });
    }
/*
    getDatosModelo2(){
        let resultado = {
  "status": "success",
  "total": 24,
  "respondidas": 0,
  "respondidasCuest": 0,
  "respondidasSeccion": 9,
  "totalCuest": 12,
  "totalSeccion": 12,
  "data": {
    "user_id": 2,
    "preg_1": "si",
    "preg_2": "",
    "preg_3": "",
    "preg_4": "",
    "preg_5": "",
    "preg_6": "",
    "preg_7": "",
    "preg_8": "",
    "preg_9": "4",
    "preg_10": "15",
    "preg_11": "10",
    "preg_12": ""
  },
  "preg_0_tabla_2": [
    {
      "texto": "1",
      "valor": "true"
    },
    {
      "texto": "2",
      "valor": "false"
    },
    {
      "texto": "3",
      "valor": "true"
    },
    {
      "texto": "4",
      "valor": "true"
    }
  ],
  "preg_1_tabla_3": [
    {
      "texto": "Personas empleadas con hijos e hijas a cargo",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "Personas  empleadas  con  otros  familiares  o personas dependientes a cargo",
      "mujeres": "2",
      "hombres": "3"
    }
  ],
  "preg_2_tabla_3": [
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    }
  ],
  "preg_3_tabla_3": [
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    }
  ],
  "preg_4_tabla_3": [
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    }
  ],
  "preg_5_tabla_3": [
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    }
  ],
  "preg_6_tabla_3": [
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    }
  ],
  "preg_7_tabla_3": [
    {
      "texto": "1",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "2",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "3",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "4",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "5",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "6",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "7",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "8",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "9",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "10",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "11",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "12",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "13",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "14",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "15",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "16",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "17",
      "mujeres": "2",
      "hombres": "3"
    }
  ],
  "preg_8_tabla_3": [
    {
      "texto": "1",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "2",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "3",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "4",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "5",
      "mujeres": "2",
      "hombres": "3"
    },
    {
      "texto": "6",
      "mujeres": "2",
      "hombres": "3"
    }
  ],
  "preg_9_tabla_3": [
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    }
  ],
  "preg_10_tabla_3": [
    {
      "texto": "",
      "mujeres": "2",
      "hombres": "3"
    }
  ],
  "preg_rara": [
    {
      "texto": "pregunta 1",
      "valor": "true"
    },
    {
      "texto": "pregunta 2",
      "valor": "false"
    },
    {
      "texto": "pregunta 3",
      "valor": "true",
      "otro": "Perico de los palotes"
    }
  ]
}

return Observable.of(resultado);
    }*/
}