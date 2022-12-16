import { TestBed } from '@angular/core/testing';

import { DeleteBalmModalService } from './delete-balm-modal.service';

describe('DeleteBalmModalService', () => {
  let service: DeleteBalmModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteBalmModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
