import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';

import { RetribucionesAdm2Service } from './retribucionesadm2.service';
import { RetribucionesModel, Tabla5Model, Tabla6Model } from '../../dashboard/retribuciones/retribuciones.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'retribucionesadm2',
  templateUrl: './retribucionesadm2.template.html',
  styleUrls: ['retribucionesadm2.style.css', '../../forms/elements/elements.style.scss', '../../ui-elements/notifications/notifications.style.scss'],
  providers: [RetribucionesAdm2Service],
  encapsulation: ViewEncapsulation.None,
})
export class RetribucionesAdm2Component implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  public modelo: RetribucionesModel;
  public errorMessage: string;
  public status: string;

  constructor(
    private servicio: RetribucionesAdm2Service,
    injector: Injector
  ) {
    this.modelo = new RetribucionesModel();
    //this.getDatosModelo();
  }

  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
  }
}
