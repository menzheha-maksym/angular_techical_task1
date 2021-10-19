import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})

export class NewsDetailsComponent implements OnInit { 

  details: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    console.log(this.route.params);

    this.details = this.route.snapshot.paramMap;

    console.log(this.details);

  }
} 