import { Injectable, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;

  noticias: Article[] = [];
  constructor(private storage: Storage, public toastController: ToastController) {
    this.init();
    this.cargarNoticiasFavoritas();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async presentToast(message :string) {
    let toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'top'
    });
  }

  guardarNoticia(noticia: Article) {

    const existe = this.noticias.find(noti => noti.title === noticia.title);
    if (!existe) {
      //El metodo unshift pone la noticia a guardar en la primera posicion del array
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
      this.presentToast('Noticia Agregada A Favoritos');
  }

  async cargarNoticiasFavoritas() {
    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.noticias = favoritos;
    } else {
      this.noticias = [];
    }
  }

  borrarNoticia(noticia: Article) {
    // Esta funcion regresa un nuevo array sin el elemento que se quiere borrar
    //Es decir se excluye y se borra el favorito
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Noticia Eliminada de Favoritos');
  }
}
