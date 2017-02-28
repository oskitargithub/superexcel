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
    
    constructor(public authService: AuthService, public router: Router,config: AppConfig) { this.config = config.getConfig(); }
    
    ngOnInit(): void {
      Messenger.options = { theme: 'air' };
      this.authuser = new AuthModel("","","","","","");
      localStorage.removeItem('fditoken');
      console.log("nginit");
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
