/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InitializerService } from './initializer.service';

describe('Service: Initializer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitializerService]
    });
  });

  it('should ...', inject([InitializerService], (service: InitializerService) => {
    expect(service).toBeTruthy();
  }));
});
