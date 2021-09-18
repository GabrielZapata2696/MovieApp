import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  /*slidesOpts: {
    slidesPerView: 3,
    freeMode: true,
    effect: 'cube',
    resistance: false,
    spaceBetween: -20,

  };*/

  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -10
  }


  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

  }

  onClick() {
    this.cargarMas.emit();
  }

  async verDetalle(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id,
      },
    });

    modal.present();
  }
}
