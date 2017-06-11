import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
import { AuthGuard } from '../auth/auth-guard.service';
// noinspection TypeScriptValidateTypes
/*const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
    { path: 'inbox', loadChildren: '../inbox/inbox.module#InboxModule' },
    { path: 'charts', loadChildren: '../charts/charts.module#ChartsModule' },
    { path: 'profile', loadChildren: '../profile/profile.module#ProfileModule' },
    { path: 'forms', loadChildren: '../forms/forms.module#FormModule' },
    { path: 'ui', loadChildren: '../ui-elements/ui-elements.module#UiElementsModule' },
    { path: 'extra', loadChildren: '../extra/extra.module#ExtraModule' },
    { path: 'tables', loadChildren: '../tables/tables.module#TablesModule' },
    { path: 'maps', loadChildren: '../maps/maps.module#MapsModule' },
    { path: 'grid', loadChildren: '../grid/grid.module#GridModule' },
    { path: 'widgets', loadChildren: '../widgets/widgets.module#WidgetsModule' },
  ]}
];*/
const routes: Routes = [
  { path: '', component: Layout, children: [
    /*{ path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivateChild: [AuthGuard], data:{ roles:['USER'] } },*/
    { path: '', redirectTo: 'introduccion', pathMatch: 'full', canActivateChild: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'final', loadChildren: '../dashboard/final/final.module#FinalModule'},
    { path: 'profile', loadChildren: '../profile/profile.module#ProfileModule', canActivateChild: [AuthGuard], data:{ roles:['USER'] }},
    { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard], data:{ roles:['USER'] }},
    { path: 'introduccion', loadChildren: '../dashboard/introduccion/introduccion.module#IntroduccionModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'informacionbasica', loadChildren: '../dashboard/informacionbasica/informacionbasica.module#InformacionBasicaModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'clasificacionprofesional1', loadChildren: '../dashboard/clasprofesional1/clasprofesional1.module#ClasProfesional1Module', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'clasificacionprofesional2', loadChildren: '../dashboard/clasprofesional2/clasprofesional2.module#ClasProfesional2Module', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'retribuciones', loadChildren: '../dashboard/retribuciones/retribuciones.module#RetribucionesModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'retribuciones2', loadChildren: '../dashboard/retribuciones2/retribuciones2.module#Retribuciones2Module', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'selpersonal', loadChildren: '../dashboard/selpersonal/selpersonal.module#SelPersonalModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'bajaseincorp', loadChildren: '../dashboard/bajaseincorp/bajaseincorp.module#BajasEIncorpModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'conciliacion', loadChildren: '../dashboard/conciliacion/conciliacion.module#ConciliacionModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'formacion', loadChildren: '../dashboard/formacion/formacion.module#FormacionModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'promocarrera', loadChildren: '../dashboard/promocarrera/promocarrera.module#PromoCarreraModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'prll', loadChildren: '../dashboard/prll/prll.module#PRLLModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'acospr', loadChildren: '../dashboard/acospr/acospr.module#AcosPRModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'rrpp', loadChildren: '../dashboard/rrpp/rrpp.module#RRPPModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'comunicacion', loadChildren: '../dashboard/comunicacion/comunicacion.module#ComunicacionModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },


    { path: 'informacionbasicapr', loadChildren: '../dashboard/informacionbasicapr/informacionbasicapr.module#InformacionBasicaPrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'introduccionpr', loadChildren: '../dashboard/introduccion/introduccion.module#IntroduccionModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'clasificacionprofesional1pr', loadChildren: '../dashboard/clasprofesional1pr/clasprofesional1pr.module#ClasProfesional1PrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'clasificacionprofesional2pr', loadChildren: '../dashboard/clasprofesional2pr/clasprofesional2pr.module#ClasProfesional2PrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'retribucionespr', loadChildren: '../dashboard/retribucionespr/retribucionespr.module#RetribucionesPrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'retribuciones2pr', loadChildren: '../dashboard/retribuciones2pr/retribuciones2pr.module#Retribuciones2PrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'selpersonalpr', loadChildren: '../dashboard/selpersonalpr/selpersonalpr.module#SelPersonalPrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'bajaseincorppr', loadChildren: '../dashboard/bajaseincorppr/bajaseincorppr.module#BajasEIncorpPrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'conciliacionpr', loadChildren: '../dashboard/conciliacionpr/conciliacionpr.module#ConciliacionPrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'formacionpr', loadChildren: '../dashboard/formacionpr/formacionpr.module#FormacionPrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'promocarrerapr', loadChildren: '../dashboard/promocarrerapr/promocarrerapr.module#PromoCarreraPrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'prllpr', loadChildren: '../dashboard/prllpr/prllpr.module#PRLLPrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'acosprpr', loadChildren: '../dashboard/acosprpr/acosprpr.module#AcosPRPrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'rrpppr', loadChildren: '../dashboard/rrpppr/rrpppr.module#RRPPPrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    /*{ path: 'comunicacionpr', loadChildren: '../dashboard/comunicacionpr/comunicacionpr.module#ComunicacionPrModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },*/
]},
   { path: 'admin', component: Layout, children: [
     { path: '', redirectTo: 'dashboardadmin', pathMatch: 'full', canActivateChild: [AuthGuard], data:{ roles:['ADM'] } },
     { path: 'dashboardadmin', loadChildren: '../dashboardadmin/dashboardadmin.module#DashboardAdminModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'profileadm', loadChildren: '../profile/profile.module#ProfileModule', canActivateChild: [AuthGuard], data:{ roles:['ADM'] }},    
    { path: 'infoencuestapb', loadChildren: '../dashboardadmin/infoencuestapb/infoencuestapb.module#InfoEncuestaPBModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'clasificacionprofesionaladm', loadChildren: '../dashboardadmin/clasprofesionaladm/clasprofesionaladm.module#ClasProfesionalAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'tipodecontratoadm', loadChildren: '../dashboardadmin/tipodecontratoadm/tipodecontratoadm.module#TipoDeContratoAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'retribucionesadm', loadChildren: '../dashboardadmin/retribucionesadm/retribucionesadm.module#RetribucionesAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'retribucionesadm2', loadChildren: '../dashboardadmin/retribucionesadm2/retribucionesadm2.module#RetribucionesAdm2Module', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'bajaseincorpadm', loadChildren: '../dashboardadmin/bajaseincorpadm/bajaseincorpadm.module#BajasEIncorpAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'conciliacionadm', loadChildren: '../dashboardadmin/conciliacionadm/conciliacionadm.module#ConciliacionAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'formacionadm', loadChildren: '../dashboardadmin/formacionadm/formacionadm.module#FormacionAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'promocarreraadm', loadChildren: '../dashboardadmin/promocarreraadm/promocarreraadm.module#PromoCarreraAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'acospradm', loadChildren: '../dashboardadmin/acospradm/acospradm.module#AcosPRAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'rrppadm', loadChildren: '../dashboardadmin/rrppadm/rrppadm.module#RRPPAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},


    { path: 'infoencuestapr', loadChildren: '../dashboardadmin/infoencuestapr/infoencuestapr.module#InfoEncuestaPRModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'clasificacionprofesionalpradm', loadChildren: '../dashboardadmin/clasprofesionalpradm/clasprofesionalpradm.module#ClasProfesionalPrAdmModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
  ]},
  { path: 'login', loadChildren: '../login/login.module#LoginModule'}
  
];

export const ROUTES = RouterModule.forChild(routes);
