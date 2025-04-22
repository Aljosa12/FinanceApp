import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { firstLoadCheckGuard } from './first-load-check.guard';

describe('firstLoadCheckGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => firstLoadCheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
