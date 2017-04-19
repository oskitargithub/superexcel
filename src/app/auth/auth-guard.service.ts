import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanDeactivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
}
  from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { AuthModel } from './auth.model';
import { FormGroup } from '@angular/forms';

export interface FormComponent {
    ifForm: FormGroup;
    submitted: boolean;
}



export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

declare var Messenger: any;


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad, CanDeactivate<FormComponent> {
  public usuario: AuthModel;
  public errorMessage: string;
  public status: string;


  constructor(private authService: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    let roles = route.data["roles"] as Array<string>;
    return this.authService.auth(roles);

  }

  canLoad(route: Route): Observable<boolean> | boolean {
    let url = '/${route.path}';
    let roles = route.data["roles"] as Array<string>;
    return this.authService.auth(roles);
  }


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }

  /*canDeactivate(): Observable<boolean> | boolean {
    console.log("service dirty es:"+this.authService.estadoFormulario());
    if(this.authService.estadoFormulario())
      return window.confirm('¿Vas a salir sin guardar cambios, estás seguro?');    
    else
      return true;
  }*/

  canDeactivate(component: FormComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot) : Observable<boolean>|Promise<boolean>|boolean{
    if(component.ifForm.dirty)
      return window.confirm('¿Vas a salir sin guardar cambios, estás seguro?');    
    else
      return true;
  }
 
}