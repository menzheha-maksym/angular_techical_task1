import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {


  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('query')) {
      //@ts-ignore already checking for it to be not null
      this.query = this.route.snapshot.paramMap.get('query');
      
      if(this.route.snapshot.paramMap.get('pageIndex')) {
        //@ts-ignore already checking for it to be not null
        this.pageIndex = this.route.snapshot.paramMap.get('pageIndex');
        this.getData(this.pageIndex, this.query);
      } else {
        this.getData(1, this.query);
      }
    } else {
      this.getData(1, this.query);
    }   
  }

  apiKey = environment.apiKey;

  cards: Card[] = [];

  
  query = "Apple";
  pageSize="10";
  pageIndex = 1;
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
          this.cards[i].query = query;
          this.cards[i].pageindex = page;
      }
    })
  }
}



type Card = {
  id: number,
  title: string,
  urlToImage: string,
  query: string,
  pageindex: number
}

