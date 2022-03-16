import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ApiService } from '../service/api.service';
import { ShowDetailsComponent } from './show-details.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';

const mockData = '{"id":1,"url": "http://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"Englosh","genres":["Drama","Science-Fiction", "Thriller"],"status":"Ended","runtime":60,"premiered": "2013-06-24","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"19:00","days":["Thursday"]},"rating":{"average":6.5},"weight":97,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b>  tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/1"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/185054"}}}';
const castMockData = '[{"person":{"id":49716,"url":"https://www.tvmaze.com/people/49716/daniel-pink","name":"Daniel Pink","country":null,"birthday":null,"deathday":null,"gender":"Male","image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/5/14625.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/5/14625.jpg"},"updated":1420821992,"_links":{"self":{"href":"https://api.tvmaze.com/people/49716"}}},"character":{"id":86947,"url":"https://www.tvmaze.com/characters/86947/crowd-control-host","name":"Host","image":null,"_links":{"self":{"href":"https://api.tvmaze.com/characters/86947"}}},"self":false,"voice":false}]';
const episodeMockData= '[{"id": 31034,"url": "https://www.tvmaze.com/episodes/31034/archer-1x01-mole-hunt","name": "Mole Hunt","season": 1,"number": 1,"type": "regular","airdate": "2009-09-17","airtime": "22:30","airstamp": "2009-09-18T02:30:00+00:00","runtime": 21,"rating": {"average": 7.8},    "image": {"medium": "https://static.tvmaze.com/uploads/images/medium_landscape/70/176671.jpg","original": "https://static.tvmaze.com/uploads/images/original_untouched/70/176671.jpg"},"summary": "<p>Archer attempts to cover up discrepancies in his ISIS expense account; Cyril and Lanas Friday night dinner is interrupted by work.</p>","_links": {"self": {"href": "https://api.tvmaze.com/episodes/31034"}}}]';

describe('ShowDetailsComponent', () => {
  let component: ShowDetailsComponent;
  let fixture: ComponentFixture<ShowDetailsComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDetailsComponent],
      imports: [HttpClientTestingModule,IvyCarouselModule, RouterTestingModule.withRoutes([
        { path: 'dashboard', component: DashboardComponent },
      ])], 
      providers: [ApiService, HttpClient, {
        provide: ActivatedRoute, Router, useValue: {
          paramMap: of(convertToParamMap({ id: 1 }))
        }
      },{ provide: Router, useValue: router }]
    })
      .compileComponents();
      
  });

  beforeEach(() => {
  fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should call dashboard page', () => {
    component.goHome();
    component.backButtonText = "Go Dashboard";
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
  
  it('should call API to get Show details', () => {
    spyOn(ApiService.prototype, 'getSeriesDetails').and.returnValue(of(JSON.parse(mockData)));
    component.ngOnInit();
    expect(typeof (component.showDetails)).toBe('object');
  });

  it('should show error when API call returns an error for getShowDetails', () => {
    spyOn(ApiService.prototype, 'getSeriesDetails').and.returnValue(throwError('error'));
    component.ngOnInit();
    expect(component.hasError).toBeTruthy();
  });

  it('should call API to get Cast details', () => {
    spyOn(ApiService.prototype, 'getSeriesCast').and.returnValue(of(JSON.parse(castMockData)));
    component.ngOnInit();
    expect(typeof (component.castDetails)).toBe('object');
  });

  it('should show error when API call returns an error for getSeriesCast', () => {
    spyOn(ApiService.prototype, 'getSeriesCast').and.returnValue(throwError('error'));
    component.ngOnInit();
    expect(component.hasError).toBeTruthy();
  }); 

  it('should call API to get Episode details', () => {
    spyOn(ApiService.prototype, 'getSeriesEpisodes').and.returnValue(of(JSON.parse(episodeMockData)));
    component.ngOnInit();
    expect(typeof (component.episodesDetails)).toBe('object');
  });

  it('should show error when API call returns an error for getSeriesEpisodes', () => {
    spyOn(ApiService.prototype, 'getSeriesEpisodes').and.returnValue(throwError('error'));
    component.ngOnInit();
    expect(component.hasError).toBeTruthy();
  });
});
