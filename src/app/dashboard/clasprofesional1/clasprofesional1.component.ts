import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClasProfesional1Service } from './ClasProfesional1.service';
import { ClasProfesional1Model, dataModel, Tabla3Model } from './ClasProfesional1.model';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'clasprofesional',
    templateUrl: './clasprofesional1.template.html',
    styleUrls: ['../../forms/elements/elements.style.scss', '../../ui-elements/notifications/notifications.style.scss'],
    providers: [ClasProfesional1Service],
    encapsulation: ViewEncapsulation.None,
})
export class ClasProfesional1Component implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;

    public clasprofesional1: ClasProfesional1Model;
    public errorMessage: string;
    public status: string;

    constructor(
        private fb: FormBuilder,
        private clasprofesional1service: ClasProfesional1Service,
        injector: Injector
    ) {
        this.createForm();
        this.getClasProfesional1();


        //
        // This is a hack on angular style loader to prevent ng2-select2 from adding its styles.
        // They are hard-coded into the component, so there are no other way to get rid of them
        //
        this.domSharedStylesHost = injector.get(__platform_browser_private__.DomSharedStylesHost);
        this.domSharedStylesHost.__onStylesAdded__ = this.domSharedStylesHost.onStylesAdded;
        this.domSharedStylesHost.onStylesAdded = (additions) => {
            const style = additions[0];
            if (!style || !style.trim().startsWith('.select2-container')) {
                this.domSharedStylesHost.__onStylesAdded__(additions);
            }
        };

    }

    getClasProfesional1() {
        this.clasprofesional1service.getClasProfesional1()
            .subscribe(
            response => {
                console.log("datos formu");
                this.ifForm.setControl('data', this.fb.group(response.data));
                console.log("datos preg3");
                this.setTablaDpto(response.preg_3_tabla_3);
                this.setTablaEdad(response.preg_4_tabla_3);
                this.setTablaJefaturas(response.preg_5_tabla_3);
                this.setTablaCoord(response.preg_6_tabla_3);
                this.setTablaRector(response.preg_7_tabla_3);
                this.setTablaAsesor(response.preg_8_tabla_3);
                this.setTablaProfTec(response.preg_9_tabla_3);
                this.setTablaProfAdm(response.preg_10_tabla_3);
                this.setTablaProfNoCual(response.preg_11_tabla_3);
                this.setTablaProfSeg(response.preg_12_tabla_3);
                this.setTablaProfPol(response.preg_13_tabla_3);





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
        return elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
    }
    getTotalHombres(elemento: FormArray) {
        return elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
    }
    getTotalTotal(elemento: FormArray) {
        let hombres = elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1));
        let mujeres = elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1));
        return (hombres * 1 + mujeres * 1);
    }

    getTotalCompo() {
        return (this.ifForm.get('data.preg_5').value * 1 + this.ifForm.get('data.preg_6').value * 1);
    }
    /*
    getTotalMujeres(){
        return this.preg_3_tabla_3.value.map(c=>c.mujeres).reduce((sum,current) => (sum*1)+(current*1));
    }*/

    createForm() {
        console.log("creando formulario");
        this.ifForm = this.fb.group({
            data: this.fb.group(new dataModel()),
            preg_3_tabla_3: this.fb.array([])
        });
        console.log("fin creando formulario");
    }
    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
    }

    get data(): FormArray {
        return this.ifForm.get('data') as FormArray;
    };

    get preg_3_tabla_3(): FormArray {
        return this.ifForm.get('preg_3_tabla_3') as FormArray;
    };
    get preg_4_tabla_3(): FormArray {
        return this.ifForm.get('preg_4_tabla_3') as FormArray;
    };
    get preg_5_tabla_3(): FormArray {
        return this.ifForm.get('preg_5_tabla_3') as FormArray;
    };
    get preg_6_tabla_3(): FormArray {
        return this.ifForm.get('preg_6_tabla_3') as FormArray;
    };
    get preg_7_tabla_3(): FormArray {
        return this.ifForm.get('preg_7_tabla_3') as FormArray;
    };
    get preg_8_tabla_3(): FormArray {
        return this.ifForm.get('preg_8_tabla_3') as FormArray;
    };
    get preg_9_tabla_3(): FormArray {
        return this.ifForm.get('preg_9_tabla_3') as FormArray;
    };
    get preg_10_tabla_3(): FormArray {
        return this.ifForm.get('preg_10_tabla_3') as FormArray;
    };
    get preg_11_tabla_3(): FormArray {
        return this.ifForm.get('preg_11_tabla_3') as FormArray;
    };
    get preg_12_tabla_3(): FormArray {
        return this.ifForm.get('preg_12_tabla_3') as FormArray;
    };
    get preg_13_tabla_3(): FormArray {
        return this.ifForm.get('preg_13_tabla_3') as FormArray;
    };


    addFila(elemento: FormArray) {
        elemento.push(this.fb.group(new Tabla3Model()));
    }
    removeFila(elemento: FormArray, i: number) {
        elemento.removeAt(i);
    }

    setTablaDpto(preg_3_tabla_3: Tabla3Model[]) {
        const addressFGs = preg_3_tabla_3.map(dptos => this.fb.group(dptos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_3_tabla_3', addressFormArray);
    }
    setTablaEdad(preg_4_tabla_3: Tabla3Model[]) {
        const addressFGs = preg_4_tabla_3.map(edad => this.fb.group(edad));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_4_tabla_3', addressFormArray);
    }


    setTablaJefaturas(preg_5_tabla_3: Tabla3Model[]) {
        const addressFGs = preg_5_tabla_3.map(dptos => this.fb.group(dptos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_5_tabla_3', addressFormArray);
    }
    setTablaCoord(preg_6_tabla_3: Tabla3Model[]) {
        const addressFGs = preg_6_tabla_3.map(dptos => this.fb.group(dptos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_6_tabla_3', addressFormArray);
    }
    setTablaRector(preg_7_tabla_3: Tabla3Model[]) {
        const addressFGs = preg_7_tabla_3.map(dptos => this.fb.group(dptos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_7_tabla_3', addressFormArray);
    }
    setTablaAsesor(preg_8_tabla_3: Tabla3Model[]) {
        const addressFGs = preg_8_tabla_3.map(dptos => this.fb.group(dptos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_8_tabla_3', addressFormArray);
    }
    setTablaProfTec(preg_9_tabla_3: Tabla3Model[]) {
        const addressFGs = preg_9_tabla_3.map(dptos => this.fb.group(dptos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_9_tabla_3', addressFormArray);
    }
    setTablaProfAdm(preg_10_tabla_3: Tabla3Model[]) {
        const addressFGs = preg_10_tabla_3.map(dptos => this.fb.group(dptos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_10_tabla_3', addressFormArray);
    }
    setTablaProfNoCual(preg_11_tabla_3: Tabla3Model[]) {
        const addressFGs = preg_11_tabla_3.map(dptos => this.fb.group(dptos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_11_tabla_3', addressFormArray);
    }
    setTablaProfSeg(preg_12_tabla_3: Tabla3Model[]) {
        const addressFGs = preg_12_tabla_3.map(dptos => this.fb.group(dptos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_12_tabla_3', addressFormArray);
    }
    setTablaProfPol(preg_13_tabla_3: Tabla3Model[]) {
        const addressFGs = preg_13_tabla_3.map(dptos => this.fb.group(dptos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl('preg_13_tabla_3', addressFormArray);
    }

    onSubmit() {
        this.clasprofesional1 = this.preparaParaGuardar();
        console.log(this.clasprofesional1);

    }

    preparaParaGuardar(): ClasProfesional1Model {
        const formModel = this.ifForm.value;
        const preg3Copy: Tabla3Model[] = formModel.preg_3_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg4Copy: Tabla3Model[] = formModel.preg_4_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg5Copy: Tabla3Model[] = formModel.preg_5_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg6Copy: Tabla3Model[] = formModel.preg_6_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
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
            preg_5_tabla_3: preg5Copy,
            preg_6_tabla_3: preg6Copy,
            preg_7_tabla_3: preg7Copy,
            preg_8_tabla_3: preg8Copy,
            preg_9_tabla_3: preg9Copy,
            preg_10_tabla_3: preg10Copy,
            preg_11_tabla_3: preg11Copy,
            preg_12_tabla_3: preg12Copy,
            preg_13_tabla_3: preg13Copy,
        };
        return saveClasProfesional1;
    }



}