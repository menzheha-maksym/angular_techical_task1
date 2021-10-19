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
    this.getData(1);
  }

  apiKey = environment.apiKey;


  cards: Card[] = [];

  query ="Apple";
  pageSize="10";
  pageIndex = 0;
  pageLength = 20;

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.getData(this.pageIndex + 1);
  }

  getData(page: number) {
    this.http.get<any>(`https://newsapi.org/v2/everything?q=${this.query}&from=2021-10-18&sortBy=popularity&pageSize=${this.pageSize}&page=${page}&apiKey=${this.apiKey}`)
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

