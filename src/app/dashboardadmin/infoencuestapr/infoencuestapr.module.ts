import 'messenger/build/js/messenger.js';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';
import { LiveTileModule } from '../../components/tile/tile.module';

import { InfoEncuestaPRComponent } from './infoencuestapr.component';

export const routes = [
  {path: '', component: InfoEncuestaPRComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    InfoEncuestaPRComponent
  ],
  imports: [
    CommonModule,
    LiveTileModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes),
    
  ],
  providers: []
})
export class InfoEncuestaPRModule {
  static routes = routes;
}