import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../shared/services/news.service';
import { ArticleModel } from '../../core/models/article-model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

  news: ArticleModel[] = [];
  countSelected = {
    id: 'mx', country:'México', acronym:'MEX'
  };
  countrySelected: any;
  flagScroll = false;

  paises = [
    {id:'us', country:'USA', acronym:'USA'},
    {id:'mx', country:'México', acronym:'MEX'},
    {id:'de', country:'Alemania', acronym:'ALE'},
    {id:'ae', country:'Emiratos Árabes', acronym:'EAU'},
    {id:'ar', country:'Argentina', acronym:'ARG'},
    {id:'at', country:'Austria', acronym:'AUS'},
    {id:'be', country:'Bélgica', acronym:'BEL'},
    {id:'br', country:'Brasil', acronym:'BRA'},
    {id:'ca', country:'Canadá', acronym:'CAN'},
  ];

  constructor( private newServices: NewsService) {}

  ngOnInit(){
    this.loadNews();
  }

  loadData(event){
    this.loadNews(event);
  }

  loadNews( event? ){
    this.newServices.getTopHeadLines()
      .subscribe( response => {
        // console.log('noticias', response);
        // this.news = response.articles;

        if( response.articles.length === 0){
          this.flagScroll = true;
          event.target.disable = true;
          event.target.complete();
          return;
        }

        this.news.push(...response.articles);

        if(event) {
          event.target.complete();
        }
    }, error => {
      event.target.disable = true;
      event.target.complete();
      return;
    });
  }

  onSelCountry(){
    let me = this;
    // console.log('Uso del click', me.countSelected);
    this.newServices.getTopHeadLines(this.countSelected.id)
      .subscribe(response => {
        this.news = response.articles;
      });
  }

}
