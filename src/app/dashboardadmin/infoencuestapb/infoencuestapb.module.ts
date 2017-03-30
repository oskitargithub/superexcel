import 'messenger/build/js/messenger.js';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { LiveTileModule } from '../../components/tile/tile.module';

import { InfoEncuestaPBComponent } from './infoencuestapb.component';

export const routes = [
  {path: '', component: InfoEncuestaPBComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    InfoEncuestaPBComponent
  ],
  imports: [
    CommonModule,
    LiveTileModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes),
    
  ],
  providers: []
})
export class InfoEncuestaPBModule {
  static routes = routes;
}