import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormacionService } from './formacion.service';
import { FormacionModel, datosModel, Tabla3Model,Tabla2Model } from './formacion.model';

import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'formacion',
    templateUrl: './formacion.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [FormacionService,DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class FormacionComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: FormacionModel;
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
        private servicio: FormacionService,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        
    }

    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        this.getDatosModelo();
    }

    valorBarraProgreso() {
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
            data: this.fb.group(new datosModel()),
            preg_174_tabla_3: this.fb.array([]),
            preg_195_tabla_3: this.fb.array([]),
            preg_199_tabla_3: this.fb.array([]),
            preg_200_tabla_3: this.fb.array([]),
            preg_169:this.fb.array([]),
            preg_171:this.fb.array([]),
            preg_179:this.fb.array([]),
            preg_184:this.fb.array([]),
            preg_185:this.fb.array([]),
            preg_186:this.fb.array([]),
            preg_187:this.fb.array([]),
            preg_188:this.fb.array([])
        });
        console.log("fin creando formulario");
    }

    getValorElemento(elemento: string) {
        return this.ifForm.get(elemento).value;
    }

    getPregunta(pregunta: string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };

    setPregunta(tabla: any, nombretabla: string) {
        const addressFGs = tabla.map(datos => 
            this.fb.group({            
                texto: [datos.texto],
                respuesta:[datos.respuesta],
                mujeres: [datos.mujeres,CustomValidators.number],
                hombres:[datos.hombres,CustomValidators.number]        
        }));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }
    setPregunta2(tabla: any, nombretabla: string) {
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


    getDatosModelo() {
        this.servicio.getDatosModelo().subscribe(
            response => {
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
                    console.log("datos formu");
                    //this.ifForm.setControl('data', this.fb.group(response.data));
                    Object.getOwnPropertyNames(response.data).map((key: string) => 
                     (<FormArray>this.ifForm.controls['data']).controls[key].setValue(response.data[key])
                    ); 
                    this.setPregunta(response.preg_174_tabla_3, 'preg_174_tabla_3');
                    this.setPregunta(response.preg_195_tabla_3, 'preg_195_tabla_3');
                    this.setPregunta(response.preg_199_tabla_3, 'preg_199_tabla_3');
                    this.setPregunta(response.preg_200_tabla_3, 'preg_200_tabla_3');

                    this.setPregunta2(response.preg_169, 'preg_169');
                    this.setPregunta2(response.preg_171, 'preg_171');
                    this.setPregunta2(response.preg_179, 'preg_179');
                    this.setPregunta2(response.preg_184, 'preg_184');
                    this.setPregunta2(response.preg_185, 'preg_185');
                    this.setPregunta2(response.preg_186, 'preg_186');
                    this.setPregunta2(response.preg_187, 'preg_187');
                    this.setPregunta2(response.preg_188, 'preg_188');
                    
                    this.respondidasSeccion = response.respondidasSeccion;
                    this.totalSeccion = response.totalSeccion;
                    this.valorBarraProgreso();
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

    getTotalMujeres(elemento: FormArray) {
        if (elemento != null && elemento.value.length > 0)
            return elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
        else
            return 0;
    }
    getTotalHombres(elemento: FormArray) {
        if (elemento != null && elemento.value.length > 0)
            return elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
        else
            return 0;
    }
}