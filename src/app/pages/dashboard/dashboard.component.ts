import {Component, OnInit} from '@angular/core';
import {NguCarousel, NguCarouselStore} from '@ngu/carousel';

import 'hammerjs';
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public carouselTileItems: Array<any>;
  public carouselOne: NguCarousel;
  public carouselTileItem: Array<any>;
  public carouselTile: NguCarousel;
  constructor() { }

  ngOnInit() {
    this.carouselTileItems = [
      'http://www.upds.edu.bo/img/carreras/ingenieria-comercial.jpg',
      'http://www.upds.edu.bo/img/carreras/psicologia.jpg',
      'http://www.upds.edu.bo/img/carreras/ingenieria-industrial.jpg',
      'http://www.upds.edu.bo/img/carreras/ingenieria-de-sistemas.jpg',
      'http://www.upds.edu.bo/img/carreras/contaduria-publica.jpg',
      'http://www.upds.edu.bo/img/carreras/administracion-de-empresas.jpg',
      'http://www.upds.edu.bo/img/carreras/ingenieria-comercial.jpg',
      'http://www.upds.edu.bo/img/carreras/marketing-y-publicidad.jpg'];

    this.carouselOne = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true,
        pointStyles: `
          .ngucarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngucarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngucarouselPoint li.active {
              background: white;
              width: 10px;
          }
        `
      },
      load: 2,
      loop: true,
      touch: true
    };
    this.carouselTileItem = [
      'http://www.upds.edu.bo/img/carreras/ingenieria-comercial.jpg',
      'http://www.upds.edu.bo/img/carreras/psicologia.jpg',
      'http://www.upds.edu.bo/img/carreras/ingenieria-industrial.jpg',
      'http://www.upds.edu.bo/img/carreras/ingenieria-de-sistemas.jpg',
      'http://www.upds.edu.bo/img/carreras/contaduria-publica.jpg',
      'http://www.upds.edu.bo/img/carreras/administracion-de-empresas.jpg',
      'http://www.upds.edu.bo/img/carreras/ingenieria-comercial.jpg',
      'http://www.upds.edu.bo/img/carreras/marketing-y-publicidad.jpg'
    ];

    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      interval: 4000,
      point: {
        visible: false,
        pointStyles: `
          .ngucarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            box-sizing: border-box;
          }
          .ngucarouselPoint li {
            display: inline-block;
            border-radius: 50%;
            border: 2px solid rgba(0, 0, 0, 0.55);
            padding: 4px;
            margin: 0 3px;
            transition-timing-function: cubic-bezier(.17, .67, .83, .67);
            transition: .4s;
          }
          .ngucarouselPoint li.active {
              background: #6b6b6b;
              transform: scale(1.2);
          }
        `
      },
      load: 2,
      touch: true,
      loop: false,
      easing: 'ease'
    };
  }
  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
  }
}
