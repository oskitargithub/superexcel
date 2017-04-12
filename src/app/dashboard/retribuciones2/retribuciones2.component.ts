import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Retribuciones2Service } from './retribuciones2.service';
import { Retribuciones2Model, Tabla5Model, Tabla3Model } from './retribuciones2.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'retribuciones2',
    templateUrl: './retribuciones2.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [Retribuciones2Service, DashBoardFormErrorsService],
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

    constructor(private router: Router,
        private fb: FormBuilder,
        private servicio: Retribuciones2Service,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.modelo = new Retribuciones2Model();        
    }

    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        this.getDatosModelo();
    }

    getValorBarra() {
        if (this.respondidasSeccion == 0)
            return 0;
        else {
            let value = (this.respondidasSeccion * 100) / (this.totalSeccion * 1);
            value = Math.round(value);            
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

    setPregunta3(tabla: any, nombretabla: string) {
        const addressFGs = tabla.map(datos =>
            this.fb.group({
                texto: [datos.texto],
                respuesta: [datos.respuesta],
                mujeres: [datos.mujeres, CustomValidators.number],
                hombres: [datos.hombres, CustomValidators.number]
            }));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    setPregunta(tabla: any, nombretabla: string) {
        const addressFGs = tabla.map(datos =>
            this.fb.group({
                texto: [datos.texto],
                respuesta: [datos.respuesta],
                mujeres: [datos.mujeres, CustomValidators.number],
                hombres: [datos.hombres, CustomValidators.number],
                mujeres2: [datos.mujeres2, CustomValidators.number],
                hombres2: [datos.hombres2, CustomValidators.number]
            }));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    getPregunta(pregunta: string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };
    addFila(elemento: FormArray) {
        elemento.push(this.fb.group({
            texto: [''],
            respuesta: [''],
            mujeres: ['', CustomValidators.number],
            hombres: ['', CustomValidators.number],
            mujeres2: ['', CustomValidators.number],
            hombres2: ['', CustomValidators.number]
        }));
    }
    addFila3(elemento: FormArray) {
        elemento.push(this.fb.group({
            texto: [''],
            respuesta: [''],
            mujeres: ['', CustomValidators.number],
            hombres: ['', CustomValidators.number]
        }));
    }
    removeFila(elemento: FormArray, i: number) {
        elemento.removeAt(i);
    }
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
                    this.setPregunta(response.preg_77_tabla_5, 'preg_77_tabla_5');
                    this.setPregunta(response.preg_78_tabla_5, 'preg_78_tabla_5');
                    this.setPregunta(response.preg_79_tabla_5, 'preg_79_tabla_5');
                    this.setPregunta(response.preg_80_tabla_5, 'preg_80_tabla_5');
                    this.setPregunta(response.preg_81_tabla_5, 'preg_81_tabla_5');
                    this.setPregunta(response.preg_83_tabla_5, 'preg_83_tabla_5');
                    this.setPregunta(response.preg_84_tabla_5, 'preg_84_tabla_5');
                    this.setPregunta(response.preg_85_tabla_5, 'preg_85_tabla_5');
                    this.setPregunta3(response.preg_86_tabla_3, 'preg_86_tabla_3');

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
                        this.router.navigate(["/app/selpersonal"]);
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

    preparaParaGuardar(): any {
        const formModel = this.ifForm.value;
        const saveModelo: any = {
            preg_77_tabla_5: formModel.preg_77_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_78_tabla_5: formModel.preg_78_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_79_tabla_5: formModel.preg_79_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_80_tabla_5: formModel.preg_80_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_81_tabla_5: formModel.preg_81_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),            
            preg_83_tabla_5: formModel.preg_83_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_84_tabla_5: formModel.preg_84_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_85_tabla_5: formModel.preg_85_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_86_tabla_3: formModel.preg_86_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
        };
        return saveModelo;
    }

}
