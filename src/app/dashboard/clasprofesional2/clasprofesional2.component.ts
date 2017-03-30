import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClasProfesional2Service } from './ClasProfesional2.service';
import { ClasProfesional2Model, Tabla3Model } from './ClasProfesional2.model';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'clasprofesional2',
    templateUrl: './clasprofesional2.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [ClasProfesional2Service],
    encapsulation: ViewEncapsulation.None,
})
export class ClasProfesional2Component implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;

    public clasprofesional2: ClasProfesional2Model;
    public errorMessage: string;
    public status: string;
    public respondidasSeccion: any;
    public totalSeccion: any;
    public max: number = 100;
    public showWarning: boolean;
    public dynamic: number;
    public type: string;

    constructor(
        private fb: FormBuilder,
        private servicio: ClasProfesional2Service,
        injector: Injector
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();        
    }

    
    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        this.getClasProfesional2();
    }

    createForm() {
        console.log("creando formulario");
        this.ifForm = this.fb.group({
            preg_64_tabla_3: this.fb.array([]),
            preg_65_tabla_3: this.fb.array([]),
            preg_66_tabla_3: this.fb.array([]),
            preg_67_tabla_3: this.fb.array([]),
            preg_68_tabla_3: this.fb.array([]),
            preg_69_tabla_3: this.fb.array([])
        });
        console.log("fin creando formulario");
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


    getClasProfesional2() {
        this.servicio.getDatosModelo()
            .subscribe(
            response => {                
                this.setPregunta(response.preg_64_tabla_3,'preg_64_tabla_3');
                this.setPregunta(response.preg_65_tabla_3,'preg_65_tabla_3');
                this.setPregunta(response.preg_66_tabla_3,'preg_66_tabla_3');
                this.setPregunta(response.preg_67_tabla_3,'preg_67_tabla_3');
                this.setPregunta(response.preg_68_tabla_3,'preg_68_tabla_3');
                this.setPregunta(response.preg_69_tabla_3,'preg_69_tabla_3');

                this.respondidasSeccion = response.respondidasSeccion;
                this.totalSeccion = response.totalSeccion;
                this.valorBarraProgreso();

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

    

    get data(): FormArray {
        return this.ifForm.get('data') as FormArray;
    };

    

    setPregunta(tabla: Tabla3Model[], nombretabla:string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    getPregunta (pregunta:string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };
    addFila(elemento: FormArray) {
        elemento.push(this.fb.group(new Tabla3Model()));
    }
    removeFila(elemento: FormArray, i: number) {
        elemento.removeAt(i);
    }


    


    onSubmit() {
        //this.clasprofesional2 = this.preparaParaGuardar();
        console.log(this.clasprofesional2);

    }
    /*preparaParaGuardar(): ClasProfesional2Model {
        const formModel = this.ifForm.value;
        const preg14Copy: Tabla3Model[] = formModel.preg_14_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg15Copy: Tabla3Model[] = formModel.preg_15_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg16Copy: Tabla3Model[] = formModel.preg_16_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg17Copy: Tabla3Model[] = formModel.preg_17_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg18Copy: Tabla3Model[] = formModel.preg_18_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));
        const preg19Copy: Tabla3Model[] = formModel.preg_19_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos));


        const saveClasProfesional2: ClasProfesional2Model = {
            user_id: 0,
            id: 1,
            preg_14_tabla_3: preg14Copy,
            preg_15_tabla_3: preg15Copy,
            preg_16_tabla_3: preg16Copy,
            preg_17_tabla_3: preg17Copy,
            preg_18_tabla_3: preg18Copy,
            preg_19_tabla_3: preg19Copy
        };
        return saveClasProfesional2;
    }*/
}