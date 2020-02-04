import { Component, OnInit, Input } from '@angular/core';
import { ArticleModel } from '../../core/models/article-model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  // Para recibir la informacion del componente padre
  @Input() news: ArticleModel[] = [];

  @Input() inFavorites = false;

  
  constructor() { }

  ngOnInit() {}

}
