import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from '../app.config';

@Component({
  selector: 'dashboardadmin',
  templateUrl: './dashboardadmin.template.html',
  styleUrls: ['./dashboardadmin.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardAdmin {
  config: any;
  month: any;
  year: any;

  constructor(config: AppConfig) {
    this.config = config.getConfig();
  }

  ngOnInit(): void {
    let now = new Date();
    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();
    //localStorage.setItem('fditoken', JSON.stringify({ token: 4567489 }));
  }
}