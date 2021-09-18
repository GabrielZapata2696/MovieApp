import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  textoBuscar: string = '';
  sugeridos: string[] = ['Spiderman', 'Avengers', 'El señor de los anillos', 'Batman']
  resultPeliculas: Pelicula[] = [];
  buscando = false;


  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) { }


  buscar(event) {
    const keyword = event.detail.value;
    if (keyword.length === 0) {
      this.buscando = false;
      this.resultPeliculas = [];
      return;
    }
    this.buscando = true;
    this.moviesService.getBuscarPeliculas(keyword.toString()).subscribe(peliculas => {
      this.resultPeliculas = peliculas['results'];
      this.buscando = false;
    });


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
