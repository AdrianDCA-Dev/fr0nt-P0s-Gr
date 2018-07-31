import {Component, OnInit} from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit{

  menu = MENU_ITEMS;
/*  getMenu() {
    return this.menuVisibility(MENU_ITEMS, 'USUARIOS', this.isAdmin());
  }
  isAdmin() {
    // your code goes here
    return true;
  }
  menuVisibility(menu, title, visible) {
    let newmenu = menu;
    let index = menu.findIndex(v =>
      v.title == title,
    );
    console.log('index', index);
    let menu_filter = menu.filter(v => v.title == title);
    console.log('menu_filter', menu_filter);
    if ((menu_filter.length > 0) && (index >= 0)) {
      menu_filter[0].hidden = !visible;
      newmenu = [
        ...menu.slice(0, index),
        menu_filter[0],
        ...menu.slice(index + 1),
      ]
    }
    return newmenu;
  }
  constructor (){}*/
  ngOnInit(){
    console.log('menu',this.menu);
  }
}
