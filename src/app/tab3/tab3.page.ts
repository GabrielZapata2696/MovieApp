import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];


  favoritoGenero: any[] = [];


  constructor(
    private dataLocal: DataLocalService,
    private moviesService: MoviesService
  ) { }

  ngOnInit() { }



  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.getCargarGeneros();

    this.pelisPorgenero(this.generos, this.peliculas);
  }


  pelisPorgenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
    this.favoritoGenero = [];

    generos.forEach(genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        listado: peliculas.filter(peli => {
          return peli.genres.find(generoPeli => generoPeli.id === genero.id);
        })
      });
    });



    /*
    for (let categoria of generos) {
      let genero = '';
      var listado: PeliculaDetalle[] = [];
      let asignacion: any = {
        genero,
        listado
      }
      for (let pelicula of peliculas) {
        for (let generoPeli of pelicula.genres) {
          if (categoria.id == generoPeli.id) {
            listado.push(pelicula);

          }
        }

      }
      genero = categoria.name;
      asignacion.genero = genero;
      asignacion.listado = listado;
      this.favoritoGenero.push(asignacion);
    }
    */

  }

}
