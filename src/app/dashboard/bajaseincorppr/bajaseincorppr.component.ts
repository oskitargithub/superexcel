import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { BajasEIncorpPrService } from './bajaseincorppr.service';
import { BajasEIncorpPrModel, Tabla5Model, Tabla3Model, dataModel } from './bajaseincorppr.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'bajaseincorppr',
    templateUrl: './bajaseincorppr.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [BajasEIncorpPrService, DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class BajasEIncorpPrComponent implements OnInit {
    injector: Injector;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: BajasEIncorpPrModel;
    public errorMessage: string;
    public status: string;
    public respondidasSeccion: any;
    public totalSeccion: any;
    public valorbarra: number;
    public tipobarra: string;

    constructor(private router: Router,
        private fb: FormBuilder,
        private servicio: BajasEIncorpPrService,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector
    ) {
        this.valorbarra = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.modelo = new BajasEIncorpPrModel();

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

    setBarraProgreso() {
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
        this.valorbarra = value;
        this.tipobarra = type;
    }

    createForm() {
        this.ifForm = this.fb.group({
            data: this.fb.group(new dataModel()),
            preg_465_tabla_3: this.fb.array([]),
            preg_466_tabla_5: this.fb.array([]),
            preg_467_tabla_3: this.fb.array([]),
            preg_468_tabla_3: this.fb.array([]),
            preg_469_tabla_3: this.fb.array([]),
            preg_470_tabla_3: this.fb.array([]),
            preg_471_tabla_3: this.fb.array([]),
            preg_472_tabla_3: this.fb.array([]),
            preg_473_tabla_3: this.fb.array([]),
        });
    }

    get data(): FormArray {
        return this.ifForm.get('data') as FormArray;
    };

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


    setPregunta(tabla: any[], nombretabla: string) {
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
    setPregunta5(tabla: any[], nombretabla: string) {
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
    addFila3(elemento: FormArray) {
        elemento.push(this.fb.group({            
                texto: [''],
                respuesta:[''],
                mujeres: ['',CustomValidators.number],
                hombres:['',CustomValidators.number]        
        }));
    }

    addFila5(elemento: FormArray) {
        elemento.push(this.fb.group({            
                texto: [''],
                respuesta:[''],
                mujeres: ['',CustomValidators.number],
                hombres:['',CustomValidators.number],
                mujeres2: ['',CustomValidators.number],
                hombres2:['',CustomValidators.number]        
        }));
    }


    removeFila(elemento: FormArray, i: number,nombretabla:string) {
        elemento.removeAt(i);
        let nueva = this.ifForm.value[nombretabla].map((datos) => Object.assign({}, datos));
        this.setPregunta(nueva,nombretabla);
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
                    console.log(response.data);
                    Object.getOwnPropertyNames(response.data).map((key: string) =>
                        (<FormArray>this.ifForm.controls['data']).controls[key].setValue(response.data[key])
                    );
                    this.setPregunta(response.preg_465_tabla_3, 'preg_465_tabla_3');
                    this.setPregunta5(response.preg_466_tabla_5, 'preg_466_tabla_5');
                    this.setPregunta(response.preg_467_tabla_3, 'preg_467_tabla_3');
                    this.setPregunta(response.preg_468_tabla_3, 'preg_468_tabla_3');
                    this.setPregunta(response.preg_469_tabla_3, 'preg_469_tabla_3');
                    this.setPregunta(response.preg_470_tabla_3, 'preg_470_tabla_3');
                    this.setPregunta(response.preg_471_tabla_3, 'preg_471_tabla_3');
                    this.setPregunta(response.preg_472_tabla_3, 'preg_472_tabla_3');
                    this.setPregunta(response.preg_473_tabla_3, 'preg_473_tabla_3');

                    this.respondidasSeccion = response.respondidasSeccion;
                    this.totalSeccion = response.totalSeccion;
                    this.setBarraProgreso();
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
                        this.router.navigate(["/app/conciliacionpr"]);
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

    preparaParaGuardar(): BajasEIncorpPrModel {
        const formModel = this.ifForm.value;
         const datacuestionario: dataModel = formModel.data;
        const saveModelo: any = {
            data: datacuestionario,
            preg_465_tabla_3: formModel.preg_465_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_466_tabla_5: formModel.preg_466_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_467_tabla_3: formModel.preg_467_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_468_tabla_3: formModel.preg_468_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_469_tabla_3: formModel.preg_469_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_470_tabla_3: formModel.preg_470_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),   
            preg_471_tabla_3: formModel.preg_471_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)), 
            preg_472_tabla_3: formModel.preg_472_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)), 
            preg_473_tabla_3: formModel.preg_473_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),          
        };
        return saveModelo;
    }

}
