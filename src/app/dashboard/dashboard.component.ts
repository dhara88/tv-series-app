import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  searchVal!: any;
  searchResults: any = [];
  genre : any = ['Action','Comedy','Drama','Sports'];

  constructor(private searchShowsService: ApiService,private apiService: ApiService,private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem("searchValue", '');
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

  goToSearch(searchData: string) {
  localStorage.setItem("searchValue", searchData);
  if(localStorage.getItem("searchValue")?.length){
    this.searchVal = localStorage.getItem("searchValue");
    this.getShowsBySearch(this.searchVal);
   }
  }

  
  getShowsBySearch(searchVal : any) {
    this.isLoadingIndicator = true;
    this.searchShowsService.searchSeries(searchVal).subscribe(
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
