import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ConciliacionService } from './conciliacion.service';
import { ConciliacionModel, Tabla2Model, Tabla3Model, datosModel } from './conciliacion.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'conciliacion',
    templateUrl: './conciliacion.template.html',
    styleUrls: [
        '../../scss/notifications.style.scss',
        '../../scss/elements.style.scss'
    ],
    providers: [ConciliacionService,DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class ConciliacionComponent implements OnInit {
    injector: Injector;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: ConciliacionModel;
    public errorMessage: string;
    public status: string;
    public respondidasSeccion: any;
    public totalSeccion: any;

    public max: number = 100;
    public showWarning: boolean;
    public dynamic: number;
    public type: string;

    rememberMe: boolean = false;
    sortBy: string = "date";
    orderBy: string[] = ["rating", "comments"];

    constructor(private router: Router,
        private fb: FormBuilder,
        private servicio: ConciliacionService,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector
    ) {
        this.dynamic = 20;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.modelo = new ConciliacionModel();
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
            preg_140_tabla_3: this.fb.array([]),
            preg_142_tabla_3: this.fb.array([]),
            preg_143_tabla_3: this.fb.array([]),
            preg_146_tabla_3: this.fb.array([]),
            preg_147_tabla_3: this.fb.array([]),
            preg_148_tabla_3: this.fb.array([]),
            preg_150_tabla_3: this.fb.array([]),
            preg_152_tabla_3: this.fb.array([]),
            preg_130_tabla_2: this.fb.array([]),
        });
        console.log("fin creando formulario");
    }

    getValorElemento(elemento: string) {
        return this.ifForm.get(elemento).value;
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

    setPregunta(tabla: Tabla3Model[], nombretabla: string) {
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
    setPregunta2(tabla: any, nombretabla: string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
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
    addFila2(elemento: FormArray) {
        elemento.push(this.fb.group(new Tabla2Model()));
    }
    removeFila(elemento: FormArray, i: number) {
        elemento.removeAt(i);
    }
    addValidaciones() {
        this.ifForm.get('data.preg_154').setValidators([CustomValidators.number]);
        this.ifForm.get('data.preg_155').setValidators([CustomValidators.number]);
        this.ifForm.get('data.preg_157').setValidators([CustomValidators.number]);
        this.ifForm.get('data.preg_158').setValidators([CustomValidators.number]);        
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
                    Object.getOwnPropertyNames(response.data).map((key: string) =>
                        (<FormArray>this.ifForm.controls['data']).controls[key].setValue(response.data[key])
                    );
                    this.setPregunta(response.preg_140_tabla_3, 'preg_140_tabla_3');
                    this.setPregunta(response.preg_142_tabla_3, 'preg_142_tabla_3');
                    this.setPregunta(response.preg_143_tabla_3, 'preg_143_tabla_3');
                    this.setPregunta(response.preg_146_tabla_3, 'preg_146_tabla_3');
                    this.setPregunta(response.preg_147_tabla_3, 'preg_147_tabla_3');
                    this.setPregunta(response.preg_148_tabla_3, 'preg_148_tabla_3');
                    this.setPregunta(response.preg_150_tabla_3, 'preg_150_tabla_3');
                    this.setPregunta(response.preg_152_tabla_3, 'preg_152_tabla_3');
                    this.setPregunta2(response.preg_130_tabla_2,'preg_130_tabla_2');
                    this.respondidasSeccion = response.respondidasSeccion;
                    this.totalSeccion = response.totalSeccion;
                    this.valorBarraProgreso();
                    this.addValidaciones();

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
                        this.router.navigate(["/app/formacion"]);
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

    preparaParaGuardar(): ConciliacionModel {
        const formModel = this.ifForm.value;
        const saveModelo: any = {
            data: formModel.data,
            preg_140_tabla_3: formModel.preg_140_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_142_tabla_3: formModel.preg_142_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_143_tabla_3: formModel.preg_143_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_146_tabla_3: formModel.preg_146_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_147_tabla_3: formModel.preg_147_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_148_tabla_3: formModel.preg_148_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_150_tabla_3: formModel.preg_150_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_152_tabla_3: formModel.preg_152_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_130_tabla_2: formModel.preg_130_tabla_2.map((datos: Tabla2Model) => Object.assign({}, datos)),
        };
        return saveModelo;
    }
}
