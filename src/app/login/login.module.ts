import 'messenger/build/js/messenger.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { Login } from './login.component';

export const routes = [
  { path: '', component: Login, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes),
  ]
})
export class LoginModule {
  static routes = routes;
}
