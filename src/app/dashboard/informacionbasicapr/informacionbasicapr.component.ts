import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import {
    Router,
    NavigationExtras
} from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformacionBasicaPrModel, CentroActividad, datosUserModel, dataModel, TipodeMovimiento } from './informacionbasicapr.model';
import { InformacionBasicaPrService } from "./informacionbasicapr.service";
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';
import { AuthService } from '../../auth/auth.service';
import { DatePipe } from "@angular/common";
import * as moment from 'moment';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'informacionbasicapr',
    templateUrl: './informacionbasicapr.template.html',
    styleUrls: ['./informacionbasicapr.css',
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [InformacionBasicaPrService, DashBoardFormErrorsService, AuthService],
    encapsulation: ViewEncapsulation.None,
})
export class InformacionBasicaPrComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public informacionbasica: InformacionBasicaPrModel;
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
    public datePipe: any;
    constructor(private authService: AuthService,
        private fb: FormBuilder,
        private servicio: InformacionBasicaPrService,
        private router: Router,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector
    ) {
        this.datePipe = new DatePipe("es");
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        //this.informacionbasica = new InformacionBasicaModel();
        this.createForm();
        
    }

    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        moment.locale('es');
        this.midatePickeropt = new Date();
        this.getInformacionBasica();
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
                        this.router.navigate(["/app/clasificacionprofesional1pr"]);
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
            preg_25_tabla_2: this.fb.array([]),
            preg_40_tabla_4: this.fb.array([]),
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
        let mujeres = (this.ifForm.get('data.preg_28') == null ? 0 : this.ifForm.get('data.preg_28').value) * 1;
        let hombres = (this.ifForm.get('data.preg_29') == null ? 0 : this.ifForm.get('data.preg_29').value) * 1;
        return (mujeres + hombres);
    }

    getPregunta(pregunta: string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };

    setPregunta(tabla: any, nombretabla: string) {
        console.log("añadiendo tabla" + nombretabla);
        const addressFGs = tabla.map(datos =>
            this.fb.group(datos)
        );
        
        console.log(addressFGs);
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
        if (nombretabla == "preg_40_tabla_4") {
            let miarray:FormArray = (<FormArray>this.ifForm.controls['preg_40_tabla_4']);
            miarray.controls.map(registro => {
                console.log(registro);
                 let miregistro = (<FormGroup>registro);
                 let antiguo = miregistro.get('fecha').value;
                 if(antiguo!=null && antiguo.length>1 && antiguo != "0000-00-00 00:00:00")
                miregistro.get('fecha').setValue(this.datePipe.transform(antiguo, 'yyyy-MM-dd'));
            });
            /*(<FormArray>this.ifForm.controls['preg_40_tabla_4']).controls.map(registro => {
                let miregistro: FormGroup = registro;
                let antiguo = miregistro.controls.fecha.value;
                registro.controls.fecha.setValue(this.datePipe.transform(antiguo, 'yyyy-MM-dd'));
            });*/
            
            /*addressFGs.map(registro => {
                if (registro.controls.fecha.value != "0000-00-00 00:00:00") {
                    registro.controls.fecha.setValue = this.datePipe.transform(registro.controls.fecha.value, 'yyyy-MM-dd');
                    console.log("fecha " + registro.controls.fecha.value);
                }
            })*/
        }
    }

    setCentroActividad(preg_25_tabla_2: CentroActividad[]) {
        const addressFGs = preg_25_tabla_2.map(centroact => this.fb.group(centroact));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_25_tabla_2', addressFormArray);
    }

    get preg_25_tabla_2(): FormArray {
        return this.ifForm.get('preg_25_tabla_2') as FormArray;
    };

    addCentroActividad() {
        this.preg_25_tabla_2.push(this.fb.group(new CentroActividad()));
    }

    removeCentroActividad(i: number) {
        this.preg_25_tabla_2.removeAt(i);
    }

    addValidaciones() {
        this.ifForm.get('data.preg_28').setValidators([CustomValidators.number]);
        this.ifForm.get('data.preg_29').setValidators([CustomValidators.number]);
        this.ifForm.get('user.email').setValidators([Validators.required, Validators.minLength(1), CustomValidators.email]);
    }


    setMensajesValidacion() {
        return {
            'data.preg_28': {
                'number': 'El campo debe ser numérico.'
            },
            'data.preg_29': {
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
                        console.log("data añadiendo" + key);
                        (<FormArray>this.ifForm.controls['data']).controls[key].setValue(response.data[key])
                    }
                    );

                    Object.getOwnPropertyNames(response.user).map((key: string) => {
                        let micontrol = (<FormArray>this.ifForm.controls['user']).controls[key];
                        if (micontrol != undefined) {
                            micontrol.setValue(response.user[key]);
                        }
                        console.log("user añadiendo" + key);
                        /*(<FormArray>this.ifForm.controls['user']).controls[key].setValue(response.user[key])*/
                    }
                    );
                    console.log("asignado");
                    this.addValidaciones();
                    //console.log("add validaciones");
                    //this.setCentroActividad(response.preg_25_tabla_2);
                    this.setPregunta(response.preg_25_tabla_2, 'preg_25_tabla_2');
                    //console.log("añadida actividad/centro");
                    this.setPregunta(response.preg_40_tabla_4, 'preg_40_tabla_4');
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

    preparaParaGuardar(): any {
        const formModel = this.ifForm.value;
        const preg_40_tabla_4Copy: TipodeMovimiento[] = formModel.preg_40_tabla_4.map((datos: TipodeMovimiento) => Object.assign({}, datos));
        const preg_25_tabla_2Copy: CentroActividad[] = formModel.preg_25_tabla_2.map((datos: CentroActividad) => Object.assign({}, datos));
        const misdatosusuario: datosUserModel = formModel.user;
        const datacuestionario: dataModel = formModel.data;
        const saveInformacionBasica: any = {
            user: misdatosusuario,
            data: datacuestionario,
            _token: formModel._token,
            totalCuest: formModel.totalCuest,
            respondidasCuest: formModel.respondidasCuest,
            totalSeccion: formModel.totalSeccion,
            respondidasSeccion: formModel.respondidasSeccion,
            preg_25_tabla_2: preg_25_tabla_2Copy,
            preg_40_tabla_4: preg_40_tabla_4Copy
        };
        return saveInformacionBasica;
    }



}