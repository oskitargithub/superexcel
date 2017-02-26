import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule } from '@angular/router';

import 'jquery.animate-number/jquery.animateNumber.js';
import 'jQuery-Mapael/js/jquery.mapael.js';
import 'jQuery-Mapael/js/maps/usa_states';
import 'bootstrap_calendar/bootstrap_calendar/js/bootstrap_calendar.js';

import { DashboardAdmin } from './dashboardadmin.component.ts';
import { WidgetModule } from '../layout/widget/widget.module';
import { UtilsModule } from '../layout/utils/utils.module';
import { RickshawChartModule } from '../components/rickshaw/rickshaw.module';
import { GeoLocationsWidget } from '../dashboard/geo-locations-widget/geo-locations-widget.directive';
import { MarketStatsWidget } from '../dashboard/market-stats-widget/market-stats-widget.component';
import { BootstrapCalendar } from '../dashboard/bootstrap-calendar/bootstrap-calendar.component';

export const routes = [
  { path: '', component: DashboardAdmin, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    UtilsModule,
    RickshawChartModule
  ],
  declarations: [
    DashboardAdmin,    
    GeoLocationsWidget,
    BootstrapCalendar,
    MarketStatsWidget
  ]
})
export class DashboardAdminModule {
  static routes = routes;
}
