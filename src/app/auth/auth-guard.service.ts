import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
}     
                      from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService }      from './auth.service';
import {AuthModel} from './auth.model';


declare var Messenger: any;


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  public usuario: AuthModel;
  public errorMessage: string;
	public status: string;


  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | boolean {
    let url: string = state.url;
    let roles = route.data["roles"] as Array<string>;    
    console.log(roles);
    //return this.checkLogin(url);
    return this.checkLoginRoles(url, roles);
  }

  

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route):Observable<boolean> | boolean {
    let url = '/${route.path}';
    let roles = route.data["roles"] as Array<string>;
    //return this.checkLogin(url);
    return this.checkLoginRoles(url, roles);   
  }


  checkLoginRoles(url: string, roles:Array<string>):Observable<boolean> | boolean{
      console.log("haciendo check");
      //let check = this.authService.estaLogado(roles);
      return Observable.of(this.authService.estaLogado(roles));
      /*console.log(check);
      if(check == true){
        
        return true;
      }
      else{
        this.authService.redirectUrl = url;        
      // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
      }*/
      //return this.authService.isLoggedIn;
     /* if (this.authService.isLoggedIn) { return true; }*/

  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Create a dummy session id
    let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/