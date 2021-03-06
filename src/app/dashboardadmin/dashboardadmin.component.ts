import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { AppConfig } from '../app.config';
import { Router } from '@angular/router';
import { DashBoardAdminModel, UserAdminModel,UserFormModel } from './dashboardadmin.model';
import { DashBoardAdminService } from "./dashboardadmin.service";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

declare var Messenger: any;
declare var jQuery: any;

@Component({
  selector: 'dashboardadmin',
  templateUrl: './dashboardadmin.template.html',
  styleUrls: ['./dashboardadmin.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardAdmin implements OnInit {
  config: any;
  month: any;
  year: any;

  ifForm: FormGroup;

  public errorMessage: string;
  public status: string;
  public data: any[];

  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;
  public muestrausu: boolean = false;
  public accion: number;
  public ususel: UserFormModel;
  public tiposcuest:any[] = [{"id":1, "nombre":"Emp. Pública"},{"id":2, "nombre":"Emp. Privada"}];
  domSharedStylesHost: any;

  constructor(
    config: AppConfig,
    public router: Router,
    private dashboardadminservice: DashBoardAdminService,
    private AuthService: AuthService,
    private fb: FormBuilder,
    injector: Injector) {
    this.config = config.getConfig();
    this.AuthService.tipocuest = 0;
    this.creaFormUsuario();
  }

  creaFormUsuario() {
    this.ifForm = this.fb.group({
      id: 0,
      user: 0,
      cuest: 1,
      fecha_ini: '',
      fecha_fin: '',
      nomUsu: '',
      Personal: '',
      apellidos: ''
    });
    console.log(this.ifForm);
  }


  ngOnInit(): void {

    let now = new Date();
    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();
    Messenger.options = { theme: 'air' };
    this.getDatos();
  }


  getDatos(){
    this.dashboardadminservice.getCuestionarios().subscribe(
      response => {
        /*copio user a name */
        let prueba = response.data;
        for (var item in prueba) {          
          prueba[item].name = prueba[item].nomUsu + ' ' + prueba[item].apellidos;          
        }
        this.data = prueba.filter(item => item.estado !== "BAJA")
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
      }
    );
  }

  onSubmit(model: DashBoardAdminModel) {
    console.log("enviando formulario");
    console.log(this.ifForm.value);
    this.dashboardadminservice.altaUsuario(this.ifForm.value).subscribe(
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
                  console.log("hecho");
                     this.ifForm.markAsPristine();
                    this.muestrausu = false;
                    /* let datos = this.data.find(x=>x.user == this.ifForm.value.user_id);
                    datos.name = this.ifForm.value.nombre + " " + this.ifForm.value.apellidos; */
                    Messenger().post({
                        message: 'Los datos han sido guardados correctamente',
                        type: 'success',
                        showCloseButton: true
                    }); 
                      this.getDatos();
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

  
  getDatosUsuario(usuario: DashBoardAdminModel) {
    this.dashboardadminservice.getDatosUsuario(usuario).subscribe(
      response => {
        this.ususel = response.data;
        this.ususel.password = "";
        this.ususel.repitepassword = "";
        this.ususel.domicilio = "";
        this.ususel.cuest = usuario.cuest;
        this.ifForm = this.fb.group(this.ususel);
        this.muestrausu = true;
        this.accion = 2; //accion 2 = modificar
        console.log("parsely");
        setTimeout(() => jQuery('.parsleyjs').parsley(), 1000);

        ;
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
      }
    );

    



  }
nuevoUsuario(){
        this.ususel = new UserFormModel();
        this.ususel.password = "";
        this.ususel.repitepassword = "";
        this.ususel.domicilio = "";
        this.ifForm = this.fb.group(this.ususel);
        this.muestrausu = true;
        this.accion = 1;
      setTimeout(() => jQuery('.parsleyjs').parsley(), 1000);
    }
  

  cancelModifUsu() {
    this.muestrausu = false;
  }

  prueba(): void {
    console.log("seleccionado usuario");
  }

  bajaCuestionario(persona: DashBoardAdminModel) {

    if (window.confirm('¿Vas a cerrar el cuestionario, estás seguro?')) {
      this.bajaCuestionarioConfirmed(persona.user.toString());
    }
  }

  altaCuestionario(persona: DashBoardAdminModel) {

    if (window.confirm('¿Vas a abrir de nuevo el cuestionario, estás seguro?')) {
      this.altaCuestionarioConfirmed(persona.user.toString());
    }
  }

  borraUsuario(persona: DashBoardAdminModel) {

    if (window.confirm('¿Vas a eliminar el usuario, estás seguro?')) {
      this.borraUsuarioConfirmed(persona.user.toString());
    }
  }


  altaCuestionarioConfirmed(idusu: string){
    this.dashboardadminservice.altaCuestionario(idusu).subscribe(
      response => {
        if (response.status == "success") {
          let registro = this.data.find(x=>x.user == idusu);
          registro.fecha_fin = null;
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
      }
    );
  }
  bajaCuestionarioConfirmed(idusu: string){
    this.dashboardadminservice.bajaCuestionario(idusu).subscribe(
      response => {
        if (response.status == "success") {
          let registro = this.data.find(x=>x.user == idusu);
          registro.fecha_fin = "cerrado";
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
      }
    );
  }

  borraUsuarioConfirmed(idusu) {
    this.dashboardadminservice.borraUsuario(idusu).subscribe(
      response => {
        if (response.status == "success") {
          this.data.splice(this.data.indexOf(x=>x.user == idusu));
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
      }
    );
  }

  onSelect(persona: DashBoardAdminModel) {
    console.log("seleccionado usuario");
    this.AuthService.tipocuest = persona.cuest;
    this.AuthService.usucuest = persona.user;
    console.log("tipocuest");
    console.log(this.AuthService.tipocuest);
    let redirect = '';
    localStorage.setItem('usuariocuest', persona.user.toString());
    if (persona.cuest == 1) {
      redirect = this.config.urlpestanapublic;
    }
    else if (persona.cuest == 2) {
      redirect = this.config.urlpestanaprivate;
    }
    this.router.navigate([redirect]);
  }
}