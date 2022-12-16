import { TestBed } from '@angular/core/testing';

import { CreateBalmModalService } from './create-balm-modal.service';

describe('CreateBalmModalService', () => {
  let service: CreateBalmModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBalmModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
