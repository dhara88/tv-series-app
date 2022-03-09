import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: ApiService}
      ],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tvSeriesList', () => {
    spyOn(ApiService.prototype, 'getAllTVSeries').and.callThrough();
    service.getAllTVSeries();
    expect( service.getAllTVSeries).toHaveBeenCalled();
  });
  it('should get seriesDetails', () => {
    spyOn(ApiService.prototype, 'getSeriesDetails').and.callThrough();
    service.getSeriesDetails(1);
    expect(service.getSeriesDetails).toHaveBeenCalled();
  });
  it('should get searchSeries', () => {
    spyOn(ApiService.prototype, 'searchSeries').and.callThrough();
    service.searchSeries('drama');
    expect(service.searchSeries).toHaveBeenCalled();
  });
});
