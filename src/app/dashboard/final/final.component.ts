import { Component, ViewEncapsulation, Injector } from '@angular/core';
import {
    Router,
    NavigationExtras
} from '@angular/router';

@Component({
    selector: 'final',
    templateUrl: './final.template.html',
    styleUrls: ['../../scss/elements.style.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FinalComponent {
    injector: Injector;

    constructor(injector: Injector
    ) {
    }
}