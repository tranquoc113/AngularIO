import { Component, AfterViewInit, Directive, ElementRef } from '@angular/core';

import * as Ps from 'perfect-scrollbar';

@Directive({
  selector: '[appPs]'
})
export class PsDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    Ps.initialize(this.elementRef.nativeElement);
  }
}
