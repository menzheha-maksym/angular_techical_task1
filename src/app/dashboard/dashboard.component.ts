import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData(1, this.query);
  }

  apiKey = environment.apiKey;


  cards: Card[] = [];

  query ="Apple";
  pageSize="10";
  pageIndex = 0;
  pageLength = 20;

  handleInputSubmit(event: any) {
    event.preventDefault();

    if(event.target.searchInput.value) {
      this.query = event.target.searchInput.value;
      this.getData(1, this.query);
    }
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.getData(this.pageIndex + 1, this.query);
  }

  handleClickOnImage(event: any) {
    console.log(event.target.id);
    console.log(this.cards);

    console.log(this.cards[event.target.id]);

  }

  getData(page: number, query: string) {
    this.http.get<any>(`https://newsapi.org/v2/everything?q=${query}&from=2021-10-18&sortBy=popularity&pageSize=${this.pageSize}&page=${page}&apiKey=${this.apiKey}`)
    .subscribe(res => {
      console.log(res);
      this.cards = res.articles;

      for(let i = 0; i < this.cards.length; i++) {
          this.cards[i].id = i;
      }
    })
  }
}



type Card = {
  id: number,
  title: string,
  urlToImage: string
}

