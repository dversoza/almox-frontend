import { TestBed } from '@angular/core/testing';

import { BarracaService } from './barraca.service';

describe('BarracaService', () => {
  let service: BarracaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarracaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
