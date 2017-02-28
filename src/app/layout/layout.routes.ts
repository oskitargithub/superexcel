import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
import { AuthGuard } from '../auth/auth-guard.service';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, canActivateChild: [AuthGuard], data:{ roles:['USER'] }, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivateChild: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard], data:{ roles:['USER'] }},
    { path: 'introduccion', loadChildren: '../dashboard/introduccion/introduccion.module#IntroduccionModule', canLoad: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'informacionbasica', loadChildren: '../dashboard/informacionbasica/informacionbasica.module#InformacionBasicaModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'clasificacionprofesional', loadChildren: '../dashboard/clasprofesional1/clasprofesional1.module#ClasProfesional1Module' },
    { path: 'inbox', loadChildren: '../inbox/inbox.module#InboxModule' , canActivate: [AuthGuard], data:{ roles:['USER'] }},
    { path: 'charts', loadChildren: '../charts/charts.module#ChartsModule', canActivate: [AuthGuard], data:{ roles:['USER'] }  },
    { path: 'profile', loadChildren: '../profile/profile.module#ProfileModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'forms', loadChildren: '../forms/forms.module#FormModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'ui', loadChildren: '../ui-elements/ui-elements.module#UiElementsModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'extra', loadChildren: '../extra/extra.module#ExtraModule' , canActivate: [AuthGuard], data:{ roles:['USER'] }},
    { path: 'tables', loadChildren: '../tables/tables.module#TablesModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'maps', loadChildren: '../maps/maps.module#MapsModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'grid', loadChildren: '../grid/grid.module#GridModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
    { path: 'widgets', loadChildren: '../widgets/widgets.module#WidgetsModule', canActivate: [AuthGuard], data:{ roles:['USER'] } },
]},
  { path: 'admin', component: Layout, canActivateChild: [AuthGuard], data:{ roles:['ADM'] }, children: [
    { path: 'dashboardadmin', loadChildren: '../dashboardadmin/dashboardadmin.module#DashboardAdminModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
    { path: 'graficas1', loadChildren: '../dashboardadmin/graficas1admin/graficas1admin.module#Graficas1AdminModule', canActivate: [AuthGuard], data:{ roles:['ADM'] }},
  ]}
];

export const ROUTES = RouterModule.forChild(routes);
