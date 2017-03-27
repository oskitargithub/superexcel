import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BajasEIncorpService } from './bajaseincorp.service';
import { BajasEIncorpModel, Tabla5Model, Tabla4Model, Tabla3Model } from './bajaseincorp.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'bajaseincorp',
    templateUrl: './bajaseincorp.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [BajasEIncorpService],
    encapsulation: ViewEncapsulation.None,
})
export class BajasEIncorpComponent implements OnInit {
    injector: Injector;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: BajasEIncorpModel;
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
        private servicio: BajasEIncorpService,
        injector: Injector
    ) {
        this.dynamic = 20;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.modelo = new BajasEIncorpModel();
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
            preg_1_tabla_3: this.fb.array([]),
            preg_2_tabla_5: this.fb.array([]),
            preg_3_tabla_3: this.fb.array([]),
            preg_4_tabla_3: this.fb.array([]),
            preg_5_tabla_4: this.fb.array([]),
            preg_6_tabla_3: this.fb.array([]),
        });
        console.log("fin creando formulario");
    }

    getTotalMujeres(elemento: FormArray) {
        return elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
    }
    getTotalHombres(elemento: FormArray) {
        return elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
    }
    getTotalTotal(elemento: FormArray) {
        let hombres = elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
        let mujeres = elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
        return (hombres * 1 + mujeres * 1);
    }

    setPregunta5(tabla: Tabla5Model[], nombretabla: string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    setPregunta4(tabla: Tabla4Model[], nombretabla: string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }
    setPregunta3(tabla: Tabla3Model[], nombretabla: string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    getPregunta(pregunta: string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };
    addFila3(elemento: FormArray) {
        elemento.push(this.fb.group(new Tabla3Model()));
    }
    removeFila(elemento: FormArray, i: number) {
        elemento.removeAt(i);
    }
    getDatosModelo() {
        this.servicio.getDatosModelo().subscribe(
            response => {
                console.log("datos formu");
                this.setPregunta3(response.preg_1_tabla_3, 'preg_1_tabla_3');
                this.setPregunta5(response.preg_2_tabla_5, 'preg_2_tabla_5');
                this.setPregunta3(response.preg_3_tabla_3, 'preg_3_tabla_3');
                this.setPregunta3(response.preg_4_tabla_3, 'preg_4_tabla_3');
                this.setPregunta4(response.preg_5_tabla_4, 'preg_5_tabla_4');
                this.setPregunta3(response.preg_6_tabla_3, 'preg_6_tabla_3');

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
