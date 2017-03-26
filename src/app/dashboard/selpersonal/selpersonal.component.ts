import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SelPersonalService } from './selpersonal.service';
import { SelPersonalModel, CriterioTipoInflu,CriterioGrupo, dataModel } from './selpersonal.model';

declare var jQuery: any;
declare var Messenger: any;

@Component({
    selector: 'selpersonal',
    templateUrl: './selpersonal.template.html',
    styleUrls: [
        'selpersonal.style.css',
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [SelPersonalService],
    encapsulation: ViewEncapsulation.None,
})
export class SelPersonalComponent implements OnInit {
    injector: Injector;
    domSharedStylesHost: any;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: SelPersonalModel;
    public errorMessage: string;
    public status: string;
    public respondidasSeccion: any;
    public totalSeccion: any;
    public valorbarra: number;
    public tipobarra: string;


    constructor(
        private fb: FormBuilder,
        private servicio: SelPersonalService,
        injector: Injector
    ) {
        this.createForm();
        this.getDatosModelo();
    }

    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
    }

    setBarraProgreso() {
        let value = (this.respondidasSeccion * 100) / (this.totalSeccion * 1);
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

    createForm() {
        console.log("creando formulario");
        this.ifForm = this.fb.group({
            data: this.fb.group(new dataModel()),
            preg_100_tabla_2: this.fb.array([]),
            preg_100_tabla_3: this.fb.array([]),
        });
        console.log("fin creando formulario");
    }

    getValorElemento(elemento : string){
        return this.ifForm.get(elemento).value;
    }
    
    getPregunta (pregunta:string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };

    setPregunta(tabla: CriterioTipoInflu[], nombretabla:string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

     setPregunta2(tabla: CriterioGrupo[], nombretabla:string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    addFila(elemento: FormArray) {
        elemento.push(this.fb.group(new CriterioTipoInflu()));
    }
    
    removeFila(elemento: FormArray, i: number) {
        elemento.removeAt(i);
    }
    get data(): FormArray {
        return this.ifForm.get('data') as FormArray;
    };


    getDatosModelo(){
      this.servicio.getDatosModelo().subscribe(
            response => {
                console.log("datos formu"); 
                this.ifForm.setControl('data', this.fb.group(response.data));               
                this.setPregunta(response.preg_100_tabla_2,'preg_100_tabla_2');
                this.setPregunta2(response.preg_100_tabla_3,'preg_100_tabla_3');
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
}