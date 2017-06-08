import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Retribuciones2PrService } from './retribuciones2pr.service';
import { Retribuciones2PrModel, Tabla5Model, Tabla3Model, dataModel } from './retribuciones2pr.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'retribuciones2pr',
    templateUrl: './retribuciones2pr.template.html',
    styleUrls: ['../../scss/notifications.style.scss',
        '../../scss/elements.style.scss'],
    providers: [Retribuciones2PrService, DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class Retribuciones2PrComponent implements OnInit {
    injector: Injector;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    iRow: number = 0;
    public modelo: Retribuciones2PrModel;
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
        private servicio: Retribuciones2PrService,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.modelo = new Retribuciones2PrModel();        
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
            data: this.fb.group(new dataModel()),
            preg_422_tabla_5: this.fb.array([]),
            preg_423_tabla_5: this.fb.array([]),
            preg_424_tabla_5: this.fb.array([]),
            preg_425_tabla_5: this.fb.array([]),
            preg_426_tabla_5: this.fb.array([]),
            preg_427_tabla_5: this.fb.array([]),
            preg_428_tabla_5: this.fb.array([]),
            preg_429_tabla_5: this.fb.array([]),
            preg_430_tabla_3: this.fb.array([]),
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
    removeFila(elemento: FormArray, i: number, nombretabla:string) {
        elemento.removeAt(i);        
        //let nueva = this.ifForm.value.preg_429_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos));
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
                    Object.getOwnPropertyNames(response.data).map((key: string) =>
                        (<FormArray>this.ifForm.controls['data']).controls[key].setValue(response.data[key])
                    );                    
                    this.setPregunta(response.preg_422_tabla_5, 'preg_422_tabla_5');
                    this.setPregunta(response.preg_423_tabla_5, 'preg_423_tabla_5');
                    this.setPregunta(response.preg_424_tabla_5, 'preg_424_tabla_5');
                    this.setPregunta(response.preg_425_tabla_5, 'preg_425_tabla_5');
                    this.setPregunta(response.preg_426_tabla_5, 'preg_426_tabla_5');
                    this.setPregunta(response.preg_427_tabla_5, 'preg_427_tabla_5');
                    this.setPregunta(response.preg_428_tabla_5, 'preg_428_tabla_5');
                    this.setPregunta(response.preg_429_tabla_5, 'preg_429_tabla_5');
                    this.setPregunta3(response.preg_430_tabla_3, 'preg_430_tabla_3');

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
                        this.router.navigate(["/app/selpersonalpr"]);
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
        const datacuestionario: dataModel = formModel.data;
        const saveModelo: any = {
            data: datacuestionario,
            preg_422_tabla_5: formModel.preg_422_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_423_tabla_5: formModel.preg_423_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_424_tabla_5: formModel.preg_424_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_425_tabla_5: formModel.preg_425_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_426_tabla_5: formModel.preg_426_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),            
            preg_427_tabla_5: formModel.preg_427_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_428_tabla_5: formModel.preg_428_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_429_tabla_5: formModel.preg_429_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_430_tabla_3: formModel.preg_430_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
        };
        return saveModelo;
    }

}
