import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { FormacionPrService } from './formacionpr.service';
import { FormacionPrModel, datosModel, Tabla3Model,Tabla2Model } from './formacionpr.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'formacionpr',
    templateUrl: './formacionpr.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [FormacionPrService,DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class FormacionPrComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: FormacionPrModel;
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
        private servicio: FormacionPrService,
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
        console.log("creando formulario");
        this.ifForm = this.fb.group({
            data: this.fb.group(new datosModel()),
            preg_523_tabla_3: this.fb.array([]),
            preg_543_tabla_3: this.fb.array([]),
            preg_545_tabla_3: this.fb.array([]),
            preg_546_tabla_3: this.fb.array([])
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
                    this.setPregunta(response.preg_523_tabla_3, 'preg_523_tabla_3');
                    this.setPregunta(response.preg_543_tabla_3, 'preg_543_tabla_3');
                    this.setPregunta(response.preg_545_tabla_3, 'preg_545_tabla_3');
                    this.setPregunta(response.preg_546_tabla_3, 'preg_546_tabla_3');
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
    getTotalTotal(elemento: FormArray) {
        if (elemento != null && elemento.value.length > 0) {
            let hombres = elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
            let mujeres = elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
            return (hombres * 1 + mujeres * 1);
        }
        else {
            return 0;
        }
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
                        this.router.navigate(["/app/promocarrerapr"]);
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

    preparaParaGuardar(): FormacionPrModel {
        const formModel = this.ifForm.value;
        const saveModelo: any = {
            data: formModel.data,
            preg_523_tabla_3: formModel.preg_523_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_543_tabla_3: formModel.preg_543_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_545_tabla_3: formModel.preg_545_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_546_tabla_3: formModel.preg_546_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos))
        };
        return saveModelo;
    }
}