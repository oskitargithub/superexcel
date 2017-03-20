import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClasProfesionalAdmService } from './clasprofesionaladm.service';
import { ClasProfesional1Model, dataModel, Tabla3Model } from '../../dashboard/clasprofesional1/ClasProfesional1.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'clasprofesionaladm',
    templateUrl: './clasprofesionaladm.template.html',
    styleUrls: ['../../forms/elements/elements.style.scss', '../../ui-elements/notifications/notifications.style.scss'],
    providers: [ClasProfesionalAdmService],
    encapsulation: ViewEncapsulation.None,
})
export class ClasProfesionalAdmComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;

    public clasprofesional1: ClasProfesional1Model;
    public errorMessage: string;
    public status: string;

    
    
      public doughnutChartLabels:string[] = ['Mujeres', 'Hombres'];
      public doughnutChartData:number[];// = [350, 450, 100];
      public doughnutChartType:string = 'doughnut';


    constructor(
        private fb: FormBuilder,
        private clasprofesionalservice: ClasProfesionalAdmService,
        injector: Injector
    ) {
        this.clasprofesional1 = new ClasProfesional1Model();
        this.createForm();
        this.getClasProfesional();
        

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




    
    getClasProfesional() {
        this.clasprofesionalservice.getClasProfesional()
            .subscribe(
            response => {
                console.log("datos formu");
                this.clasprofesional1.id = response.id;
                this.clasprofesional1.data = response.data;
                this.ifForm.setControl('data', this.fb.group(response.data));
                this.doughnutChartData= [67,33];
                console.log(this.clasprofesional1);
                /*this.setTablaDpto(response.preg_3_tabla_3);
                this.setTablaEdad(response.preg_4_tabla_3);
                this.setTablaJefaturas(response.preg_5_tabla_3);
                this.setTablaCoord(response.preg_6_tabla_3);
                this.setTablaRector(response.preg_7_tabla_3);
                this.setTablaAsesor(response.preg_8_tabla_3);
                this.setTablaProfTec(response.preg_9_tabla_3);
                this.setTablaProfAdm(response.preg_10_tabla_3);
                this.setTablaProfNoCual(response.preg_11_tabla_3);
                this.setTablaProfSeg(response.preg_12_tabla_3);
                this.setTablaProfPol(response.preg_13_tabla_3);*/





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
    getMujeres(){
      return (this.clasprofesional1.data.preg_5 * 1);
    }
    getMujeresPorcentaje(){
      return ( (this.clasprofesional1.data.preg_5 * 1)*100/(this.clasprofesional1.data.preg_5 * 1 + this.clasprofesional1.data.preg_6 * 1));
    }
    getHombres(){
      return (this.clasprofesional1.data.preg_6 * 1);
    }
    getHombresPorcentaje(){
      return ( (this.clasprofesional1.data.preg_6 * 1)*100/(this.clasprofesional1.data.preg_5 * 1 + this.clasprofesional1.data.preg_6 * 1));
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

  


}