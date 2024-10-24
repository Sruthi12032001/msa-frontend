import { TestBed } from '@angular/core/testing';

import { MsaService } from './msa.service';

describe('MsaService', () => {
  let service: MsaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
