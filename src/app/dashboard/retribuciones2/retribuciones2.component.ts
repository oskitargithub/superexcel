import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Retribuciones2Service } from './retribuciones2.service';
import { Retribuciones2Model, Tabla5Model, Tabla3Model } from './retribuciones2.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'retribuciones2',
  templateUrl: './retribuciones2.template.html',
  styleUrls: [
    '../../scss/elements.style.scss',
    '../../scss/notifications.style.scss'],
  providers: [Retribuciones2Service],
  encapsulation: ViewEncapsulation.None,
})
export class Retribuciones2Component implements OnInit {
  injector: Injector;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  ifForm: FormGroup;
  public modelo: Retribuciones2Model;
  public errorMessage: string;
  public status: string;

  constructor(
    private fb: FormBuilder,
    private servicio: Retribuciones2Service,
    injector: Injector
  ) {
    this.createForm();
    this.modelo = new Retribuciones2Model();
    this.getDatosModelo();
  }

  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
  }



  createForm() {
        console.log("creando formulario");
        this.ifForm = this.fb.group({
            preg_60_tabla_5: this.fb.array([]),
            preg_61_tabla_5: this.fb.array([]),
            preg_62_tabla_5: this.fb.array([]),
            preg_63_tabla_5: this.fb.array([]),
            preg_64_tabla_5: this.fb.array([]),
            preg_65_tabla_5: this.fb.array([]),
            preg_66_tabla_5: this.fb.array([]),            
            preg_68_tabla_5: this.fb.array([]),            
            preg_67_tabla_3: this.fb.array([]),
        });
        console.log("fin creando formulario");
    }

    setPregunta(tabla: Tabla5Model[], nombretabla:string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    setPregunta3(tabla: Tabla3Model[], nombretabla:string) {
        const addressFGs = tabla.map(datos => this.fb.group(datos));
        const addressFormArray = this.fb.array(addressFGs);
        this.ifForm.setControl(nombretabla, addressFormArray);
    }

    getPregunta (pregunta:string): FormArray {
        return this.ifForm.get(pregunta) as FormArray;
    };
    addFila(elemento: FormArray) {
        elemento.push(this.fb.group(new Tabla5Model()));
    }
    addFila3(elemento: FormArray) {
        elemento.push(this.fb.group(new Tabla3Model()));
    }
    removeFila(elemento: FormArray, i: number) {
        elemento.removeAt(i);
    }
    getDatosModelo(){
      this.servicio.getDatosModelo().subscribe(
            response => {
                console.log("datos formu");                
                this.setPregunta(response.preg_60_tabla_5,'preg_60_tabla_5');
                this.setPregunta(response.preg_61_tabla_5,'preg_61_tabla_5');
                this.setPregunta(response.preg_62_tabla_5,'preg_62_tabla_5');
                this.setPregunta(response.preg_63_tabla_5,'preg_63_tabla_5');
                this.setPregunta(response.preg_64_tabla_5,'preg_64_tabla_5');
                this.setPregunta(response.preg_65_tabla_5,'preg_65_tabla_5');
                this.setPregunta(response.preg_66_tabla_5,'preg_66_tabla_5');
                this.setPregunta(response.preg_68_tabla_5,'preg_68_tabla_5');
                this.setPregunta3(response.preg_67_tabla_3,'preg_67_tabla_3');
                
                this.setPregunta(response.preg_69_tabla_5,'preg_69_tabla_5');
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
