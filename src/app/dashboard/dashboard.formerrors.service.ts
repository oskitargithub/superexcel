import {Injectable} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Injectable()
export class DashBoardFormErrorsService{    
	public objetoErrores:Object;    p
    constructor(){   
        this.objetoErrores={
            'requerido': 'El campo es obligatorio',
            'numerico': 'El campo debe ser numérico',
            'email': 'El campo debe ser una dirección de correo electrónica'
        };         
    }
}
