import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Pelicula, PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {


  @Input() id;
  pelicula: PeliculaDetalle = {};
  oculto = 150;
  actores: Cast[] = [];

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  }

  constructor(
    private movieService:MoviesService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    
    this.movieService.getPeliculaDetalle(this.id).subscribe(data => {      
      this.pelicula = data;
    });
    this.movieService.getActoresPelicula(this.id).subscribe(data => {    
      this.actores = data.cast;
    });
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

}
