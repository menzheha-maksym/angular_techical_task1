import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})

export class NewsDetailsComponent implements OnInit { 

  details: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.details = this.route.snapshot.paramMap;
  }

  handleGoBackButtonClick(event: any) {
    this.router.navigate(['/home', this.details.get('query'), this.details.get('pageindex')]);
  }
} 