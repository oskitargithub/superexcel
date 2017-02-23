import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';

import { AuthService }      from '../auth/auth.service';
import {AuthModel}  from '../auth/auth.model';

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
  constructor(public authService: AuthService, public router: Router) {  }
  ngOnInit(): void {
      Messenger.options = { theme: 'air' };
      this.authuser = new AuthModel("","","");
      console.log("nginit");
  }

  login(){
    this.authService.login(this.authuser)
			.subscribe(
				response => {						
						this.status = response.status;
                        this.errorMessage = response.message;
						if(this.status !== "success"){
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
                Messenger().post({
                    message: 'se ha logado correctamente en el sistema',
                    type: 'success',
                    showCloseButton: true
                });
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
      console.log("devolviendo true");
      if( this.authService.isLoggedIn){
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/app/dashboard';
            console.log("redirect a " +redirect);
            // Set our navigation extras object
            // that passes on our global query params and fragment
            let navigationExtras: NavigationExtras = {
                preserveQueryParams: true,
                preserveFragment: true
            };

            // Redirect the user
            this.router.navigate([redirect], navigationExtras);
    }
     /* if (this.authService.isLoggedIn) { return true; }*/

  }
}
