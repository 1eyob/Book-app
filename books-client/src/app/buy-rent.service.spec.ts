import { TestBed } from '@angular/core/testing';

import { BuyRentService } from './buy-rent.service';

describe('BuyRentService', () => {
  let service: BuyRentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyRentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
