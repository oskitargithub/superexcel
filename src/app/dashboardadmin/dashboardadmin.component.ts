import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { AppConfig } from '../app.config';
import { Router} from '@angular/router';
import {DashBoardAdminModel, UserAdminModel} from './dashboardadmin.model';
import {DashBoardAdminService} from "./dashboardadmin.service";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth/auth.service';

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
  public data:  any[];
  
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;
  public muestrausu: boolean = false;
  public ususel : UserAdminModel;
 
 domSharedStylesHost: any;

  constructor(
    config: AppConfig, 
    public router: Router, 
    private dashboardadminservice:DashBoardAdminService, 
    private AuthService: AuthService, 
    private fb: FormBuilder,
    injector: Injector) 
  {
      this.config = config.getConfig();   
      this.creaFormUsuario(); 
  }
 
  creaFormUsuario(){
    this.ifForm = this.fb.group({
     id: 0,
     user:0,
     cuest:0,
     fecha_ini:'',
     fecha_fin: '',
     nomUsu:'',
     Personal:'',
     apellidos:''
    });
    console.log(this.ifForm);
    }

 
  ngOnInit(): void {
    
    let now = new Date();
    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();    
    Messenger.options = { theme: 'air' };
     
    


    this.dashboardadminservice.getCuestionarios().subscribe(
      response => { 
        /*copio user a name */
        let prueba = response.data;
        for(var item in prueba){         
          prueba[item].name = prueba[item].nomUsu + ' ' + prueba[item].apellidos;
        }
        
        this.data = prueba;

        
      },
      error => {
        this.errorMessage = <any>error;
					if(this.errorMessage !== null){
                                          
                        Messenger().post({
                            message: 'Ha ocurrido un error en la petición.' + this.errorMessage,
                            type: 'error',
                            showCloseButton: true
                        });
					
					}
      }
     );
  }

  onSubmit(model:DashBoardAdminModel){
     Messenger().post({
                            message: 'Los datos han sido guardados correctamente',
                            type: 'success',
                            showCloseButton: true
                        });
    console.log(model);
    this.muestrausu=false;
  }

  getDatosUsuario(usuario: DashBoardAdminModel){    
    this.dashboardadminservice.getDatosUsuario(usuario).subscribe(
      response => { 
        this.ususel = response.data;
        this.ususel.password="";
        this.ususel.repitepassword ="";
        this.ifForm = this.fb.group(this.ususel);
        this.muestrausu=true;  
        console.log("parsely");
        setTimeout(() => jQuery('.parsleyjs').parsley(), 1000);
        
        ;  
       },
      error => {
        this.errorMessage = <any>error;
					if(this.errorMessage !== null){
                                          
                        Messenger().post({
                            message: 'Ha ocurrido un error en la petición.' + this.errorMessage,
                            type: 'error',
                            showCloseButton: true
                        });
					
					}
      }
     );
    
    
         
  }

  cancelModifUsu(){
    this.muestrausu=false;
  }

  prueba(): void{
    console.log("seleccionado usuario");
  }


  onSelect(persona: DashBoardAdminModel){
    console.log("seleccionado usuario");
    this.AuthService.tipocuest = persona.cuest;
    console.log(persona);
    let redirect = '';
    if(persona.cuest == 1){
      redirect = this.config.urlpestanapublic;
    }
    else if(persona.cuest==2){
      redirect = this.config.urlpestanaprivate;
    }
    this.router.navigate([redirect]);
  }
}