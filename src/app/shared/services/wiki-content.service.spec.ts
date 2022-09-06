import { TestBed } from '@angular/core/testing';

import { WikiContentService } from './wiki-content.service';

describe('WikiContentService', () => {
  let service: WikiContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikiContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
