import { TestBed } from '@angular/core/testing';

import { Flashcardsets } from './flashcardsets';

describe('Flashcardsets', () => {
  let service: Flashcardsets;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Flashcardsets);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
