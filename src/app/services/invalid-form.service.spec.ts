import { TestBed } from '@angular/core/testing';

import { InvalidFormService } from './invalid-form.service';

describe('InvalidFormService', () => {
  let service: InvalidFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvalidFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
