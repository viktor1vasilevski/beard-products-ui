import { TestBed } from '@angular/core/testing';

import { EditBalmModalService } from './edit-balm-modal.service';

describe('EditBalmModalService', () => {
  let service: EditBalmModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditBalmModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
