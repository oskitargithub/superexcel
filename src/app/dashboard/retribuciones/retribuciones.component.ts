import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { RetribucionesService } from './retribuciones.service';
import { RetribucionesModel, Tabla5Model } from './retribuciones.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';

declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'retribuciones',
    templateUrl: './retribuciones.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [RetribucionesService, DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class RetribucionesComponent implements OnInit {
    injector: Injector;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: RetribucionesModel;
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
        private servicio: RetribucionesService,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.modelo = new RetribucionesModel();
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
            preg_70_tabla_5: this.fb.array([]),
            preg_71_tabla_5: this.fb.array([]),
            preg_72_tabla_5: this.fb.array([]),
            preg_73_tabla_5: this.fb.array([]),
            preg_74_tabla_5: this.fb.array([]),
            preg_75_tabla_5: this.fb.array([]),
            preg_76_tabla_5: this.fb.array([]),
        });
    }

    setPregunta(tabla: Tabla5Model[], nombretabla: string) {
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
                    this.setPregunta(response.preg_70_tabla_5, 'preg_70_tabla_5');
                    this.setPregunta(response.preg_71_tabla_5, 'preg_71_tabla_5');
                    this.setPregunta(response.preg_72_tabla_5, 'preg_72_tabla_5');
                    this.setPregunta(response.preg_73_tabla_5, 'preg_73_tabla_5');
                    this.setPregunta(response.preg_74_tabla_5, 'preg_74_tabla_5');
                    this.setPregunta(response.preg_75_tabla_5, 'preg_75_tabla_5');
                    this.setPregunta(response.preg_76_tabla_5, 'preg_76_tabla_5');

                    this.respondidasSeccion = response.respondidasSeccion;
                    this.totalSeccion = response.totalSeccion;
                    this.valorBarraProgreso();
                    this.ifForm.markAsPristine();  
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
                    this.ifForm.markAsPristine();  
                    if (redirigir) {
                        this.router.navigate(["/app/retribuciones2"]);
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

    preparaParaGuardar(): RetribucionesModel {
        const formModel = this.ifForm.value;
        const saveModelo: any = {
            preg_70_tabla_5: formModel.preg_70_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_71_tabla_5: formModel.preg_71_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_72_tabla_5: formModel.preg_72_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_73_tabla_5: formModel.preg_73_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_74_tabla_5: formModel.preg_74_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_75_tabla_5: formModel.preg_75_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_76_tabla_5: formModel.preg_76_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
        };
        return saveModelo;
    }
}
