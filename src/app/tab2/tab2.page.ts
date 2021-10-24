import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from '../interfaces/interfaces';
import { NoticiasService } from '../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  //Seleccionamos el IonSegment de Tab2
  @ViewChild(IonSegment) segment: IonSegment

  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology', ];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.segment.value = this.categories[0];
    console.log(this.segment.value);
    this.loadNew(this.categories[0]);
  }

  changeCategorie(event) {
    console.log(event);
    this.noticias = [];
    this.loadNew(event.detail.value);

  }

  loadNew(categorie: string, event?) {
    //Establecemos valor por defecto
    this.noticiasService.getTopHeadlinesCategorie(
      categorie).subscribe(
        resp => {
          console.log(resp.articles);
          this.noticias.push(...resp.articles)

          if(event){
            event.target.complete();
          }
        });

  }

  loadData(event){
    this.loadNew(this.segment.value, event);
  }

}
