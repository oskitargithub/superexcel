import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClasProfesional1PrService } from './clasprofesional1pr.service';
import { ClasProfesional1PrModel, dataModel, Tabla3Model } from './clasprofesional1pr.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'clasprofesional',
    templateUrl: './clasprofesional1pr.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [ClasProfesional1PrService, DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class ClasProfesional1PrComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;

    public modelo: ClasProfesional1PrModel;
    public errorMessage: string;
    public status: string;
    public respondidasSeccion: any;
    public totalSeccion: any;
    public valorbarra: number;
    public tipobarra: string;
    public mujerestotal:number = 0;
    public hombrestotal:number = 0;
    

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private servicio: ClasProfesional1PrService,
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
            preg_383_tabla_3: this.fb.array([]),
            preg_390_tabla_3: this.fb.array([]),
            preg_391_tabla_3: this.fb.array([]),
            preg_392_tabla_3: this.fb.array([]),
            preg_393_tabla_3: this.fb.array([]),
            preg_394_tabla_3: this.fb.array([]),
            preg_395_tabla_3: this.fb.array([]),
            preg_396_tabla_3: this.fb.array([]),
            preg_397_tabla_3: this.fb.array([]),
        });
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
        console.log("barra:"+this.valorbarra);
        console.log("tipobarra:"+this.tipobarra);
    }

    SumaMujeres(){
        this.mujerestotal = (<FormArray>this.ifForm.controls['data']).controls["preg_381"].value;
        return this.mujerestotal*1;
    }
    SumaHombres(){
        this.hombrestotal = (<FormArray>this.ifForm.controls['data']).controls["preg_382"].value;
        return this.hombrestotal*1;
    }
    SumaTotal(){
        return ((this.mujerestotal*1) + (this.hombrestotal*1));
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
                    
                    this.setPregunta(response.preg_383_tabla_3, 'preg_383_tabla_3');
                    this.setPregunta(response.preg_390_tabla_3, 'preg_390_tabla_3');
                    this.setPregunta(response.preg_391_tabla_3, 'preg_391_tabla_3');
                    this.setPregunta(response.preg_392_tabla_3, 'preg_392_tabla_3');
                    this.setPregunta(response.preg_393_tabla_3, 'preg_393_tabla_3');
                    this.setPregunta(response.preg_394_tabla_3, 'preg_394_tabla_3');
                    this.setPregunta(response.preg_395_tabla_3, 'preg_395_tabla_3');
                    this.setPregunta(response.preg_396_tabla_3, 'preg_396_tabla_3');
                    this.setPregunta(response.preg_397_tabla_3, 'preg_397_tabla_3');
                    
                    this.mujerestotal = response.data.preg_381;
                    this.hombrestotal = response.data.preg_382;
                    this.respondidasSeccion = response.respondidasSeccion;
                    this.totalSeccion = response.totalSeccion;
                    this.setBarraProgreso();
                    this.addValidaciones();
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

    addValidaciones() {
        this.ifForm.get('data.preg_381').setValidators([CustomValidators.number]);
        this.ifForm.get('data.preg_382').setValidators([CustomValidators.number]);
        this.ifForm.get('data.preg_400').setValidators([CustomValidators.number]);
        this.ifForm.get('data.preg_401').setValidators([CustomValidators.number]);
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
        return (this.ifForm.get('data.preg_381').value * 1 + this.ifForm.get('data.preg_382').value * 1);
    }
    getTotalDiversidad() {
        return (this.ifForm.get('data.preg_400').value * 1 + this.ifForm.get('data.preg_401').value * 1);
    }

   

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
    removeFila(elemento: FormArray, i: number,nombretabla:string) {
        elemento.removeAt(i);
        let nueva = this.ifForm.value[nombretabla].map((datos) => Object.assign({}, datos));
        this.setPregunta(nueva,nombretabla);
    }


    get data(): FormArray {
        return this.ifForm.get('data') as FormArray;
    };

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
                        this.router.navigate(["/app/clasificacionprofesional2pr"]);
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
   

    preparaParaGuardar(): ClasProfesional1PrModel {
        const formModel = this.ifForm.value;
        const preg_383_tabla_3Copy: Tabla3Model[] = formModel.preg_383_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_390_tabla_3Copy: Tabla3Model[] = formModel.preg_390_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_391_tabla_3Copy: Tabla3Model[] = formModel.preg_391_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_392_tabla_3Copy: Tabla3Model[] = formModel.preg_392_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_393_tabla_3Copy: Tabla3Model[] = formModel.preg_393_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_394_tabla_3Copy: Tabla3Model[] = formModel.preg_394_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_395_tabla_3Copy: Tabla3Model[] = formModel.preg_395_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_396_tabla_3Copy: Tabla3Model[] = formModel.preg_396_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg_397_tabla_3Copy: Tabla3Model[] = formModel.preg_397_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));

        const datacuestionario: dataModel = formModel.data;
        const saveClasProfesional1: ClasProfesional1PrModel = {
            data: datacuestionario,
            preg_383_tabla_3: preg_383_tabla_3Copy,
            preg_390_tabla_3: preg_390_tabla_3Copy,
            preg_391_tabla_3: preg_391_tabla_3Copy,
            preg_392_tabla_3: preg_392_tabla_3Copy,
            preg_393_tabla_3: preg_393_tabla_3Copy,
            preg_394_tabla_3: preg_394_tabla_3Copy,
            preg_395_tabla_3: preg_395_tabla_3Copy,
            preg_396_tabla_3: preg_396_tabla_3Copy,
            preg_397_tabla_3: preg_397_tabla_3Copy,
        };
        return saveClasProfesional1;
    }



}