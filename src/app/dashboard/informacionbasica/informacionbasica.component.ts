import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformacionBasicaModel, CentroActividad, datosUserModel, dataModel } from './informacionbasica.model';
import { InformacionBasicaService } from "./informacionbasica.service";
import * as moment from 'moment';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'informacionbasica',
    templateUrl: './informacionbasica.template.html',
    styleUrls: [ './informacionbasica.css',
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [InformacionBasicaService],
    encapsulation: ViewEncapsulation.None,
})
export class InformacionBasicaComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;

    public informacionbasica: InformacionBasicaModel;
    public errorMessage: string;
    public status: string;
    public token: string;
    public respondidasSeccion: any;
    public totalSeccion: any;

    public max: number = 100;
    public showWarning: boolean;
    public dynamic: number;
    public type: string;

    public midatePickeropt: any;

    constructor(
        private fb: FormBuilder,
        private servicio: InformacionBasicaService,
        private router: Router,
        injector: Injector
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.getInformacionBasica();
        this.midatePickeropt =new Date();
        console.log(this.midatePickeropt);
    }


    getValorBarra(){
        if(this.respondidasSeccion==0)
            return 0;
        else{
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


    onSubmit2() {
        this.informacionbasica = this.preparaParaGuardar();
        this.servicio.edit(this.informacionbasica, this.token)
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
                    this.router.navigate(["/app/clasificacionprofesional1"]);
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
    onSubmit(model: InformacionBasicaModel) {
        console.log(this.ifForm.dirty);
        console.log(this.ifForm.valid);
        if (this.ifForm.dirty && this.ifForm.valid) {
        this.informacionbasica = this.preparaParaGuardar();

        this.submitted = true;
        console.log("formulario enviado");
        this.servicio.edit(this.informacionbasica, this.token)
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
                    this.informacionbasica = response.data;
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
    }

    createForm() {
        this.ifForm = this.fb.group({
            user: this.fb.group(new datosUserModel()),            
            //data: this.fb.group(new dataModel()),
            data:this.fb.group(new dataModel(),
            {
                'preg_5':['',Validators.required]
            }),
            preg_2_tabla_2: this.fb.array([]),
            _token: ''
        });
    }



    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        moment.locale('es');
    }

    get user(): FormArray {
        return this.ifForm.get('user') as FormArray;
    };

    get data(): FormArray {
        return this.ifForm.get('data') as FormArray;
    };

    getTotal() {
        return (this.ifForm.get('data.preg_5').value * 1 + this.ifForm.get('data.preg_6').value * 1);
    }
    
    getPregunta (pregunta:string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };

    setCentroActividad(preg_2_tabla_2: CentroActividad[]) {
        const addressFGs = preg_2_tabla_2.map(centroact => this.fb.group(centroact));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_2_tabla_2', addressFormArray);
    }

    get preg_2_tabla_2(): FormArray {
        return this.ifForm.get('preg_2_tabla_2') as FormArray;
    };

    addCentroActividad() {
        this.preg_2_tabla_2.push(this.fb.group(new CentroActividad()));
    }

    removeCentroActividad(i: number) {
        this.preg_2_tabla_2.removeAt(i);
    }


    getInformacionBasica() {
        this.servicio.getDatosModelo()
            .subscribe(
            response => {

                //this.ifForm = this.fb.group(response); 
                this.token = response._token;
                console.log("pillao token" + this.token);
                console.log(response.user);
                this.ifForm.setControl('user', this.fb.group(response.user));
                this.ifForm.setControl('data', this.fb.group(response.data));
                
                this.setCentroActividad(response.preg_2_tabla_2);

                this.respondidasSeccion = response.respondidasSeccion;
                this.totalSeccion = response.totalSeccion;
                this.valorBarraProgreso();
                console.log("respondidas" + this.respondidasSeccion + " y total" + this.totalSeccion);
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

    preparaParaGuardar(): InformacionBasicaModel {
        const formModel = this.ifForm.value;
        const secretLairsDeepCopy: CentroActividad[] = formModel.preg_2_tabla_2.map(
            (centroact: CentroActividad) => Object.assign({}, centroact)
        );

        const misdatosusuario: datosUserModel = formModel.user;
        const datacuestionario: dataModel = formModel.data;
        const saveInformacionBasica: InformacionBasicaModel = {
            user: misdatosusuario,
            data: datacuestionario,
            _token: formModel._token,
            totalCuest: formModel.totalCuest,
            respondidasCuest: formModel.respondidasCuest,
            totalSeccion: formModel.totalSeccion,
            respondidasSeccion: formModel.respondidasSeccion,
            preg_2_tabla_2: secretLairsDeepCopy
        };
        return saveInformacionBasica;
    }
}