import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
import { AuthGuard } from '../auth/auth-guard.service';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivateChild: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard], data:{ roles:['USER'] }},
    { path: 'introduccion', loadChildren: '../dashboard/introduccion/introduccion.module#IntroduccionModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'informacionbasica', loadChildren: '../dashboard/informacionbasica/informacionbasica.module#InformacionBasicaModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'informacionbasicapr', loadChildren: '../dashboard/informacionbasicapr/informacionbasicapr.module#InformacionBasicaPrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
   
    { path: 'clasificacionprofesional1', loadChildren: '../dashboard/clasprofesional1/clasprofesional1.module#ClasProfesional1Module', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'clasificacionprofesional2', loadChildren: '../dashboard/clasprofesional2/clasprofesional2.module#ClasProfesional2Module', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'retribuciones', loadChildren: '../dashboard/retribuciones/retribuciones.module#RetribucionesModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'retribuciones2', loadChildren: '../dashboard/retribuciones2/retribuciones2.module#Retribuciones2Module', canActivate: [AuthGuard], data:{ roles:['USER'] } },

]},
  { path: 'admin', component: Layout, children: [
    { path: 'dashboardadmin', loadChildren: '../dashboardadmin/dashboardadmin.module#DashboardAdminModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'clasificacionprofesionaladm', loadChildren: '../dashboardadmin/clasprofesionaladm/clasprofesionaladm.module#ClasProfesionalAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'tipodecontratoadm', loadChildren: '../dashboardadmin/tipodecontratoadm/tipodecontratoadm.module#TipoDeContratoAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'retribucionesadm', loadChildren: '../dashboardadmin/retribucionesadm/retribucionesadm.module#RetribucionesAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'retribucionesadm2', loadChildren: '../dashboardadmin/retribucionesadm2/retribucionesadm2.module#RetribucionesAdm2Module', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
  /* 
  { path: 'infoencuestapb', loadChildren: '../dashboardadmin/graficas1admin/graficas1admin.module#Graficas1AdminModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'infoencuestapr', loadChildren: '../dashboardadmin/graficas1admin/graficas1admin.module#Graficas1AdminModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
     
    { path: 'graficas1', loadChildren: '../dashboardadmin/graficas1admin/graficas1admin.module#Graficas1AdminModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
  */
  ]},
  { path: 'login', loadChildren: '../login/login.module#LoginModule'}
];

export const ROUTES = RouterModule.forChild(routes);
