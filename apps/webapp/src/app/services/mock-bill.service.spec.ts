import { TestBed } from '@angular/core/testing';

import { MockBillService } from './mock-bill.service';

describe('MockBillService', () => {
  let service: MockBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
