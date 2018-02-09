import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { SelPersonalPrService } from './selpersonalpr.service';
import { SelPersonalPrModel, TablaCheckbox, CriterioTipoInflu, dataModel } from './selpersonalpr.model';
import { DatePipe } from "@angular/common";
declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'selpersonalpr',
    templateUrl: './selpersonalpr.template.html',
    styleUrls: [        
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss',
        'selpersonalpr.style.css',],
    providers: [SelPersonalPrService],
    encapsulation: ViewEncapsulation.None,
})
export class SelPersonalPrComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: SelPersonalPrModel;
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
        private servicio: SelPersonalPrService,
        injector: Injector
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.modelo = new SelPersonalPrModel();
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
            preg_435: this.fb.array([]),
            preg_436: this.fb.array([]),
            preg_438: this.fb.array([]),
            preg_440: this.fb.array([]),
            preg_446: this.fb.array([]),
            preg_448: this.fb.array([]),
            preg_460_tabla_2: this.fb.array([]),
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

    removeFila(elemento: FormArray, i: number, nombretabla:string) {
        elemento.removeAt(i);        
        let nueva = this.ifForm.value[nombretabla].map((datos) => Object.assign({}, datos));
        this.setPregunta(nueva,nombretabla);
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
                    Object.getOwnPropertyNames(response.data).map((key: string) =>
                        (<FormArray>this.ifForm.controls['data']).controls[key].setValue(response.data[key])
                    );
                    console.log(this.ifForm);
                    this.setPregunta(response.preg_435, 'preg_435');
                    this.setPregunta(response.preg_436, 'preg_436');
                    this.setPregunta(response.preg_438, 'preg_438');
                    this.setPregunta(response.preg_440, 'preg_440');
                    this.setPregunta(response.preg_446, 'preg_446');
                    this.setPregunta(response.preg_448, 'preg_448');
                    this.setPregunta(response.preg_460_tabla_2, 'preg_460_tabla_2');

                    if ((<FormArray>this.ifForm.controls['preg_440']).controls['texto1'] != undefined) {
                        let fecharpt = (<FormArray>this.ifForm.controls['preg_440']).controls['texto1'].value;
                        var datePipe = new DatePipe("es");
                        if (fecharpt != null && fecharpt.length > 1) {
                            (<FormArray>this.ifForm.controls['preg_440']).controls['texto1'].setValue(datePipe.transform(fecharpt, 'yyyy-MM-dd'));
                        }
                    }
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
                        this.router.navigate(["/app/bajaseincorppr"]);
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
            preg_435: formModel.preg_435.map((datos: any) => Object.assign({}, datos)),
            preg_436: formModel.preg_436.map((datos: any) => Object.assign({}, datos)),
            preg_438: formModel.preg_438.map((datos: any) => Object.assign({}, datos)),
            preg_440: formModel.preg_440.map((datos: any) => Object.assign({}, datos)),
            preg_446: formModel.preg_446.map((datos: any) => Object.assign({}, datos)),
            preg_448: formModel.preg_448.map((datos: any) => Object.assign({}, datos)),
            preg_460_tabla_2: formModel.preg_460_tabla_2.map((datos: any) => Object.assign({}, datos))
        };
        return saveModelo;
    }

}
