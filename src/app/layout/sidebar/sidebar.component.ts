import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AppConfig } from '../../app.config';

import { AuthService }      from '../../auth/auth.service';

declare let jQuery: any;

@Component({
  selector: '[sidebar]',
  templateUrl: './sidebar.template.html'
})

export class Sidebar implements OnInit {
  $el: any;
  config: any;
  router: Router;
  location: Location;
  perfil : any;

  constructor(config: AppConfig, el: ElementRef, router: Router, location: Location,private authService: AuthService) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.router = router;
    this.location = location;
    this.perfil = authService.perfilauth;    
  }

  initSidebarScroll(): void {
    let $sidebarContent = this.$el.find('.js-sidebar-content');
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $sidebarContent.slimscroll({
        destroy: true
      });
    }
    $sidebarContent.slimscroll({
      height: window.innerHeight,
      size: '4px'
    });
  }

  changeActiveNavigationItem(location): void {
    let $newActiveLink = this.$el.find('a[href="#' + location.path().split('?')[0] + '"]');

    // collapse .collapse only if new and old active links belong to different .collapse
    if (!$newActiveLink.is('.active > .collapse > li > a')) {
      this.$el.find('.active .active').closest('.collapse').collapse('hide');
    }
    this.$el.find('.sidebar-nav .active').removeClass('active');

    $newActiveLink.closest('li').addClass('active')
      .parents('li').addClass('active');

    // uncollapse parent
    $newActiveLink.closest('.collapse').addClass('in').css('height', '')
      .siblings('a[data-toggle=collapse]').removeClass('collapsed');
  }

  ngAfterViewInit(): void {
    this.changeActiveNavigationItem(this.location);
  }

  ngOnInit(): void {
    jQuery(window).on('sn:resize', this.initSidebarScroll.bind(this));
    this.initSidebarScroll();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeActiveNavigationItem(this.location);
      }
    });
  }
}
