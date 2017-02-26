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
  

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      let url: string = state.url;
      let roles = route.data["roles"] as Array<string>;    
      return this.authService.auth(roles);
    
  }

  canLoad(route: Route):Observable<boolean> | boolean {
    let url = '/${route.path}';
    let roles = route.data["roles"] as Array<string>;
    return this.authService.auth(roles);
  }


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }
}