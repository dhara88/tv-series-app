import { Component, OnInit } from '@angular/core';
import { Shows } from '../models/show';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchData = '';
  allShowsData: Shows[] = [];
  isLoadingIndicator: boolean = false;
  hasError: boolean = false;
  searchResults: any = [];
  genre : any = ['Action','Comedy','Drama','Sports'];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllShows();  
  }
 
  
  filterDataByGenre(genre: string): Shows[] {
    return this.allShowsData.filter(itemVal => itemVal.genres.indexOf(genre) >= 0);
  }


  getAllShows() {
    this.isLoadingIndicator = true;
    this.apiService.getAllTVSeries().subscribe(
      (data: Shows[]) => {
        this.allShowsData = data;
        this.allShowsData.sort((a, b) => a.rating.average > b.rating.average ? -1 : 1);
        this.hasError = false;
      },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoadingIndicator = false;
      }
    );
  }
  
  getShowsBySearch(searchData : any) {
    this.isLoadingIndicator = true;
    this.apiService.searchSeries(searchData).subscribe(
      (data: any) => {
        this.searchResults = data.map((item: any) => item.show);
        this.searchResults.sort((a: any, b: any) => a.rating.average > b.rating.average ? -1 : 1);
        this.hasError = false;
      },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoadingIndicator = false;
      }
    );
  }
 
}
