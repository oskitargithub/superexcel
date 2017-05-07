import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FinalComponent } from './final.component';

export const routes = [
  { path: '', component: FinalComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule,
   
    RouterModule.forChild(routes)],
  declarations: [FinalComponent]
})
export class FinalModule {
  static routes = routes;
}