import 'jquery-slimscroll';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule }  from '@angular/forms';
import { TooltipModule } from 'ng2-bootstrap';

import { ROUTES }       from './layout.routes';

import { Layout } from './layout.component';
import { Sidebar } from './sidebar/sidebar.component';
import { Navbar } from './navbar/navbar.component';

import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    ROUTES,
    FormsModule,
    ReactiveFormsModule],
  declarations: [
    Layout,
    Sidebar,
    Navbar,
    SearchPipe
  ]
})
export class LayoutModule {
}
