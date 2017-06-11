import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { PromoCarreraPrService } from './promocarrerapr.service';
import { PromoCarreraPrModel, Tabla3Model, Tabla2Model, Tabla6Model, dataModel } from './promocarrerapr.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'promocarrerapr',
    templateUrl: './promocarrerapr.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [PromoCarreraPrService,DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class PromoCarreraPrComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: PromoCarreraPrModel;
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
        private servicio: PromoCarreraPrService,
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
            data: this.fb.group(new dataModel()),
            preg_573_tabla_6: this.fb.array([]),
            preg_574_tabla_6: this.fb.array([]),
            preg_575_tabla_3: this.fb.array([]),
            preg_576_tabla_3: this.fb.array([]),
            preg_577_tabla_3: this.fb.array([]),
            preg_585_tabla_3: this.fb.array([]),
            preg_586_tabla_3: this.fb.array([]),
            preg_587_tabla_3: this.fb.array([]),
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
                    this.setPregunta6(response.preg_573_tabla_6, 'preg_573_tabla_6');
                    this.setPregunta6(response.preg_574_tabla_6, 'preg_574_tabla_6');
                    this.setPregunta(response.preg_575_tabla_3, 'preg_575_tabla_3');
                    this.setPregunta(response.preg_576_tabla_3, 'preg_576_tabla_3');
                    this.setPregunta(response.preg_577_tabla_3, 'preg_577_tabla_3');
                    this.setPregunta(response.preg_585_tabla_3, 'preg_585_tabla_3');
                    this.setPregunta(response.preg_586_tabla_3, 'preg_586_tabla_3');
                    this.setPregunta(response.preg_587_tabla_3, 'preg_587_tabla_3');

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
                        this.router.navigate(["/app/prllpr"]);
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

    preparaParaGuardar(): PromoCarreraPrModel {
        const formModel = this.ifForm.value;
        const saveModelo: PromoCarreraPrModel = {
            data: formModel.data, 
            status : formModel.status,           
            totalCuest: formModel.totalCuest,
            respondidasCuest: formModel.respondidasCuest,
            totalSeccion: formModel.totalSeccion,
            respondidasSeccion: formModel.respondidasSeccion,
            preg_573_tabla_6: formModel.preg_573_tabla_6.map((datos: Tabla6Model) => Object.assign({}, datos)),
            preg_574_tabla_6: formModel.preg_574_tabla_6.map((datos: Tabla6Model) => Object.assign({}, datos)),
            preg_575_tabla_3: formModel.preg_575_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_576_tabla_3: formModel.preg_576_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_577_tabla_3: formModel.preg_577_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_585_tabla_3: formModel.preg_585_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_586_tabla_3: formModel.preg_586_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_587_tabla_3: formModel.preg_587_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
        };
        return saveModelo;
    }
}