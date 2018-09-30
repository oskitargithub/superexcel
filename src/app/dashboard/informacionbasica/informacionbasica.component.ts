import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import {
    Router,
    NavigationExtras
} from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformacionBasicaModel, CentroActividad, datosUserModel, dataModel, Organos } from './informacionbasica.model';
import { InformacionBasicaService } from "./informacionbasica.service";
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';
import { AuthService } from '../../auth/auth.service';
import * as moment from 'moment';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'informacionbasica',
    templateUrl: './informacionbasica.template.html',
    styleUrls: ['./informacionbasica.css',
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [InformacionBasicaService, DashBoardFormErrorsService, AuthService],
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

    constructor(private authService: AuthService,
        private fb: FormBuilder,
        private servicio: InformacionBasicaService,
        private router: Router,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        //this.informacionbasica = new InformacionBasicaModel();
        this.createForm();
    }

    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        this.getInformacionBasica();
        moment.locale('es');
        this.midatePickeropt = new Date();
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


    onSubmit(redirigir: boolean) {
        this.informacionbasica = this.preparaParaGuardar();
        this.servicio.setDatosModelo(this.informacionbasica)
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
                            this.router.navigate(["/app/clasificacionprofesional1"]);
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


    createForm() {
        this.ifForm = this.fb.group({
            data: this.fb.group(new dataModel()),
            user: this.fb.group(new datosUserModel()),
            preg_2_tabla_2: this.fb.array([]),
            preg_701_tabla_2: this.fb.array([]),
            _token: ''
        });
        console.log("ifform");
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

    getPregunta(pregunta: string): FormArray {
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

    /*
    Nueva opción de órganos
    */
    setOrganos(preg_701_tabla_2: Organos[]) {
        const organosFGs = preg_701_tabla_2.map(organoact => this.fb.group(organoact));
        const organosFormArray = this.fb.array(organosFGs);
        this.ifForm.setControl('preg_701_tabla_2', organosFormArray);
    }

    get preg_701_tabla_2(): FormArray {
        return this.ifForm.get('preg_701_tabla_2') as FormArray;
    };

    addOrgano() {
        this.preg_701_tabla_2.push(this.fb.group(new Organos()));
    }

    removeOrganos(i: number) {
        this.preg_701_tabla_2.removeAt(i);
    }

    /**
     * 
     * fin nueva opción órganos
     */

    addValidaciones() {
        this.ifForm.get('data.preg_5').setValidators([CustomValidators.number]);
        this.ifForm.get('data.preg_6').setValidators([CustomValidators.number]);
        this.ifForm.get('user.email').setValidators([Validators.required, Validators.minLength(1), CustomValidators.email]);
    }


    setMensajesValidacion() {
        return {
            'data.preg_5': {
                'number': 'El campo debe ser numérico.'
            },
            'data.preg_6': {
                'number': 'El campo debe ser numérico.'
            },
            'user.email': {
                'required': 'El campo email es obligatorio.',
                'email': 'El formato email es incorrecto'
            }
        };
    }


    getInformacionBasica() {
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
                        //this.ifForm = this.fb.group(response); 
                        this.token = response._token;
                        console.log("trayendoo datos");
                        console.log(response.data);
                        console.log(response.user);
                        Object.getOwnPropertyNames(response.data).map((key: string) => {
                            if ((<FormArray>this.ifForm.controls['data']).controls[key] != undefined) {
                                (<FormArray>this.ifForm.controls['data']).controls[key].setValue(response.data[key])
                            }
                        }
                        );

                        Object.getOwnPropertyNames(response.user).map((key: string) => {
                            if ((<FormArray>this.ifForm.controls['user']).controls[key] != undefined) {
                                (<FormArray>this.ifForm.controls['user']).controls[key].setValue(response.user[key])
                            }

                        }
                        );
                        console.log("asignado");
                        this.addValidaciones();
                        console.log("add validaciones");
                        this.setCentroActividad(response.preg_2_tabla_2);
                        this.setOrganos(response.preg_701_tabla_2);
                        this.respondidasSeccion = response.respondidasSeccion;
                        this.totalSeccion = response.totalSeccion;
                        this.valorBarraProgreso();
                        console.log("fin trayendoo datos");
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
        const secretLairsDeepCopy2: Organos[] = formModel.preg_701_tabla_2.map(
            (organosact: Organos) => Object.assign({}, organosact)
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
            preg_2_tabla_2: secretLairsDeepCopy,
            preg_701_tabla_2:secretLairsDeepCopy2
        };
        return saveInformacionBasica;
    }



}