import { Component, ViewEncapsulation, Injector, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { RetribucionesPrService } from './retribucionespr.service';
import { RetribucionesPrModel, Tabla5Model } from './retribucionespr.model';
import { CustomValidators } from 'ng2-validation';
import { DashBoardFormErrorsService } from '../dashboard.formerrors.service';
import 'rxjs/util/isNumeric';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'retribucionespr',
    templateUrl: './retribucionespr.template.html',
    styleUrls: [
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [RetribucionesPrService, DashBoardFormErrorsService],
    encapsulation: ViewEncapsulation.None,
})
export class RetribucionesPrComponent implements OnInit {
    injector: Injector;
    colorOptions: Object = { color: '#f0b518' };
    submitted = false;
    ifForm: FormGroup;
    public modelo: RetribucionesPrModel;
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
        private servicio: RetribucionesPrService,
        private serviceErrores: DashBoardFormErrorsService,
        injector: Injector,
        private cdRef: ChangeDetectorRef
    ) {
        this.dynamic = 0;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
        this.createForm();
        this.modelo = new RetribucionesPrModel();
        //this.getDatosModelo();
    }
    ngAfterViewChecked() {
        //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
        this.cdRef.detectChanges();
    }
    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        this.getDatosModeloProf1();
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
        console.log(m1 * 1 + m2 * 1);
        console.log(this.SumaMujeres());
        return (m1 * 1 + m2 * 1) != this.SumaMujeres();
    }

    getTotalHombresT5(elemento: FormArray) {
        let h1 = elemento.value.map(c => c.hombres).reduce((sum, current) => (sum * 1) + (current * 1), 0);
        let h2 = elemento.value.map(c => c.hombres2).reduce((sum, current) => (sum * 1) + (current * 1), 0);
        console.log(h1 * 1 + h2 * 1);
        console.log(this.SumaHombres());
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

    SumaMujeres() {
        return this.mujerestotal * 1;
    }
    SumaHombres() {
        return this.hombrestotal * 1;
    }
    SumaTotal() {
        return ((this.mujerestotal * 1) + (this.hombrestotal * 1));
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
            preg_415_tabla_5: this.fb.array([]),
            preg_416_tabla_5: this.fb.array([]),
            preg_417_tabla_5: this.fb.array([]),
            preg_418_tabla_5: this.fb.array([]),
            preg_419_tabla_5: this.fb.array([]),
            preg_420_tabla_5: this.fb.array([]),
            preg_421_tabla_5: this.fb.array([]),
        });
    }

    CalculaValor(indice: any) {
        //console.log("calculando valor de " + indice);
        //console.log(this.ifForm.get('preg_415_tabla_5'));
        let valor_a1 = (<FormGroup>(<FormArray>this.ifForm.get('preg_416_tabla_5')).controls[indice]).controls['mujeres'].value;
        let valor_a2 = (<FormGroup>(<FormArray>this.ifForm.get('preg_417_tabla_5')).controls[indice]).controls['mujeres'].value;
        let valor_b = (<FormGroup>(<FormArray>this.ifForm.get('preg_418_tabla_5')).controls[indice]).controls['mujeres'].value;
        let valor_c1 = (<FormGroup>(<FormArray>this.ifForm.get('preg_419_tabla_5')).controls[indice]).controls['mujeres'].value;
        let valor_c2 = (<FormGroup>(<FormArray>this.ifForm.get('preg_420_tabla_5')).controls[indice]).controls['mujeres'].value;
        let valor_e = (<FormGroup>(<FormArray>this.ifForm.get('preg_421_tabla_5')).controls[indice]).controls['mujeres'].value;
        let totalm = valor_a1 * 1 + valor_a2 * 1 + valor_b * 1 + valor_c1 * 1 + valor_c2 * 1 + valor_e * 1;
        if (!isNaN(totalm))
            (<FormGroup>(<FormArray>this.ifForm.get('preg_415_tabla_5')).controls[indice]).controls['mujeres'].setValue(totalm);

        valor_a1 = (<FormGroup>(<FormArray>this.ifForm.get('preg_416_tabla_5')).controls[indice]).controls['hombres'].value;
        valor_a2 = (<FormGroup>(<FormArray>this.ifForm.get('preg_417_tabla_5')).controls[indice]).controls['hombres'].value;
        valor_b = (<FormGroup>(<FormArray>this.ifForm.get('preg_418_tabla_5')).controls[indice]).controls['hombres'].value;
        valor_c1 = (<FormGroup>(<FormArray>this.ifForm.get('preg_419_tabla_5')).controls[indice]).controls['hombres'].value;
        valor_c2 = (<FormGroup>(<FormArray>this.ifForm.get('preg_420_tabla_5')).controls[indice]).controls['hombres'].value;
        valor_e = (<FormGroup>(<FormArray>this.ifForm.get('preg_421_tabla_5')).controls[indice]).controls['hombres'].value;
        let totalh = valor_a1 * 1 + valor_a2 * 1 + valor_b * 1 + valor_c1 * 1 + valor_c2 * 1 + valor_e * 1;
        if (!isNaN(totalh))
            (<FormGroup>(<FormArray>this.ifForm.get('preg_415_tabla_5')).controls[indice]).controls['hombres'].setValue(totalh);


        valor_a1 = (<FormGroup>(<FormArray>this.ifForm.get('preg_416_tabla_5')).controls[indice]).controls['mujeres2'].value;
        valor_a2 = (<FormGroup>(<FormArray>this.ifForm.get('preg_417_tabla_5')).controls[indice]).controls['mujeres2'].value;
        valor_b = (<FormGroup>(<FormArray>this.ifForm.get('preg_418_tabla_5')).controls[indice]).controls['mujeres2'].value;
        valor_c1 = (<FormGroup>(<FormArray>this.ifForm.get('preg_419_tabla_5')).controls[indice]).controls['mujeres2'].value;
        valor_c2 = (<FormGroup>(<FormArray>this.ifForm.get('preg_420_tabla_5')).controls[indice]).controls['mujeres2'].value;
        valor_e = (<FormGroup>(<FormArray>this.ifForm.get('preg_421_tabla_5')).controls[indice]).controls['mujeres2'].value;
        let totalm2 = valor_a1 * 1 + valor_a2 * 1 + valor_b * 1 + valor_c1 * 1 + valor_c2 * 1 + valor_e * 1;
        if (!isNaN(totalm2))
            (<FormGroup>(<FormArray>this.ifForm.get('preg_415_tabla_5')).controls[indice]).controls['mujeres2'].setValue(totalm2);

        valor_a1 = (<FormGroup>(<FormArray>this.ifForm.get('preg_416_tabla_5')).controls[indice]).controls['hombres2'].value;
        valor_a2 = (<FormGroup>(<FormArray>this.ifForm.get('preg_417_tabla_5')).controls[indice]).controls['hombres2'].value;
        valor_b = (<FormGroup>(<FormArray>this.ifForm.get('preg_418_tabla_5')).controls[indice]).controls['hombres2'].value;
        valor_c1 = (<FormGroup>(<FormArray>this.ifForm.get('preg_419_tabla_5')).controls[indice]).controls['hombres2'].value;
        valor_c2 = (<FormGroup>(<FormArray>this.ifForm.get('preg_420_tabla_5')).controls[indice]).controls['hombres2'].value;
        valor_e = (<FormGroup>(<FormArray>this.ifForm.get('preg_421_tabla_5')).controls[indice]).controls['hombres2'].value;
        let totalh2 = valor_a1 * 1 + valor_a2 * 1 + valor_b * 1 + valor_c1 * 1 + valor_c2 * 1 + valor_e * 1;
        if (!isNaN(totalh2))
            (<FormGroup>(<FormArray>this.ifForm.get('preg_415_tabla_5')).controls[indice]).controls['hombres2'].setValue(totalh2);


        //(this.ifForm.controls['preg_415_tabla_5'][indice]).mujeres.value = 12;
    }

    setPregunta(tabla: Tabla5Model[], nombretabla: string) {
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

    getDatosModeloProf1() {
        this.servicio.getDatosModeloProf1()
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
                    this.mujerestotal = response.data.preg_46;
                    this.hombrestotal = response.data.preg_47;
                    this.getDatosModelo();
                    console.log("El total da" + this.SumaTotal());
                    /*Messenger().post({
                        message: 'Los datos han sido cargados correctamente',
                        type: 'success',
                        showCloseButton: true
                    });*/
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
                    this.setPregunta(response.preg_415_tabla_5, 'preg_415_tabla_5');
                    this.setPregunta(response.preg_416_tabla_5, 'preg_416_tabla_5');
                    this.setPregunta(response.preg_417_tabla_5, 'preg_417_tabla_5');
                    this.setPregunta(response.preg_418_tabla_5, 'preg_418_tabla_5');
                    this.setPregunta(response.preg_419_tabla_5, 'preg_419_tabla_5');
                    this.setPregunta(response.preg_420_tabla_5, 'preg_420_tabla_5');
                    this.setPregunta(response.preg_421_tabla_5, 'preg_421_tabla_5');

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
                        this.router.navigate(["/app/retribuciones2pr"]);
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

    preparaParaGuardar(): RetribucionesPrModel {
        const formModel = this.ifForm.value;
        const saveModelo: any = {
            preg_415_tabla_5: formModel.preg_415_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_416_tabla_5: formModel.preg_416_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_417_tabla_5: formModel.preg_417_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_418_tabla_5: formModel.preg_418_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_419_tabla_5: formModel.preg_419_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_420_tabla_5: formModel.preg_420_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
            preg_421_tabla_5: formModel.preg_421_tabla_5.map((datos: Tabla5Model) => Object.assign({}, datos)),
        };
        return saveModelo;
    }
}
