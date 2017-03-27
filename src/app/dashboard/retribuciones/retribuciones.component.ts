import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RetribucionesService } from './retribuciones.service';
import { RetribucionesModel, Tabla6Model } from './retribuciones.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'retribuciones',
  templateUrl: './retribuciones.template.html',
  styleUrls: [
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [RetribucionesService],
  encapsulation: ViewEncapsulation.None,
})
export class RetribucionesComponent implements OnInit {
  injector: Injector;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  ifForm: FormGroup;
  public modelo: RetribucionesModel;
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
    private servicio: RetribucionesService,
    injector: Injector
  ) {
      this.dynamic = 20;
        this.respondidasSeccion = 0;
        this.totalSeccion = 0;
    this.createForm();
    this.modelo = new RetribucionesModel();
    this.getDatosModelo();
  }

  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
  }
  valorBarraProgreso() {
        this.respondidasSeccion = 18;
        this.totalSeccion = 20;
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
        this.dynamic = value;
        this.type = type;
    }


  createForm() {
        console.log("creando formulario");
        this.ifForm = this.fb.group({
            preg_49_tabla_6: this.fb.array([]),
            preg_50_tabla_6: this.fb.array([]),
            preg_51_tabla_6: this.fb.array([]),
            preg_52_tabla_6: this.fb.array([]),
            preg_53_tabla_6: this.fb.array([]),
            preg_54_tabla_6: this.fb.array([]),
            preg_55_tabla_6: this.fb.array([]),
        });
        console.log("fin creando formulario");
    }

    setPregunta(tabla: Tabla6Model[], nombretabla:string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    getPregunta (pregunta:string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };

    getDatosModelo(){
      this.servicio.getDatosModelo().subscribe(
            response => {
                console.log("datos formu");
                this.setPregunta(response.preg_49_tabla_6,'preg_49_tabla_6');
                this.setPregunta(response.preg_50_tabla_6,'preg_50_tabla_6');
                this.setPregunta(response.preg_51_tabla_6,'preg_51_tabla_6');
                this.setPregunta(response.preg_52_tabla_6,'preg_52_tabla_6');
                this.setPregunta(response.preg_53_tabla_6,'preg_53_tabla_6');
                this.setPregunta(response.preg_54_tabla_6,'preg_54_tabla_6');
                this.setPregunta(response.preg_55_tabla_6,'preg_55_tabla_6');

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

}
