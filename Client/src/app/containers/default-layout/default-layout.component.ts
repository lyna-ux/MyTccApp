// default-layout.component.ts
import { Component, Renderer2, AfterViewInit, ElementRef } from '@angular/core';
import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements AfterViewInit {

  public navItems = navItems;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    // Attach click event listener to the "Mes demandes" menu item
    // const mesDemandesMenuItem = this.el.nativeElement.querySelector('.app-form-controls');

    // if (mesDemandesMenuItem) {
    //   this.renderer.listen(mesDemandesMenuItem, 'click', () => this.handleMesDemandesClick());
    // }
  }

  // handleMesDemandesClick() {
  //   console.log('Mes demandes clicked!');
  // }
}
