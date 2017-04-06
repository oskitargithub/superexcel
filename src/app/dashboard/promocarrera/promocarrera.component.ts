import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { PromoCarreraService } from './promocarrera.service';
import { PromoCarreraModel, Tabla3Model, Tabla2Model, Tabla6Model, dataModel } from './promocarrera.model';

import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'promocarrera',
    templateUrl: './promocarrera.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [PromoCarreraService,DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class PromoCarreraComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: PromoCarreraModel;
    public errorMessage: string;
    public status: string;
    public respondidasSeccion: any;
    public totalSeccion: any;
    public max: number = 100;
    public showWarning: boolean;
    public dynamic: number;
    public type: string;

    constructor(private router: Router,
        private fb: FormBuilder,
        private servicio: PromoCarreraService,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.getDatosModelo();
    }

    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
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
            data: this.fb.group(new dataModel()),
            preg_233_tabla_6: this.fb.array([]),
            preg_234_tabla_6: this.fb.array([]),
            preg_240_tabla_3: this.fb.array([]),
            preg_241_tabla_3: this.fb.array([]),
            preg_242_tabla_3: this.fb.array([]),
            preg_243_tabla_3: this.fb.array([]),
            preg_244_tabla_3: this.fb.array([]),
            preg_245_tabla_3: this.fb.array([]),
        });
        console.log("fin creando formulario");
    }

    getValorElemento(elemento: string) {
        return this.ifForm.get(elemento).value;
    }

    getPregunta(pregunta: string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };

    setPregunta(tabla: any[], nombretabla: string) {
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
    setPregunta6(tabla: any[], nombretabla: string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    addFila3(elemento: FormArray){
         elemento.push(this.fb.group({            
                texto: [''],
                respuesta:[''],
                mujeres: ['',CustomValidators.number],
                hombres:['',CustomValidators.number]        
        }));
    }


    addFila2(elemento: FormArray) {
        elemento.push(this.fb.group(new Tabla2Model()));
    }
    addFila6(elemento: FormArray) {
        elemento.push(this.fb.group(new Tabla6Model()));
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
                console.log("datos formu");


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
                    Object.getOwnPropertyNames(response.data).map((key: string) =>
                        (<FormArray>this.ifForm.controls['data']).controls[key].setValue(response.data[key])
                    );
                    this.setPregunta6(response.preg_233_tabla_6, 'preg_233_tabla_6');
                    this.setPregunta6(response.preg_234_tabla_6, 'preg_234_tabla_6');
                    this.setPregunta(response.preg_240_tabla_3, 'preg_240_tabla_3');
                    this.setPregunta(response.preg_241_tabla_3, 'preg_241_tabla_3');
                    this.setPregunta(response.preg_242_tabla_3, 'preg_242_tabla_3');
                    this.setPregunta(response.preg_243_tabla_3, 'preg_243_tabla_3');
                    this.setPregunta(response.preg_244_tabla_3, 'preg_244_tabla_3');
                    this.setPregunta(response.preg_245_tabla_3, 'preg_245_tabla_3');

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

     onSubmit(redirigir: boolean) {
        this.modelo = this.preparaParaGuardar();
        this.servicio.setDatosModelo(this.modelo)
            .subscribe(
            response => {
                this.status = response.status;
                if (this.status !== "success") {
                    Messenger().post({
                        message: 'Ha ocurrido un error guardando los datos.' + this.errorMessage,
                        type: 'error',
                        showCloseButton: true
                    });
                }
                else {
                    if (redirigir) {
                        this.router.navigate(["/app/prll"]);
                    }
                    Messenger().post({
                        message: 'Los datos han sido guardados correctamente',
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

    preparaParaGuardar(): PromoCarreraModel {
        const formModel = this.ifForm.value;
        const saveModelo: PromoCarreraModel = {
            data: formModel.data, 
            status : formModel.status,           
            totalCuest: formModel.totalCuest,
            respondidasCuest: formModel.respondidasCuest,
            totalSeccion: formModel.totalSeccion,
            respondidasSeccion: formModel.respondidasSeccion,
            preg_233_tabla_6: formModel.preg_233_tabla_6.map((datos: Tabla6Model) => Object.assign({}, datos)),
            preg_234_tabla_6: formModel.preg_234_tabla_6.map((datos: Tabla6Model) => Object.assign({}, datos)),
            preg_240_tabla_3: formModel.preg_240_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_241_tabla_3: formModel.preg_241_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_242_tabla_3: formModel.preg_242_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_243_tabla_3: formModel.preg_243_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_244_tabla_3: formModel.preg_244_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_245_tabla_3: formModel.preg_245_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
        };
        return saveModelo;
    }
}