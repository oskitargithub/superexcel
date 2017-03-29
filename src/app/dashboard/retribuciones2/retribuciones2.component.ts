import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Retribuciones2Service } from './retribuciones2.service';
import { Retribuciones2Model, Tabla5Model, Tabla3Model } from './retribuciones2.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'retribuciones2',
    templateUrl: './retribuciones2.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [Retribuciones2Service],
    encapsulation: ViewEncapsulation.None,
})
export class Retribuciones2Component implements OnInit {
    injector: Injector;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: Retribuciones2Model;
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
        private servicio: Retribuciones2Service,
        injector: Injector
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.modelo = new Retribuciones2Model();
        this.getDatosModelo();
    }

    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
    }

    getValorBarra() {
        if (this.respondidasSeccion == 0)
            return 0;
        else {
            let value = (this.respondidasSeccion * 100) / (this.totalSeccion * 1);
            return value;
        }
    }


    valorBarraProgreso() {
        let value = this.getValorBarra();
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
        this.ifForm = this.fb.group({
            preg_77_tabla_5: this.fb.array([]),
            preg_78_tabla_5: this.fb.array([]),
            preg_79_tabla_5: this.fb.array([]),
            preg_80_tabla_5: this.fb.array([]),
            preg_81_tabla_5: this.fb.array([]),            
            preg_83_tabla_5: this.fb.array([]),
            preg_84_tabla_5: this.fb.array([]),
            preg_85_tabla_5: this.fb.array([]),
            preg_86_tabla_3: this.fb.array([]),
        });
    }

    setPregunta(tabla: any, nombretabla: string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    getPregunta(pregunta: string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };
    addFila(elemento: FormArray) {
        elemento.push(this.fb.group(new Tabla5Model()));
    }
    addFila3(elemento: FormArray) {
        elemento.push(this.fb.group(new Tabla3Model()));
    }
    removeFila(elemento: FormArray, i: number) {
        elemento.removeAt(i);
    }
    getDatosModelo() {
        this.servicio.getDatosModelo().subscribe(
            response => {
                this.setPregunta(response.preg_77_tabla_5, 'preg_77_tabla_5');
                this.setPregunta(response.preg_78_tabla_5, 'preg_78_tabla_5');
                this.setPregunta(response.preg_79_tabla_5, 'preg_79_tabla_5');
                this.setPregunta(response.preg_80_tabla_5, 'preg_80_tabla_5');
                this.setPregunta(response.preg_81_tabla_5, 'preg_81_tabla_5');                
                this.setPregunta(response.preg_83_tabla_5, 'preg_83_tabla_5');
                this.setPregunta(response.preg_84_tabla_5, 'preg_84_tabla_5');
                this.setPregunta(response.preg_85_tabla_5, 'preg_85_tabla_5');
                this.setPregunta(response.preg_86_tabla_3, 'preg_86_tabla_3');

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
