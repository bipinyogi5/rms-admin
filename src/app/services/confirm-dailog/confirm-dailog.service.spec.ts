import { TestBed } from '@angular/core/testing';

import { ConfirmDailogService } from './confirm-dailog.service';

describe('ConfirmDailogService', () => {
  let service: ConfirmDailogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmDailogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
