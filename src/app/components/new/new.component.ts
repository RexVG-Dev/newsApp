import { Component, OnInit, Input } from '@angular/core';
import { ArticleModel } from '../../core/models/article-model';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocaldataService } from '../../shared/services/local-data.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() new: ArticleModel[] = [];
  @Input() indice: number;

  //No se agrega valor porque siempre se recibe del padre (news)
  @Input() inFavorites;

  constructor(
    private inAppBrowser: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private localDataService: LocaldataService
  ) { }

  ngOnInit() {
    // console.log(this.inFavorites)
   }

  openNew(inpNew: ArticleModel) {
    const browser = this.inAppBrowser.create(`${inpNew.url}`, '_system');
  }

  async showMenu(inpNew: ArticleModel) {

    let flagbutonFavs;

    if(this.inFavorites){
      flagbutonFavs= {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.localDataService.deleteNew(inpNew);
        }
      };
    } else {
      flagbutonFavs= {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.localDataService.addFavNews(inpNew);
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          // console.log('Share clicked');
          this.socialSharing.share(
            inpNew.title,
            inpNew.source.name,
            '',
            inpNew.url
          );
        }
      },
      flagbutonFavs,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
  
    await actionSheet.present();
  }

}

