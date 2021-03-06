import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ClasProfesional2PrService } from './clasprofesional2pr.service';
import { ClasProfesional2PrModel, Tabla3Model } from './clasprofesional2pr.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'clasprofesional2pr',
    templateUrl: './clasprofesional2pr.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [ClasProfesional2PrService, DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class ClasProfesional2PrComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;

    public modelo: ClasProfesional2PrModel;
    public errorMessage: string;
    public status: string;
    public respondidasSeccion: any;
    public totalSeccion: any;
    public max: number = 100;
    public showWarning: boolean;
    public dynamic: number;
    public type: string;

    public mujerestotal:number = 0;
    public hombrestotal:number = 0;

    constructor(private router: Router,
        private fb: FormBuilder,
        private servicio: ClasProfesional2PrService,
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
        //this.getDatosModelo();
        this.getDatosModeloProf1();
    }

    createForm() {
        console.log("creando formulario");
        this.ifForm = this.fb.group({
            preg_406_tabla_3: this.fb.array([]),
            preg_408_tabla_3: this.fb.array([]),
            preg_409_tabla_3: this.fb.array([]),
            preg_410_tabla_3: this.fb.array([]),
            preg_411_tabla_3: this.fb.array([]),
            preg_412_tabla_3: this.fb.array([]),
            preg_413_tabla_3: this.fb.array([]),
            preg_414_tabla_3: this.fb.array([])
        });
        console.log("fin creando formulario");
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

    getDatosModeloProf1(){
        this.servicio.getDatosModeloProf1()
        .subscribe(
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
                    this.mujerestotal = response.data.preg_381;
                    this.hombrestotal = response.data.preg_382;
                    this.getDatosModelo();
                    console.log("El total da" + this.SumaTotal());
                    /*Messenger().post({
                        message: 'Los datos han sido cargados correctamente',
                        type: 'success',
                        showCloseButton: true
                    });*/
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

    getDatosModelo() {
        this.servicio.getDatosModelo()
            .subscribe(
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
                    this.setPregunta(response.preg_406_tabla_3, 'preg_406_tabla_3');
                    this.setPregunta(response.preg_408_tabla_3, 'preg_408_tabla_3');
                    this.setPregunta(response.preg_409_tabla_3, 'preg_409_tabla_3');
                    this.setPregunta(response.preg_410_tabla_3, 'preg_410_tabla_3');
                    this.setPregunta(response.preg_411_tabla_3, 'preg_411_tabla_3');
                    this.setPregunta(response.preg_412_tabla_3, 'preg_412_tabla_3');
                    this.setPregunta(response.preg_413_tabla_3, 'preg_413_tabla_3');
                    this.setPregunta(response.preg_414_tabla_3, 'preg_414_tabla_3');

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
        return elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1), 0);
    }
    getTotalHombres(elemento: FormArray) {
        return elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1), 0);
    }
    getTotalTotal(elemento: FormArray) {
        let hombres = elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1), 0);
        let mujeres = elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1), 0);
        return (hombres * 1 + mujeres * 1);
    }

    SumaMujeres(){        
        return this.mujerestotal*1;
    }
    SumaHombres(){        
        return this.hombrestotal*1;
    }
    SumaTotal(){
        return ((this.mujerestotal*1) + (this.hombrestotal*1));
    }



    get data(): FormArray {
        return this.ifForm.get('data') as FormArray;
    };



    setPregunta(tabla: Tabla3Model[], nombretabla: string) {
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

    getPregunta(pregunta: string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };
    addFila(elemento: FormArray){
         elemento.push(this.fb.group({            
                texto: [''],
                respuesta:[''],
                mujeres: ['',CustomValidators.number],
                hombres:['',CustomValidators.number]        
        }));
    }
    removeFila(elemento: FormArray, i: number, nombretabla:string) {
        elemento.removeAt(i);        
        let nueva = this.ifForm.value[nombretabla].map((datos) => Object.assign({}, datos));
        this.setPregunta(nueva,nombretabla);
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
                        this.router.navigate(["/app/retribucionespr"]);
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

    preparaParaGuardar(): ClasProfesional2PrModel {
        const formModel = this.ifForm.value;
        const saveClasProfesional2: ClasProfesional2PrModel = {
            preg_406_tabla_3: formModel.preg_406_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_408_tabla_3: formModel.preg_408_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_409_tabla_3: formModel.preg_409_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_410_tabla_3: formModel.preg_410_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_411_tabla_3: formModel.preg_411_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_412_tabla_3: formModel.preg_412_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_413_tabla_3: formModel.preg_413_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
            preg_414_tabla_3: formModel.preg_414_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),
        };
        return saveClasProfesional2;
    }
}