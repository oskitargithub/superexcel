import {Injectable} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Injectable()
export class DashBoardFormErrorsService{    
	public objetoErrores:Object;
    public mensajesValidacion:any;
    constructor(){   
        this.objetoErrores={}; 
        this.mensajesValidacion={};     
    }
    onValueChanged(formu:FormGroup, data?: any ) {
        console.log("onValueChanged");
        console.log(data);
        if (!formu) { return; }
        const form = formu;

        for (const field in this.objetoErrores) {
            // clear previous error message (if any)
            this.objetoErrores[field] = '';  
            console.log(field);          
            const control = form.get(field);            
            if (control && control.dirty && !control.valid) {
                
                const messages = this.mensajesValidacion[field];
                for (const key in control.errors) {
                    this.objetoErrores[field] += messages[key] + ' ';
                }
            }
        }       
    }
}