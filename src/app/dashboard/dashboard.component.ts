import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  apiKey = environment.apiKey;


  cards: Card[] = [];

  imgTest = "https://www.pikpng.com/pngl/b/522-5228401_of-front-end-development-was-using-javascript-and.png";

  getData() {
    this.http.get<any>(`https://newsapi.org/v2/everything?q=Apple&from=2021-10-18&sortBy=popularity&apiKey=${this.apiKey}`)
    .subscribe(res => {
      console.log(res);
      this.cards = res.articles;
    })
  }
}



type Card = {
  title: string,
  urlToImage: string
}

