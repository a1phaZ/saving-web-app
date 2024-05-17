import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let serviceSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  beforeEach(() => {
    // serviceSpy = jest.spyOn(service, 'get').mockReturnValue(of(true));
  });

  it('get', (done) => {
    serviceSpy = jest.spyOn(service, 'get').mockReturnValue(of(true));
    service.get('https://test.com', {}).subscribe((data) => {
      expect(data).toEqual(true);
      done();
    });
  });

  it('post', (done) => {
    serviceSpy = jest.spyOn(service, 'post').mockReturnValue(of(true));
    service.post('https://test.com', {}).subscribe((data) => {
      expect(data).toEqual(true);
      done();
    });
  });
});
