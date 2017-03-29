import { Component } from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
@Component({
  selector: 'introduccion',
  templateUrl: './introduccion.template.html'
})
export class IntroduccionComponent {

  constructor(public router: Router) {  }
  Comenzar(){
    this.router.navigate(["/app/informacionbasica"]);
  }
}