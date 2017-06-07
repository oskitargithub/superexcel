import { Component } from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
      
@Component({
  selector: 'introduccion',
  templateUrl: './introduccion.template.html'
})
export class IntroduccionComponent {
  opcion:any;
  constructor(public router: Router) {  
    
  }

  ngOnInit() {
        let currentUrl = this.router.url; /// this will give you current url
        console.log(currentUrl);
        if(currentUrl == "/app/introduccionpr"){
          this.opcion = "/app/informacionbasicapr";
        }
        else{
          this.opcion = "/app/informacionbasica";
        }
        // your logic to know if its my home page.
    }

  Comenzar(){
    this.router.navigate([this.opcion]);
  }
}