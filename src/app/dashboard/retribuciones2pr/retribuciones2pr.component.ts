import { Component, ViewEncapsulation, Injector, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Retribuciones2PrService } from './retribuciones2pr.service';
import { Retribuciones2PrModel, Tabla5Model, Tabla3Model, dataModel } from './retribuciones2pr.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'retribuciones2pr',
    templateUrl: './retribuciones2pr.template.html',
    styleUrls: ['../../scss/notifications.style.scss',
        '../../scss/elements.style.scss'],
    providers: [Retribuciones2PrService, DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class Retribuciones2PrComponent implements OnInit {
    injector: Injector;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    iRow: number = 0;
    public modelo: Retribuciones2PrModel;
    public errorMessage: string;
    public status: string;
    public respondidasSeccion: any;
    public totalSeccion: any;
    public max: number = 100;
    public showWarning: boolean;
    public dynamic: number;
    public type: string;
    public mujerestotal: number = 0;
    public hombrestotal: number = 0;

    constructor(private router: Router,
        private fb: FormBuilder,
        private servicio: Retribuciones2PrService,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector,
        private cdRef: ChangeDetectorRef
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.modelo = new Retribuciones2PrModel();
    }

    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        this.getDatosModelo();
    }
    ngAfterViewChecked() {
        //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
        this.cdRef.detectChanges();
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

    createForm() {
        this.ifForm = this.fb.group({
            data: this.fb.group(new dataModel()),
            preg_422_tabla_5: this.fb.array([]),
            preg_423_tabla_5: this.fb.array([]),
            preg_424_tabla_5: this.fb.array([]),
            preg_425_tabla_5: this.fb.array([]),
            preg_426_tabla_5: this.fb.array([]),
            preg_427_tabla_5: this.fb.array([]),
            preg_428_tabla_5: this.fb.array([]),
            preg_429_tabla_5: this.fb.array([]),
            preg_430_tabla_3: this.fb.array([]),

            preg_699_tabla_5: this.fb.array([]),
        });
    }

    setPregunta3(tabla: any, nombretabla: string) {
        const addressFGs = tabla.map(datos =>
            this.fb.group({
                texto: [datos.texto],
                respuesta: [datos.respuesta],
                mujeres: [datos.mujeres, CustomValidators.number],
                hombres: [datos.hombres, CustomValidators.number]
            }));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    setPregunta(tabla: any, nombretabla: string) {
        const addressFGs = tabla.map(datos =>
            this.fb.group({
                texto: [datos.texto],
                respuesta: [datos.respuesta],
                mujeres: [datos.mujeres, CustomValidators.number],
                hombres: [datos.hombres, CustomValidators.number],
                mujeres2: [datos.mujeres2, CustomValidators.number],
                hombres2: [datos.hombres2, CustomValidators.number]
            }));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    getPregunta(pregunta: string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };
    addFila(elemento: FormArray) {
        elemento.push(this.fb.group({
            texto: [''],
            respuesta: [''],
            mujeres: ['', CustomValidators.number],
            hombres: ['', CustomValidators.number],
            mujeres2: ['', CustomValidators.number],
            hombres2: ['', CustomValidators.number]
        }));
    }
    addFila3(elemento: FormArray) {
        elemento.push(this.fb.group({
            texto: [''],
            respuesta: [''],
            mujeres: ['', CustomValidators.number],
            hombres: ['', CustomValidators.number]
        }));
    }
    removeFila(elemento: FormArray, i: number, nombretabla: string) {
        elemento.removeAt(i);
        //let nueva = this.ifForm.value.preg_429_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos));
        let nueva = this.ifForm.value[nombretabla].map((datos) => Object.assign({}, datos));
        this.setPregunta(nueva, nombretabla);
    }
    getDatosModelo() {
        this.servicio.getDatosModelo().subscribe(
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
                    this.setPregunta(response.preg_422_tabla_5, 'preg_422_tabla_5');
                    this.setPregunta(response.preg_423_tabla_5, 'preg_423_tabla_5');
                    this.setPregunta(response.preg_424_tabla_5, 'preg_424_tabla_5');
                    this.setPregunta(response.preg_425_tabla_5, 'preg_425_tabla_5');
                    this.setPregunta(response.preg_426_tabla_5, 'preg_426_tabla_5');
                    this.setPregunta(response.preg_427_tabla_5, 'preg_427_tabla_5');
                    this.setPregunta(response.preg_428_tabla_5, 'preg_428_tabla_5');
                    this.setPregunta(response.preg_429_tabla_5, 'preg_429_tabla_5');
                    this.setPregunta3(response.preg_430_tabla_3, 'preg_430_tabla_3');

                    this.setPregunta(response.preg_699_tabla_5, 'preg_699_tabla_5');

                    this.respondidasSeccion = response.respondidasSeccion;
                    this.totalSeccion = response.totalSeccion;
                    this.valorBarraProgreso();
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
                        this.router.navigate(["/app/selpersonalpr"]);
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
    SumaMujeres() {
        return this.mujerestotal * 1;
    }
    SumaHombres() {
        return this.hombrestotal * 1;
    }
    SumaTotal() {
        return ((this.mujerestotal * 1) + (this.hombrestotal * 1));
    }
    getTotalMujeres(elemento: FormArray) {
        return elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1), 0);
    }
    getTotalHombres(elemento: FormArray) {
        return elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1), 0);
    }
    getTotalMujeres2(elemento: FormArray) {
        return elemento.value.map(c => c.mujeres2).reduce((sum, current) => (sum * 1) + (current * 1), 0);
    }
    getTotalHombres2(elemento: FormArray) {
        return elemento.value.map(c => c.hombres2).reduce((sum, current) => (sum * 1) + (current * 1), 0);
    }
    getTotalMujeresT5(elemento: FormArray) {
        let m1 = elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1), 0);
        let m2 = elemento.value.map(c => c.mujeres2).reduce((sum, current) => (sum * 1) + (current * 1), 0);
        /*console.log(m1 * 1 + m2 * 1);
        console.log(this.SumaMujeres());*/
        return (m1 * 1 + m2 * 1) != this.SumaMujeres();
    }

    getTotalHombresT5(elemento: FormArray) {
        let h1 = elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1), 0);
        let h2 = elemento.value.map(c => c.hombres2).reduce((sum, current) => (sum * 1) + (current * 1), 0);
        /*console.log(h1 * 1 + h2 * 1);
        console.log(this.SumaHombres());*/
        return (h1 * 1 + h2 * 1) != this.SumaHombres();
    }
    getTotalTotal(elemento: FormArray) {
        let hombres = elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1), 0);
        let mujeres = elemento.value.map(c => c.mujeres).reduce((sum, current) => (sum * 1) + (current * 1), 0);
        let hombres2 = elemento.value.map(c => c.hombres2).reduce((sum, current) => (sum * 1) + (current * 1), 0);
        let mujeres2 = elemento.value.map(c => c.mujeres2).reduce((sum, current) => (sum * 1) + (current * 1), 0);
        /*console.log(this.SumaTotal());
        console.log("sumando totales");*/
        return (hombres * 1 + mujeres * 1 + hombres2 * 1 + mujeres2 * 1) != this.SumaTotal();
    }

    CalculaValor(indice: any) {
        //console.log("el índice es:" + indice);
        let valor = 0;
        let valor1 = 0;
        let valor2 = 0;
        let valor3 = 0;
        switch (indice) {
            case 0:
                valor = this.getTotalMujeres(<FormArray>this.ifForm.get('preg_429_tabla_5'));
                valor1 = this.getTotalHombres(<FormArray>this.ifForm.get('preg_429_tabla_5'));
                valor2 = this.getTotalMujeres2(<FormArray>this.ifForm.get('preg_429_tabla_5'));
                valor3 = this.getTotalHombres2(<FormArray>this.ifForm.get('preg_429_tabla_5'));
                break;
            case 1:
                valor = this.getTotalMujeres(<FormArray>this.ifForm.get('preg_422_tabla_5'));
                valor1 = this.getTotalHombres(<FormArray>this.ifForm.get('preg_422_tabla_5'));
                valor2 = this.getTotalMujeres2(<FormArray>this.ifForm.get('preg_422_tabla_5'));
                valor3 = this.getTotalHombres2(<FormArray>this.ifForm.get('preg_422_tabla_5'));                
                break;
                case 2:
                valor = this.getTotalMujeres(<FormArray>this.ifForm.get('preg_423_tabla_5'));
                valor1 = this.getTotalHombres(<FormArray>this.ifForm.get('preg_423_tabla_5'));
                valor2 = this.getTotalMujeres2(<FormArray>this.ifForm.get('preg_423_tabla_5'));
                valor3 = this.getTotalHombres2(<FormArray>this.ifForm.get('preg_423_tabla_5'));                
                break;
                case 3:
                valor = this.getTotalMujeres(<FormArray>this.ifForm.get('preg_424_tabla_5')); 
                valor1 = this.getTotalHombres(<FormArray>this.ifForm.get('preg_424_tabla_5'));
                valor2 = this.getTotalMujeres2(<FormArray>this.ifForm.get('preg_424_tabla_5'));
                valor3 = this.getTotalHombres2(<FormArray>this.ifForm.get('preg_424_tabla_5'));               
                break;
                case 4:
                valor = this.getTotalMujeres(<FormArray>this.ifForm.get('preg_425_tabla_5'));
                valor1 = this.getTotalHombres(<FormArray>this.ifForm.get('preg_425_tabla_5'));
                valor2 = this.getTotalMujeres2(<FormArray>this.ifForm.get('preg_425_tabla_5'));
                valor3 = this.getTotalHombres2(<FormArray>this.ifForm.get('preg_425_tabla_5'));                
                break;
                case 5:
                valor = this.getTotalMujeres(<FormArray>this.ifForm.get('preg_426_tabla_5'));
                valor1 = this.getTotalHombres(<FormArray>this.ifForm.get('preg_426_tabla_5'));
                valor2 = this.getTotalMujeres2(<FormArray>this.ifForm.get('preg_426_tabla_5'));
                valor3 = this.getTotalHombres2(<FormArray>this.ifForm.get('preg_426_tabla_5'));                
                break;
                case 6:
                valor = this.getTotalMujeres(<FormArray>this.ifForm.get('preg_427_tabla_5')); 
                valor1 = this.getTotalHombres(<FormArray>this.ifForm.get('preg_427_tabla_5'));
                valor2 = this.getTotalMujeres2(<FormArray>this.ifForm.get('preg_427_tabla_5'));
                valor3 = this.getTotalHombres2(<FormArray>this.ifForm.get('preg_427_tabla_5'));               
                break;
                case 7:
                valor = this.getTotalMujeres(<FormArray>this.ifForm.get('preg_428_tabla_5'));
                valor1 = this.getTotalHombres(<FormArray>this.ifForm.get('preg_428_tabla_5'));
                valor2 = this.getTotalMujeres2(<FormArray>this.ifForm.get('preg_428_tabla_5'));
                valor3 = this.getTotalHombres2(<FormArray>this.ifForm.get('preg_428_tabla_5'));                
                break;
        }
        if (!isNaN(valor)){
            (<FormGroup>(<FormArray>this.ifForm.get('preg_699_tabla_5')).controls[indice]).controls['mujeres'].setValue(valor);
        }
        if (!isNaN(valor1)){
            (<FormGroup>(<FormArray>this.ifForm.get('preg_699_tabla_5')).controls[indice]).controls['hombres'].setValue(valor1);
        }
        if (!isNaN(valor2)){
            (<FormGroup>(<FormArray>this.ifForm.get('preg_699_tabla_5')).controls[indice]).controls['mujeres2'].setValue(valor2);
        }
        if (!isNaN(valor3)){
            (<FormGroup>(<FormArray>this.ifForm.get('preg_699_tabla_5')).controls[indice]).controls['hombres2'].setValue(valor3);
        }
        /*let valor_1 = (<FormGroup>(<FormArray>this.ifForm.get('preg_422_tabla_5')).controls[indice]).controls['mujeres'].value;
        let valor_2 = (<FormGroup>(<FormArray>this.ifForm.get('preg_423_tabla_5')).controls[indice]).controls['mujeres'].value;
        let valor_3 = (<FormGroup>(<FormArray>this.ifForm.get('preg_424_tabla_5')).controls[indice]).controls['mujeres'].value;
        let valor_4 = (<FormGroup>(<FormArray>this.ifForm.get('preg_425_tabla_5')).controls[indice]).controls['mujeres'].value;
        let valor_5 = (<FormGroup>(<FormArray>this.ifForm.get('preg_426_tabla_5')).controls[indice]).controls['mujeres'].value;
        let valor_6 = (<FormGroup>(<FormArray>this.ifForm.get('preg_427_tabla_5')).controls[indice]).controls['mujeres'].value;
        let valor_7 = (<FormGroup>(<FormArray>this.ifForm.get('preg_428_tabla_5')).controls[indice]).controls['mujeres'].value;
        let valor_8 = (<FormGroup>(<FormArray>this.ifForm.get('preg_429_tabla_5')).controls[indice]).controls['mujeres'].value;
        let totalm = valor_1 * 1 + valor_2 * 1 + valor_3 * 1+ valor_4 * 1+valor_5 * 1+valor_6 * 1+valor_7 * 1+valor_8 * 1;
        if (!isNaN(totalm))
            (<FormGroup>(<FormArray>this.ifForm.get('preg_699_tabla_5')).controls[indice]).controls['mujeres'].setValue(totalm);*/
    }

    preparaParaGuardar(): any {
        const formModel = this.ifForm.value;
        const datacuestionario: dataModel = formModel.data;
        const saveModelo: any = {
            data: datacuestionario,
            preg_422_tabla_5: formModel.preg_422_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_423_tabla_5: formModel.preg_423_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_424_tabla_5: formModel.preg_424_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_425_tabla_5: formModel.preg_425_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_426_tabla_5: formModel.preg_426_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_427_tabla_5: formModel.preg_427_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_428_tabla_5: formModel.preg_428_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_429_tabla_5: formModel.preg_429_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_430_tabla_3: formModel.preg_430_tabla_3.map((datos: Tabla3Model) => Object.assign({}, datos)),

            preg_699_tabla_5: formModel.preg_699_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
        };
        return saveModelo;
    }

}
