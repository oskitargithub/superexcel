import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';

import { RetribucionesService } from './retribuciones.service';
import { RetribucionesModel, Tabla6Model } from './retribuciones.model';

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'retribuciones',
  templateUrl: './retribuciones.template.html',
  styleUrls: ['retribuciones.style.css', '../../forms/elements/elements.style.scss', '../../ui-elements/notifications/notifications.style.scss'],
  providers: [RetribucionesService],
  encapsulation: ViewEncapsulation.None,
})
export class RetribucionesComponent implements OnInit {
  injector: Injector;
  domSharedStylesHost: any;
  colorOptions: Object = { color: '#f0b518' };
  submitted = false;
  public modelo: RetribucionesModel;
  public errorMessage: string;
  public status: string;

  constructor(
    private servicio: RetribucionesService,
    injector: Injector
  ) {
    this.modelo = new RetribucionesModel();
    //this.getDatosModelo();
  }

  ngOnInit(): void {
    Messenger.options = { theme: 'air' };
  }
}
