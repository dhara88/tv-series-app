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
  debounce:any;
  showListByGenre:any = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllShows();  
  }
  
  filterDataByGenre(allShowsData:any){
    return [...new Set(allShowsData.map((show:any)=> show.genres).flat())].sort();
  }
  getAllShows() {
    this.isLoadingIndicator = true;
    this.apiService.getAllTVSeries().subscribe(
      (data: Shows[]) => {
        this.allShowsData = data;
        const uniqueGenreArr = this.filterDataByGenre(this.allShowsData);
         this.showListByGenre = uniqueGenreArr.map((genre:any)=>{
          const shows = this.allShowsData
          .filter(show =>show.genres.includes(genre))
          .sort((a, b) => a.rating.average > b.rating.average ? -1 : 1);
          return {genre,shows}
        })
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
    clearTimeout(this.debounce);
    this.debounce = setTimeout(()=>{
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
    },500)    
  }
}
