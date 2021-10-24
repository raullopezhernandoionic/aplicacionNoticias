import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinePage = 0;
  actualCategory = '';
  categoryPage = 0;

  constructor(private http: HttpClient) { }

  private ejecuteQuery<T>(query: string) {

    query = apiUrl + query;

    return this.http.get<T>(query, { headers });
  }


  getTopHeadlines() {

    this.headLinePage++;
    return this.ejecuteQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headLinePage}`);

    // return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=0f52cc480b814052954bbc227bf3d27c`);
  }
  getTopHeadlinesCategorie(categorie: string) {

    if (this.actualCategory === categorie) {
      this.categoryPage++;
    } else {
      this.categoryPage = 1;
      this.actualCategory = categorie;
    }

    return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&category=${categorie}&apiKey=0f52cc480b814052954bbc227bf3d27c&page=3`);

    //return this.ejecuteQuery<RespuestaTopHeadlines>(`top-headlines?country=us&category=${categorie}&page=${this.categoryPage}`);
  }
}
