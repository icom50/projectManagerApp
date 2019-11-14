import { TestBed } from '@angular/core/testing';

import { RandomSentencesService } from './random-sentences.service';

describe('RandomSentencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomSentencesService = TestBed.get(RandomSentencesService);
    expect(service).toBeTruthy();
  });
});
