import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';

import { RetribucionesAdmService } from './retribucionesadm.service';
import { RetribucionesAdmModel, Tabla6Model } from './retribucionesadm.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'retribucionesadm',
  templateUrl: './retribucionesadm.template.html',
  styleUrls: ['retribucionesadm.style.css', '../../forms/elements/elements.style.scss', '../../ui-elements/notifications/notifications.style.scss'],
  providers: [RetribucionesAdmService],
  encapsulation: ViewEncapsulation.None,
})
export class RetribucionesAdmComponent implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  public modelo: RetribucionesAdmModel;
  public errorMessage: string;
  public status: string;

  constructor(
    private servicio: RetribucionesAdmService,
    injector: Injector
  ) {
    this.modelo = new RetribucionesAdmModel();
    //this.getDatosModelo();
  }

  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
  }
}
