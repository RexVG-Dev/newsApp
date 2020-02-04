import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from '../../shared/services/news.service';
import { ArticleModel } from '../../core/models/article-model';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit{

  @ViewChild(IonSegment, { static: true}) segment: IonSegment;

  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  news: ArticleModel[] = [];
  flagScroll = false;

  constructor( private newsService: NewsService) {}

  ngOnInit() {
    this.segment.value = this.categories[0];

    this.loadNews(this.segment.value);
  }

  cambioCategoria(event) {
    this.news = [];
    this.loadNews( event.detail.value);
  }

  loadNews( category: string, event?){
    this.newsService.getTopCategory(category)
      .subscribe( response => {

        if(response.articles.length === 0){
          this.flagScroll = true;
          event.target.disable = true;
          event.target.complete();
          return;
        }

        this.news.push( ...response.articles);
        
        if(event){
          event.target.complete();
        }
      });
  }

  loadData(event) {
    this.loadNews( this.segment.value, event);
  }

}
