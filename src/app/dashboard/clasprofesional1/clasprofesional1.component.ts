import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClasProfesional1Service } from './ClasProfesional1.service';
import { ClasProfesional1Model, dataModel, Tabla3Model } from './ClasProfesional1.model';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'clasprofesional',
    templateUrl: './clasprofesional1.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [ClasProfesional1Service],
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


    getValorBarra(){
        if(this.respondidasSeccion==0)
            return 0;
        else{
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
                 console.log("servicio.getDatosModelo");       
                console.log(response.data);     
                this.ifForm.setControl('data', this.fb.group(response.data));
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


    getTotalMujeres(elemento: FormArray) {
        return elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1),0);
    }
    getTotalHombres(elemento: FormArray) {
        return elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1),0);
    }
    getTotalTotal(elemento: FormArray) {
        let hombres = elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1),0);
        let mujeres = elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1),0);
        return (hombres * 1 + mujeres * 1);
    }

    getTotalCompo() {
        return (this.ifForm.get('data.preg_46').value * 1 + this.ifForm.get('data.preg_47').value * 1);
    }
    /*
    getTotalMujeres(){
        return this.preg_3_tabla_3.value.map(c=>c.mujeres).reduce((sum,current) => (sum*1)+(current*1));
    }*/

    
    



    setPregunta(tabla: Tabla3Model[], nombretabla: string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
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
        //this.clasprofesional1 = this.preparaParaGuardar();
        console.log(this.modelo);

    }

    /*preparaParaGuardar(): ClasProfesional1Model {
        const formModel = this.ifForm.value;
        const preg3Copy: Tabla3Model[] = formModel.preg_3_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg4Copy: Tabla3Model[] = formModel.preg_4_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg5Copy: Tabla3Model[] = formModel.preg_46_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg6Copy: Tabla3Model[] = formModel.preg_47_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg7Copy: Tabla3Model[] = formModel.preg_7_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg8Copy: Tabla3Model[] = formModel.preg_8_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg9Copy: Tabla3Model[] = formModel.preg_9_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg10Copy: Tabla3Model[] = formModel.preg_10_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg11Copy: Tabla3Model[] = formModel.preg_11_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg12Copy: Tabla3Model[] = formModel.preg_12_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg13Copy: Tabla3Model[] = formModel.preg_13_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));


        const datacuestionario: dataModel = formModel.data;
        const saveClasProfesional1: ClasProfesional1Model = {
            user_id: 0,
            id: 1,
            data: datacuestionario,
            preg_3_tabla_3: preg3Copy,
            preg_4_tabla_3: preg4Copy,
            preg_46_tabla_3: preg5Copy,
            preg_46_tabla_3: preg6Copy,
            preg_7_tabla_3: preg7Copy,
            preg_8_tabla_3: preg8Copy,
            preg_9_tabla_3: preg9Copy,
            preg_10_tabla_3: preg10Copy,
            preg_11_tabla_3: preg11Copy,
            preg_12_tabla_3: preg12Copy,
            preg_13_tabla_3: preg13Copy,
        };
        return saveClasProfesional1;
    }*/



}