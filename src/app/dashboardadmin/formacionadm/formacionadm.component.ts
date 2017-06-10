import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { FormacionAdmService } from './formacionadm.service';
import { FuncionesService } from '../serviciofunciones/funciones.service';
import { FormacionModel, Tabla3Model } from '../../dashboard/formacion/formacion.model';
import { FuncionesHighChartsT3Service } from '../serviciofunciones/funcioneshighchartst3.service';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var Messenger: any;


@Component({
    selector: 'formacionadm',
    templateUrl: './Formacionadm.template.html',
    styleUrls: ['Formacionadm.style.css',
        '../../scss/elements.style.scss',
        '../../scss/notifications.style.scss'],
    providers: [FormacionAdmService, FuncionesService, FuncionesHighChartsT3Service],
    encapsulation: ViewEncapsulation.None,
})
export class FormacionAdmComponent implements OnInit {
    injector: Injector;
    submitted = false;
    config: any;
    public modelo: FormacionModel;
    public errorMessage: string;
    public status: string;

    //{ Datos gráficas
    public chart1options: Object;
    public chart2options: Object;
    public chart3options: Object;
    public chart4options: Object;
    public chart5options: Object;
    public chart6options: Object;
    public chart7options: Object;
    public chart8options: Object;
    public chart9options: Object;
    public chart10options: Object;

    public chart1pieoptions: Object;
    public chart2pieoptions: Object;
    public chart3pieoptions: Object;
    public chart4pieoptions: Object;

    

    
    //}

    constructor(
        private servicio: FormacionAdmService,
        public funciones: FuncionesService,
        config: AppConfig,
        private AuthService: AuthService,
        public funccioneshct3: FuncionesHighChartsT3Service,
        public router: Router,
        injector: Injector
    ) {
        this.config = config.getConfig();
        if (this.AuthService.usucuest == 0) {
            let redirect = this.config.urladmin;
            this.router.navigate([redirect]);
        }
        this.modelo = new FormacionModel();

    }
    ngOnInit(): void {
        Messenger.options = { theme: 'air' };
        this.getDatosModelo();
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
                    this.modelo = response;
                    console.log("datos");
                    console.log(this.modelo);
                    this.asignaDatosGraficas();
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

    asignaDatosGraficas() {
        this.chart1options = this.funccioneshct3.GraficaCompuesta1('Personas beneficiadas por tipo de formación', '', this.modelo.preg_199_tabla_3, "fila");
        this.chart2options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Personas beneficiadas por tipo de formación', 'Proporcionada', this.modelo.preg_199_tabla_3);

        this.chart3options = this.funccioneshct3.GraficaCompuesta1('Personas beneficiarias de la formación por categoria profesional', '', this.modelo.preg_200_tabla_3, "fila");
        this.chart4options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Personas beneficiarias de la formación por categoria profesional', 'Proporcionada', this.modelo.preg_200_tabla_3);

        this.chart5options = this.funccioneshct3.GraficaCompuesta1('Posibilidad de recibir formación que no esté directamente relacionada con el puesto de trabajo', '', this.modelo.preg_195_tabla_3, "fila");
        this.chart6options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Posibilidad de recibir formación que no esté directamente relacionada con el puesto de trabajo', 'Proporcionada', this.modelo.preg_195_tabla_3);

        this.chart7options = this.funccioneshct3.GraficaCompuesta1('Personas beneficiarias de la formación por categoria profesional', '', this.modelo.preg_174_tabla_3, "fila");
        this.chart8options = this.funccioneshct3.GraficaCompuesta1Proporcionada('Personas beneficiarias de la formación por categoria profesional', 'Proporcionada', this.modelo.preg_174_tabla_3);

        if(this.modelo.preg_174_tabla_3[0]!= undefined)
        this.chart1pieoptions = this.funccioneshct3.GraficaPieHM("Ayudas formación externa",this.modelo.preg_174_tabla_3[0].mujeres,this.modelo.preg_174_tabla_3[0].hombres);
        if(this.modelo.preg_174_tabla_3[1]!= undefined)
        this.chart4pieoptions = this.funccioneshct3.GraficaPieHM("Formación en igualdad de género",this.modelo.preg_174_tabla_3[1].mujeres,this.modelo.preg_174_tabla_3[1].hombres);

        this.chart2pieoptions = this.funccioneshct3.GraficaPieCompuesta1("Personas beneficiarias de la formación por categoria profesional","Mujeres",this.modelo.preg_200_tabla_3,"fila");
        this.chart3pieoptions = this.funccioneshct3.GraficaPieCompuesta2("Personas beneficiarias de la formación por categoria profesional","Hombres",this.modelo.preg_200_tabla_3,"total");
        
        
    }


    

    getTotalCompoPlantilla() {
        if (this.modelo.preg_174_tabla_3 != null && this.modelo.preg_174_tabla_3[0]!= undefined) {
            let salida = this.modelo.preg_174_tabla_3[0].mujeres * 1 + this.modelo.preg_174_tabla_3[0].hombres * 1;
            if (!isNaN(salida))
                return salida;
            else
                return 0;
        }
        else {
            return 0;
        }
    }
    getTotalCompoPlantilla2() {
        
        if (this.modelo.preg_174_tabla_3 != null && this.modelo.preg_174_tabla_3[1]!= undefined) {
            let salida = this.modelo.preg_174_tabla_3[1].mujeres * 1 + this.modelo.preg_174_tabla_3[1].hombres * 1;
            if (!isNaN(salida))
                return salida;
            else
                return 0;
        }
        else {
            return 0;
        }
    }
    getMujeresPlantilla() {
        if (this.modelo.preg_174_tabla_3 != null && this.modelo.preg_174_tabla_3[0]!= undefined) {
            let salida = this.modelo.preg_174_tabla_3[0].mujeres * 1;
            if (!isNaN(salida))
                return salida;
            else
                return 0;
        }
        else {
            return 0;
        }
    }
    getMujeresPlantilla2() {
        if (this.modelo.preg_174_tabla_3 != null && this.modelo.preg_174_tabla_3[1]!= undefined) {
            let salida = this.modelo.preg_174_tabla_3[1].mujeres * 1;
            if (!isNaN(salida))
                return salida;
            else
                return 0;
        }
        else {
            return 0;
        }
    }
    getMujeresPlantillaPorcentaje() {
        if (this.modelo.preg_174_tabla_3 != null && this.modelo.preg_174_tabla_3[0]!= undefined) {
            let salida = (this.modelo.preg_174_tabla_3[0].mujeres * 1) * 100 / ((this.modelo.preg_174_tabla_3[0].mujeres * 1 + this.modelo.preg_174_tabla_3[0].hombres * 1));
            if (!isNaN(salida))
                return salida;
            else
                return 0;
        }
        else {
            return 0;
        }
    }
    getMujeresPlantillaPorcentaje2() {
        if (this.modelo.preg_174_tabla_3 != null && this.modelo.preg_174_tabla_3[1]!= undefined) {
            let salida = (this.modelo.preg_174_tabla_3[1].mujeres * 1) * 100 / ((this.modelo.preg_174_tabla_3[1].mujeres * 1 + this.modelo.preg_174_tabla_3[1].hombres * 1));
            if (!isNaN(salida))
                return salida;
            else
                return 0;
        }
        else {
            return 0;
        }
    }

    getHombresPlantilla() {
        if (this.modelo.preg_174_tabla_3 != null && this.modelo.preg_174_tabla_3[0]!= undefined) {
            let salida = this.modelo.preg_174_tabla_3[0].hombres * 1;
            if (!isNaN(salida))
                return salida;
            else
                return 0;
        }
        else {
            return 0;
        }
    }
    getHombresPlantilla2() {
        if (this.modelo.preg_174_tabla_3 != null && this.modelo.preg_174_tabla_3[1]!= undefined) {
            let salida = this.modelo.preg_174_tabla_3[1].hombres * 1;
            if (!isNaN(salida))
                return salida;
            else
                return 0;
        }
        else {
            return 0;
        }
    }

    getHombresPlantillaPorcentaje() {
        if (this.modelo.preg_174_tabla_3 != null && this.modelo.preg_174_tabla_3[0]!= undefined) {
            let salida = (this.modelo.preg_174_tabla_3[0].hombres * 1) * 100 / ((this.modelo.preg_174_tabla_3[0].mujeres * 1) + (this.modelo.preg_174_tabla_3[0].hombres * 1));
            if (!isNaN(salida))
                return salida;
            else
                return 0;
        }
        else {
            return 0;
        }
    }
    getHombresPlantillaPorcentaje2() {
        if (this.modelo.preg_174_tabla_3 != null && this.modelo.preg_174_tabla_3[1]!= undefined) {
            let salida = (this.modelo.preg_174_tabla_3[1].hombres * 1) * 100 / ((this.modelo.preg_174_tabla_3[1].mujeres * 1) + (this.modelo.preg_174_tabla_3[1].hombres * 1));
            if (!isNaN(salida))
                return salida;
            else
                return 0;
        }
        else {
            return 0;
        }
    }
}