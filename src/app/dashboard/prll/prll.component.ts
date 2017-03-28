import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PRLLService } from './prll.service';
import { PRLLModel, Tabla3Model } from './prll.model';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'prll',
    templateUrl: './prll.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [PRLLService],
    encapsulation: ViewEncapsulation.None,
})
export class PRLLComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: PRLLModel;
    public errorMessage: string;
    public status: string;
    public respondidasSeccion: any;
    public totalSeccion: any;
    public max: number = 100;
    public showWarning: boolean;
    public dynamic: number;
    public type: string;

    constructor(
        private fb: FormBuilder,
        private servicio: PRLLService,
        injector: Injector
    ) {
        this.dynamic = 20;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.getDatosModelo();
    }

    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
    }

    valorBarraProgreso() {
        this.respondidasSeccion = 18;
        this.totalSeccion = 20;
        let value = (this.respondidasSeccion * 100) / (this.totalSeccion * 1);
        let type: string;

        if (value < 25) {
            type = 'danger';
        } else if (value < 50) {
            type = 'warning';
        } else if (value < 75) {
            type = 'info';
        } else {
            type = 'success';

        }
        this.dynamic = value;
        this.type = type;
    }

    createForm() {
        console.log("creando formulario");
        this.ifForm = this.fb.group({
            //data: this.fb.group(new dataModel()),
            preg_1_tabla_3: this.fb.array([]),
            preg_2_tabla_3: this.fb.array([]),
        });
        console.log("fin creando formulario");
    }

    getValorElemento(elemento : string){        
        return this.ifForm.get(elemento).value;
    }
    
    getPregunta (pregunta:string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };

    setPregunta(tabla: any, nombretabla:string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    

    addFila(elemento: FormArray) {
        elemento.push(this.fb.group(new Tabla3Model()));
    }
   
    
    removeFila(elemento: FormArray, i: number) {
        elemento.removeAt(i);
    }
    get data(): FormArray {
        return this.ifForm.get('data') as FormArray;
    };


    getDatosModelo(){
      this.servicio.getDatosModelo().subscribe(
            response => {
                console.log("datos formu"); 
                //this.ifForm.setControl('data', this.fb.group(response.data));               
                this.setPregunta(response.preg_1_tabla_3,'preg_1_tabla_3');
                this.setPregunta(response.preg_2_tabla_3,'preg_2_tabla_3');

                this.respondidasSeccion = response.respondidasSeccion;
                this.totalSeccion = response.totalSeccion;
                this.valorBarraProgreso();

                this.status = response.status;
                if (this.status !== "success") {
                    if (this.status == "tokenerror") {
                        Messenger().post({
                            message: 'Ha ocurrido un error de token.' + this.errorMessage,
                            type: 'error',
                            showCloseButton: true
                        });
                    }
                    else {
                        Messenger().post({
                            message: 'Ha ocurrido un error cargando los datos.' + this.errorMessage,
                            type: 'error',
                            showCloseButton: true
                        });
                    }
                }
                else {
                    Messenger().post({
                        message: 'Los datos han sido cargados correctamente',
                        type: 'success',
                        showCloseButton: true
                    });
                }
            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage !== null) {

                    Messenger().post({
                        message: 'Ha ocurrido un error en la petición.' + this.errorMessage,
                        type: 'error',
                        showCloseButton: true
                    });

                }
            });
    }
}