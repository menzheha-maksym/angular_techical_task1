import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsDetailsComponent } from './news-details/news-details.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { 
    path: 'home', 
    component: DashboardComponent,
  },
  { path: ':details', component: NewsDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
