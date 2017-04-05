import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClasProfesional1Service } from './ClasProfesional1.service';
import { ClasProfesional1Model, dataModel, Tabla3Model } from './ClasProfesional1.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'clasprofesional',
    templateUrl: './clasprofesional1.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [ClasProfesional1Service, DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class ClasProfesional1Component implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;

    public modelo: ClasProfesional1Model;
    public errorMessage: string;
    public status: string;
    public respondidasSeccion: any;
    public totalSeccion: any;
    public valorbarra: number;
    public tipobarra: string;

    

    constructor(
        private fb: FormBuilder,
        private servicio: ClasProfesional1Service,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector
    ) {
        this.valorbarra = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();

    }

    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        this.getDatosModelo();
    }

    createForm() {
        this.ifForm = this.fb.group({
            data: this.fb.group(new dataModel()),
            preg_48_tabla_3: this.fb.array([]),
            preg_49_tabla_3: this.fb.array([]),
            preg_54_tabla_3: this.fb.array([]),
            preg_55_tabla_3: this.fb.array([]),
            preg_56_tabla_3: this.fb.array([]),
            preg_57_tabla_3: this.fb.array([]),
            preg_59_tabla_3: this.fb.array([]),
            preg_60_tabla_3: this.fb.array([]),
            preg_61_tabla_3: this.fb.array([]),
            preg_62_tabla_3: this.fb.array([]),
            preg_63_tabla_3: this.fb.array([]),
        });
    }

    iniTabla3(){
        return this.fb.group({
            texto: [],
            respuesta:[],
            mujeres: ['',CustomValidators.number],
            hombres:['',CustomValidators.number]
        })
    }

    Tabla3Validator(){
        (control: FormArray): {[key: string]: boolean} => {
        const mujeres = control.get('mujeres');
        console.log("mirando mujeres");
        if(mujeres!=null){
            console.log("con valor"+mujeres.value);
            return isNaN(mujeres.value) ? null : { nomatch: true };
        }
        else return null;
        };
    }


    getValorBarra() {
        if (this.respondidasSeccion == 0)
            return 0;
        else {
            let value = (this.respondidasSeccion * 100) / (this.totalSeccion * 1);
            return value;
        }
    }

    setBarraProgreso() {
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
        this.valorbarra = value;
        this.tipobarra = type;
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
                    Object.getOwnPropertyNames(response.data).map((key: string) =>
                        (<FormArray>this.ifForm.controls['data']).controls[key].setValue(response.data[key])
                    );
                    this.setPregunta(response.preg_48_tabla_3, 'preg_48_tabla_3');
                    this.setPregunta(response.preg_49_tabla_3, 'preg_49_tabla_3');
                    this.setPregunta(response.preg_54_tabla_3, 'preg_54_tabla_3');
                    this.setPregunta(response.preg_55_tabla_3, 'preg_55_tabla_3');
                    this.setPregunta(response.preg_56_tabla_3, 'preg_56_tabla_3');
                    this.setPregunta(response.preg_57_tabla_3, 'preg_57_tabla_3');
                    this.setPregunta(response.preg_59_tabla_3, 'preg_59_tabla_3');
                    this.setPregunta(response.preg_60_tabla_3, 'preg_60_tabla_3');
                    this.setPregunta(response.preg_61_tabla_3, 'preg_61_tabla_3');
                    this.setPregunta(response.preg_62_tabla_3, 'preg_62_tabla_3');
                    this.setPregunta(response.preg_63_tabla_3, 'preg_63_tabla_3');

                    this.respondidasSeccion = response.respondidasSeccion;
                    this.totalSeccion = response.totalSeccion;
                    this.setBarraProgreso();
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

    addValidaciones() {
        this.ifForm.get('data.preg_46').setValidators([CustomValidators.number]);
        this.ifForm.get('data.preg_47').setValidators([CustomValidators.number]);
        //this.serviceErrores.mensajesValidacion = this.setMensajesValidacion();
        //this.serviceErrores.objetoErrores = this.setObjetoErrores();
        console.log(this.serviceErrores.objetoErrores);
        this.ifForm.valueChanges.subscribe(data => this.serviceErrores.onValueChanged(this.ifForm, data));
        this.serviceErrores.onValueChanged(this.ifForm);
        
    }
    setMensajesValidacion() {
        return {
            'data.preg_46': {
                'number': 'El campo debe ser numérico.'
            },
            'data.preg_47': {
                'number': 'El campo debe ser numérico.'
            },
            'preg_49_tabla_3.mujeres':{
                'number': 'El campo debe ser numérico.'
            },
            'preg_49_tabla_3.hombres':{
                'number': 'El campo debe ser numérico.'
            }
        };
    }


    setObjetoErrores() {
        return {
            'data.preg_46': '',
            'data.preg_47': '',
            'preg_49_tabla_3.mujeres': '',
            'preg_49_tabla_3.hombres': ''
        };
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

    getTotalCompo() {
        return (this.ifForm.get('data.preg_46').value * 1 + this.ifForm.get('data.preg_47').value * 1);
    }

    addObjetoErrores(datos: string){
        this.serviceErrores.objetoErrores[datos]='';
    }

     

    setPregunta(tabla: Tabla3Model[], nombretabla: string) {
        const addressFGs = tabla.map(datos => 
            this.fb.group({            
                texto: [],
                respuesta:[],
                mujeres: ['',CustomValidators.number],
                hombres:['',CustomValidators.number]        
        }));
        Object.getOwnPropertyNames(tabla).map((key: any) =>{
            if (!isNaN(key)){
                this.addObjetoErrores(nombretabla+".controls["+key+"].mujeres"),
                this.addObjetoErrores(nombretabla+".controls["+key+"].hombres")          
            }
        }
        );
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    getPregunta(pregunta: string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };

    addFila(elemento: FormArray) {
        elemento.push(this.fb.group(new Tabla3Model()));
    }
    removeFila(elemento: FormArray, i: number) {
        elemento.removeAt(i);
    }


    get data(): FormArray {
        return this.ifForm.get('data') as FormArray;
    };

    onSubmit() {
        this.modelo = this.preparaParaGuardar();
        console.log(this.modelo);
    }
    onSubmit2() {
        this.modelo = this.preparaParaGuardar();
        console.log(this.modelo);
    }

    preparaParaGuardar(): ClasProfesional1Model {
        const formModel = this.ifForm.value;
        const preg_48_tabla_3Copy: Tabla3Model[] = formModel.preg_48_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_49_tabla_3Copy: Tabla3Model[] = formModel.preg_49_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_54_tabla_3Copy: Tabla3Model[] = formModel.preg_54_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_55_tabla_3Copy: Tabla3Model[] = formModel.preg_55_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_56_tabla_3Copy: Tabla3Model[] = formModel.preg_56_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_57_tabla_3Copy: Tabla3Model[] = formModel.preg_57_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_59_tabla_3Copy: Tabla3Model[] = formModel.preg_59_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_60_tabla_3Copy: Tabla3Model[] = formModel.preg_60_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_61_tabla_3Copy: Tabla3Model[] = formModel.preg_61_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_62_tabla_3Copy: Tabla3Model[] = formModel.preg_62_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_63_tabla_3Copy: Tabla3Model[] = formModel.preg_63_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));


        const datacuestionario: dataModel = formModel.data;
        const saveClasProfesional1: ClasProfesional1Model = {
            data: datacuestionario,
            preg_48_tabla_3: preg_48_tabla_3Copy,
            preg_49_tabla_3: preg_49_tabla_3Copy,
            preg_54_tabla_3: preg_54_tabla_3Copy,
            preg_55_tabla_3: preg_55_tabla_3Copy,
            preg_56_tabla_3: preg_56_tabla_3Copy,
            preg_57_tabla_3: preg_57_tabla_3Copy,
            preg_59_tabla_3: preg_59_tabla_3Copy,
            preg_60_tabla_3: preg_60_tabla_3Copy,
            preg_61_tabla_3: preg_61_tabla_3Copy,
            preg_62_tabla_3: preg_62_tabla_3Copy,
            preg_63_tabla_3: preg_63_tabla_3Copy,
        };
        return saveClasProfesional1;
    }



}