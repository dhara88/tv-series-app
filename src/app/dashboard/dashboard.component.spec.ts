import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ApiService } from '../service/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const mockData = '[{"id":46584,"url":"http://www.tvmaze.com/shows/46584/drama","name":"Drama","type":"Scripted","language":"Spanish","genres":["Drama","Comedy","Sports"],"status":"Running","runtime":25,"premiered":"2020-02-04","officialSite":"http://www.rtve.es/playz/drama/","schedule":{"time":"19:00","days":["Tuesday"]},"rating":{"average":6.7},"weight":0,"network":{"id":147,"name":"RTVE","country":{"name":"Spain","code":"ES","timezone":"Europe/Madrid"}},"webChannel":null,"externals":{"tvrage":null,"thetvdb":376734,"imdb":"tt11341924"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/244/611819.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/244/611819.jpg"},"summary":"<p><b>Drama</b> tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/46584"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/1812874"}}}]';
  const mockDataSerach = '[{"score":100,"show":{"id":1,"url": "http://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"Englosh","genres":["Drama","Science-Fiction", "Thriller"],"status":"Ended","runtime":60,"premiered": "2013-06-24","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"19:00","days":["Thursday"]},"rating":{"average":6.5},"weight":97,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b>  tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/1"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/185054"}}}}]';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule.withRoutes([
        { path: 'dashboard', component: DashboardComponent },
      ])],
      schemas:[NO_ERRORS_SCHEMA],
      providers: [ApiService, HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return data after loaded api and sort by genres and Rating', () => {
    spyOn(ApiService.prototype, 'getAllTVSeries').and.returnValue(of(JSON.parse(mockData)));
    component.getAllShows();
    spyOn(component.allShowsData, 'sort');
    expect(component.allShowsData.length).toBeGreaterThan(0);
    const result = component.allShowsData.sort();
    expect( result).toEqual( component.allShowsData.sort());
  });

  it('should call filterDataByGenre method', () => {
    component.filterDataByGenre(component.allShowsData);
  });

  it('Should show error when we get error from API', () => {
    spyOn(ApiService.prototype, 'getAllTVSeries').and.returnValue(throwError('error'));
    component.getAllShows();
    expect(component.hasError).toBeTruthy();
  });
  
  it('should call API to get Search Shows', () => {
    var maxDelay = 500;
    setTimeout(function(){
      spyOn(ApiService.prototype, 'searchSeries').and.returnValue(of(JSON.parse(mockDataSerach)));
      component.getShowsBySearch('drama');
      spyOn(component.searchResults, 'sort');
      expect( component.searchResults.sort()).toEqual( component.searchResults.sort());
      expect(component.searchResults.length).toBeGreaterThan(0);
    },maxDelay);
  }); 

  it('should show error when API call returns an error for Search Shows', () => {
    spyOn(ApiService.prototype, 'searchSeries').and.returnValue(throwError('error'));
    component.getShowsBySearch('drama');
    expect(component.hasError).toBeFalsy();
  });

});
