import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  textoBuscar: string = '';
  sugeridos: string[] = ['Spiderman', 'Avengers', 'El señor de los anillos', 'Batman']

  constructor(
    private moviesService: MoviesService
  ) { }


  buscar(event) {
    const keyword = event.detail.value;
    this.moviesService.getBuscarPeliculas(keyword.toString()).subscribe(peliculas => {
      console.log(peliculas);
    });
  }




}
