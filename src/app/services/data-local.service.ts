import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculasFav: PeliculaDetalle[] = [];


  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.storage.create();
    this.cargarFavoritos();
  }


  guardarPelicula(pelicula: PeliculaDetalle) {
    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculasFav) {
      if (pelicula.id === peli.id) {
        existe = true;
        break;
      }
    }
    if (existe) {
      this.peliculasFav = this.peliculasFav.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Pelicula retirada de favoritos';
    } else {
      this.peliculasFav.push(pelicula);
      mensaje = 'Pelicula agregada a favoritos';
    }

    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculasFav);

    return !existe;
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculasFav = peliculas || [];

    return this.peliculasFav;
  }

  async existePeliculaFav(id: any) {
    id = Number(id);

    await this.cargarFavoritos();
    const existe = this.peliculasFav.find(peli => peli.id === id);
    return (existe) ? true : false;

  }



}
