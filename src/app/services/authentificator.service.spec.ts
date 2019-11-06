import { TestBed } from '@angular/core/testing';

import { AuthentificatorService } from './authentificator.service';

describe('AuthentificatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthentificatorService = TestBed.get(AuthentificatorService);
    expect(service).toBeTruthy();
  });
});
