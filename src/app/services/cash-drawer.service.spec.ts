import { TestBed, inject } from '@angular/core/testing';

import { CashDrawerService } from './cash-drawer.service';

describe('CashDrawerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashDrawerService]
    });
  });

  it('should be created', inject([CashDrawerService], (service: CashDrawerService) => {
    expect(service).toBeTruthy();
  }));
});
