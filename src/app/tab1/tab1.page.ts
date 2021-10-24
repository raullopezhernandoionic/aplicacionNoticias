import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.loadNews();
  }

  loadData(event) {
    this.loadNews(event);
  }

  loadNews(event?) {
    this.noticiasService.getTopHeadlines().subscribe((response) => {
      this.noticias.push(...response.articles);

      if(response.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      if (event) {
        event.target.complete();
      }
    })
  }

}
