import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';

import { AuthService }      from '../auth/auth.service';
import {AuthModel}  from '../auth/auth.model';
import { AppConfig } from '../app.config';
declare var Messenger: any;

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  providers: [AuthService],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class Login implements OnInit {
    message: string;
    public authuser: AuthModel;
    public errorMessage: string;
    public status: string;
    config: any;
    public visiblelogin = true;
    
    constructor(public authService: AuthService, public router: Router,config: AppConfig) { this.config = config.getConfig(); }
    
    ngOnInit(): void {
      Messenger.options = { theme: 'air' };
      this.authuser = new AuthModel("","","","","","",0);
      localStorage.removeItem('fditoken');
      console.log("nginit");
  }


  VerRecuerdaPassword(){
      this.authuser.password="";
      this.visiblelogin = false;
  }
  VerLogin(){
      this.visiblelogin = true;
  }

  RecuerdaPassword(){
      //enviamos el email --hay que comprobar si existe y devolver true si la operación fue correcta
      this.authService.ResetPassword(this.authuser)
			.subscribe(
				response => {						
						this.status = response.status;
                        this.errorMessage = response.message;
						if(this.status !== "success")
                        {
							if(this.status == "tokenerror"){
                                 Messenger().post({
                                    message: 'Ha ocurrido un error de token.' + this.errorMessage,
                                    type: 'error',
                                    showCloseButton: true
                                });
                            }
                            else{
                                console.log("error ");
                                Messenger().post({
                                    message: 'Ha ocurrido un error cargando los datos.' + this.errorMessage,
                                    type: 'error',
                                    showCloseButton: true
                                });
                            }
						}
                        else{  
                            Messenger().post({
                                    message: 'Se ha enviado un email a su correo electrónico para reactivar la cuenta.',
                                    type: 'success',
                                    showCloseButton: true
                                });
                                this.authuser.usuario="";
                                this.authuser.password="";
                            
                        }
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
				});	
        
  }

  onSubmit(){
    this.authService.login(this.authuser)
			.subscribe(
				response => {						
						this.status = response.status;
                        this.errorMessage = response.message;
						if(this.status !== "success")
                        {
							if(this.status == "tokenerror"){
                                 Messenger().post({
                                    message: 'Ha ocurrido un error de token.' + this.errorMessage,
                                    type: 'error',
                                    showCloseButton: true
                                });
                            }
                            else{
                                console.log("error ");
                                Messenger().post({
                                    message: 'Ha ocurrido un error cargando los datos.' + this.errorMessage,
                                    type: 'error',
                                    showCloseButton: true
                                });
                            }
						}
                        else{  
                            this.authService.isLoggedIn = true;  
                            this.authuser = response.data;
                            this.authService.tipocuest = this.authuser.tipocuest;
                            console.log(this.authuser);
                            localStorage.setItem('fditoken', JSON.stringify({ "token": this.authuser.token, "usuario": this.authuser.usuario, "perfil": this.authuser.perfil }));                             
                            //let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
                            let redirect = '';
                            if(this.authuser.perfil == "ADM"){
                                redirect = this.config.urladmin; 
                            }
                            else{
                                redirect = this.config.urluser; 
                            }
                            console.log("redirect a " +redirect);
                            let navigationExtras: NavigationExtras = {
                                preserveQueryParams: true,
                                preserveFragment: true
                            };                            
                            this.router.navigate([redirect], navigationExtras);
                        }
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
				});	
        
     /* if (this.authService.isLoggedIn) { return true; }*/

  }
}
