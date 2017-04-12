import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { SelPersonalService } from './selpersonal.service';
import { SelPersonalModel, TablaCheckbox, CriterioTipoInflu, dataModel } from './selpersonal.model';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'selpersonal',
    templateUrl: './selpersonal.template.html',
    styleUrls: [
        'selpersonal.style.css',
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [SelPersonalService],
    encapsulation: ViewEncapsulation.None,
})
export class SelPersonalComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: SelPersonalModel;
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
        private servicio: SelPersonalService,
        injector: Injector
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.modelo = new SelPersonalModel();
        this.createForm();
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
        console.log("creando formulario");
        this.ifForm = this.fb.group({
            data: this.fb.group(this.modelo.data),
            preg_87: this.fb.array([]),
            preg_88: this.fb.array([]),
            preg_90: this.fb.array([]),
            preg_95: this.fb.array([]),
            preg_101: this.fb.array([]),
            preg_103: this.fb.array([]),
            preg_117_tabla_2: this.fb.array([]),
        });

    }

    getValorElemento(elemento: string) {
        return this.ifForm.get(elemento).value;
    }

    getPregunta(pregunta: string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };

    setPregunta(tabla: any, nombretabla: string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }


    addFila(elemento: FormArray) {
        elemento.push(this.fb.group(new CriterioTipoInflu()));
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
                Object.getOwnPropertyNames(response.data).map((key: string) =>
                    (<FormArray>this.ifForm.controls['data']).controls[key].setValue(response.data[key])
                );
                this.setPregunta(response.preg_87, 'preg_87');
                this.setPregunta(response.preg_88, 'preg_88');
                this.setPregunta(response.preg_90, 'preg_90');
                this.setPregunta(response.preg_95, 'preg_95');
                this.setPregunta(response.preg_101, 'preg_101');
                this.setPregunta(response.preg_103, 'preg_103');
                this.setPregunta(response.preg_117_tabla_2, 'preg_117_tabla_2');

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
                        this.router.navigate(["/app/bajaseincorp"]);
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

    preparaParaGuardar() {
        const formModel = this.ifForm.value;
        const saveModelo: any = {
            data: formModel.data,
            preg_87: formModel.preg_87.map((datos: any) => Object.assign({}, datos)),
            preg_88: formModel.preg_88.map((datos: any) => Object.assign({}, datos)),
            preg_90: formModel.preg_90.map((datos: any) => Object.assign({}, datos)),
            preg_95: formModel.preg_95.map((datos: any) => Object.assign({}, datos)),
            preg_101: formModel.preg_101.map((datos: any) => Object.assign({}, datos)),
            preg_103: formModel.preg_103.map((datos: any) => Object.assign({}, datos)),
            preg_117_tabla_2: formModel.preg_117_tabla_2.map((datos: any) => Object.assign({}, datos))
        };
        return saveModelo;
    }

}
