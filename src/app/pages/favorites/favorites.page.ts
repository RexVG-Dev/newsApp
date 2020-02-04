import { Component } from '@angular/core';
import { LocaldataService } from '../../shared/services/local-data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage {

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  }

  constructor(
    public localDataService: LocaldataService
  ) {}

}
