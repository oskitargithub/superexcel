import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ConciliacionPrService } from './conciliacionpr.service';
import { ConciliacionPrModel, Tabla2Model, Tabla3Model, datosModel } from './conciliacionpr.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'conciliacionpr',
    templateUrl: './conciliacionpr.template.html',
    styleUrls: [
        '../../scss/notifications.style.scss',
        '../../scss/elements.style.scss'
    ],
    providers: [ConciliacionPrService,DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class ConciliacionPrComponent implements OnInit {
    injector: Injector;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: ConciliacionPrModel;
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
        private servicio: ConciliacionPrService,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.modelo = new ConciliacionPrModel();
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
            preg_490_tabla_3: this.fb.array([]),
            preg_492_tabla_3: this.fb.array([]),
            preg_493_tabla_3: this.fb.array([]),
            preg_496_tabla_3: this.fb.array([]),
            preg_497_tabla_3: this.fb.array([]),
            preg_498_tabla_3: this.fb.array([]),
            preg_500_tabla_3: this.fb.array([]),
            preg_501_tabla_3: this.fb.array([]),
            preg_480_tabla_2: this.fb.array([]),
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

    getTotalMujeresFila1(elemento: FormArray){
        if (elemento != null && elemento.value.length > 0){
            let salida= elemento.value.map(c => (c.texto == "Personas empleadas con hijos e hijas a cargo")? c.mujeres:0).reduce((sum, current) => (sum * 1) + (current * 1));;
            return salida;
        }
        else
            return 0;
    }
    getTotalHombresFila1(elemento: FormArray){
        if (elemento != null && elemento.value.length > 0){
            let salida= elemento.value.map(c => (c.texto == "Personas empleadas con hijos e hijas a cargo")? c.hombres:0).reduce((sum, current) => (sum * 1) + (current * 1));;
            return salida;
        }
        else
            return 0;
    }
    getTotalTotalFila1(elemento: FormArray){
        if (elemento != null && elemento.value.length > 0){
            let mujeres= elemento.value.map(c => (c.texto == "Personas empleadas con hijos e hijas a cargo")? c.mujeres:0).reduce((sum, current) => (sum * 1) + (current * 1));
            let hombres= elemento.value.map(c => (c.texto == "Personas empleadas con hijos e hijas a cargo")? c.hombres:0).reduce((sum, current) => (sum * 1) + (current * 1));;
            return (hombres * 1 + mujeres * 1);;
        }
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
         elemento.push(this.fb.group({            
                texto1: [''],
                texto2:[''],
                respuesta: ['']     
        }));
    }
    
    removeFila(elemento: FormArray, i: number, nombretabla:string) {
        elemento.removeAt(i);        
        let nueva = this.ifForm.value[nombretabla].map((datos) => Object.assign({}, datos));
        this.setPregunta(nueva,nombretabla);
    }

    removeFila2(elemento: FormArray, i: number, nombretabla:string) {
        elemento.removeAt(i);        
        let nueva = this.ifForm.value[nombretabla].map((datos) => Object.assign({}, datos));
        this.setPregunta2(nueva,nombretabla);
    }
    addValidaciones() {
        this.ifForm.get('data.preg_503').setValidators([CustomValidators.number]);
        this.ifForm.get('data.preg_504').setValidators([CustomValidators.number]);
        this.ifForm.get('data.preg_506').setValidators([CustomValidators.number]);
        this.ifForm.get('data.preg_507').setValidators([CustomValidators.number]);        
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
                    this.setPregunta(response.preg_490_tabla_3, 'preg_490_tabla_3');
                    this.setPregunta(response.preg_492_tabla_3, 'preg_492_tabla_3');
                    this.setPregunta(response.preg_493_tabla_3, 'preg_493_tabla_3');
                    this.setPregunta(response.preg_496_tabla_3, 'preg_496_tabla_3');
                    this.setPregunta(response.preg_497_tabla_3, 'preg_497_tabla_3');
                    this.setPregunta(response.preg_498_tabla_3, 'preg_498_tabla_3');
                    this.setPregunta(response.preg_500_tabla_3, 'preg_500_tabla_3');
                    this.setPregunta(response.preg_501_tabla_3, 'preg_501_tabla_3');
                    this.setPregunta2(response.preg_480_tabla_2,'preg_480_tabla_2');
                    this.respondidasSeccion = response.respondidasSeccion;
                    this.totalSeccion = response.totalSeccion;
                    this.valorBarraProgreso();
                    this.addValidaciones();
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
                        this.router.navigate(["/app/formacionpr"]);
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

    preparaParaGuardar(): ConciliacionPrModel {
        const formModel = this.ifForm.value;
        const saveModelo: any = {
            data: formModel.data,
            preg_490_tabla_3: formModel.preg_490_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_492_tabla_3: formModel.preg_492_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_493_tabla_3: formModel.preg_493_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_496_tabla_3: formModel.preg_496_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_497_tabla_3: formModel.preg_497_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_498_tabla_3: formModel.preg_498_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_500_tabla_3: formModel.preg_500_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_501_tabla_3: formModel.preg_501_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_480_tabla_2: formModel.preg_480_tabla_2.map((datos: Tabla2Model) => Object.assign({}, datos)),
        };
        return saveModelo;
    }
}
