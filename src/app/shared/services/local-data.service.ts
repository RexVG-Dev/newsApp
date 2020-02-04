import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ArticleModel } from '../../core/models/article-model';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocaldataService {

  favNews: ArticleModel[] = [];

  constructor( 
    private localStorge: Storage,
    private toastCtrl: ToastController) { 
    this.loadFavorites();
  }

  addFavNews( news: ArticleModel){
    const exists = this.favNews.find( newsToAdd => newsToAdd.title === news.title)

    if(!exists){
      this.favNews.unshift(news);
      this.localStorge.set('favoritesNews', this.favNews);
      this.presentToast('Noticia agregada a tus favoritos!');
    }

  }

  async loadFavorites(){
    // this.localStorge.get('favoritesNews')
    //   .then( favorites => {
    //     console.log('favoritos', favorites);
    //   }
    // )
    const favorites = await this.localStorge.get('favoritesNews');

    if( favorites) this.favNews = favorites;
    // return await this.localStorge.get('favoritesNews');
  }

  deleteNew( newsRecive:ArticleModel){
    this.favNews = this.favNews.filter(news => news.title !== newsRecive.title);
    this.localStorge.set('favoritesNews', this.favNews);
    this.presentToast('Noticia eliminada de tus favoritos!');
  }

  async presentToast( message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'middle',
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler:() =>{}
        }
      ]
    });
    toast.present();
  }
}
