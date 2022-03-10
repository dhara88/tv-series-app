import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shows } from '../models/show';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {
  id: any;
  showDetails!: Shows;
  castDetails!:any;
  episodesDetails!:any;
  hasError = false;
  isLoading = false; 
  searchValue!: string;
  backButtonText!:string;
  constructor(private route: ActivatedRoute, private router: Router,private apiService: ApiService) { }


ngOnInit(): void {
    this.backButtonText = "Go Dashboard";
    this.searchDetails();
    this.getCastDetails(); 
    this.getEpisodesDetails();
}

searchDetails(){
  this.route.paramMap.subscribe(params => {
    this.id = params.get('id');
  });
  this.isLoading = true;
  this.apiService.getSeriesDetails(this.id).subscribe(
    (data) => {
      this.showDetails = data;
      this.hasError = false;
    },
    (error) => {
      this.hasError = true;
    },
    () => {
      this.isLoading = false;
    }
  );
}

  goHome() {
      this.router.navigate(['/dashboard']);
  }

 
  getCastDetails(){
      this.apiService.getSeriesCast(this.id).subscribe(
        (data) => {
          this.castDetails = data;
          this.hasError = false;
        },
        (error) => {
          this.hasError = true;
        }, 
        () => {
          this.isLoading = false;
        }
      );
    }
    getEpisodesDetails(){
      this.apiService.getSeriesEpisodes(this.id).subscribe(
        (data) => {
          this.episodesDetails = data;
          this.hasError = false;
        },
        (error) => {
          this.hasError = true;
        }, 
        () => {
          this.isLoading = false;
        }
      );
    }
}
